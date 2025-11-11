import { getNotionClient } from './client';
import type { PostMetadata, NotionBlock } from '@/types/notion';

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

/**
 * Notion Database에서 게시글 목록을 가져옵니다.
 * Published 속성이 true인 게시글만 반환합니다.
 */
export async function getPosts(): Promise<PostMetadata[]> {
  if (!DATABASE_ID) {
    console.warn('⚠️ NOTION_DATABASE_ID가 설정되지 않았습니다.');
    return [];
  }

  try {
    const NOTION_API_KEY = process.env.NOTION_API_KEY;
    
    if (!NOTION_API_KEY) {
      throw new Error('NOTION_API_KEY가 설정되지 않았습니다.');
    }
    
    console.log('📝 Notion API: 게시글 목록 조회 시작');
    console.log(`📋 Database ID: ${DATABASE_ID}`);
    
    // 먼저 Database 정보를 가져와서 속성 목록 확인
    try {
      const dbInfoResponse = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
        },
      });

      if (dbInfoResponse.ok) {
        const dbInfo = await dbInfoResponse.json();
        console.log('📊 Database 속성 목록:');
        const propertyNames = Object.keys(dbInfo.properties || {});
        propertyNames.forEach((name) => {
          const prop = dbInfo.properties[name];
          console.log(`  - ${name} (${prop.type})`);
        });
        
        // Date 속성이 있는지 확인
        const hasDateProperty = propertyNames.some(
          name => name.toLowerCase() === 'date' || 
                  dbInfo.properties[name].id === 'Date'
        );
        console.log(`📅 Date 속성 존재 여부: ${hasDateProperty}`);
      }
    } catch (dbInfoError) {
      console.warn('⚠️ Database 정보 조회 실패 (계속 진행):', dbInfoError);
    }
    
    // 정렬할 속성 찾기 (Date, date, Created Date 등)
    let sortProperty: string | null = null;
    try {
      const dbInfoResponse = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
        },
      });

      if (dbInfoResponse.ok) {
        const dbInfo = await dbInfoResponse.json();
        const propertyNames = Object.keys(dbInfo.properties || {});
        
        // Date 속성 찾기 (대소문자 구분 없이)
        const dateProperty = propertyNames.find(
          name => name.toLowerCase() === 'date' || 
                  name.toLowerCase() === 'created date' ||
                  name.toLowerCase() === '날짜'
        );
        
        if (dateProperty) {
          sortProperty = dateProperty;
          console.log(`✅ 정렬 속성 사용: ${sortProperty}`);
        } else {
          console.log('⚠️ Date 속성을 찾을 수 없습니다. created_time으로 정렬합니다.');
        }
      }
    } catch (dbInfoError) {
      console.warn('⚠️ Database 정보 조회 실패:', dbInfoError);
    }
    
    // 쿼리 본문 구성
    const queryBody: any = {
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
    };
    
    // 정렬 속성이 있으면 추가, 없으면 created_time으로 정렬
    if (sortProperty) {
      queryBody.sorts = [
        {
          property: sortProperty,
          direction: 'descending' as const,
        },
      ];
    } else {
      // created_time으로 정렬 (timestamp)
      queryBody.sorts = [
        {
          timestamp: 'created_time',
          direction: 'descending' as const,
        },
      ];
    }
    
    console.log('🔍 쿼리 본문:', JSON.stringify(queryBody, null, 2));
    
    // Notion API 직접 호출
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(queryBody),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Notion API 오류 상세 정보:');
      console.error('  - Status:', response.status);
      console.error('  - Status Text:', response.statusText);
      console.error('  - Error Code:', error.code);
      console.error('  - Error Message:', error.message);
      console.error('  - Request ID:', error.request_id);
      console.error('  - 전체 오류 객체:', JSON.stringify(error, null, 2));
      throw new Error(`Notion API 오류: ${error.message || response.statusText}`);
    }

    const data = await response.json();

    console.log(`✅ ${data.results.length}개의 게시글을 찾았습니다.`);

    const posts: PostMetadata[] = data.results
      .filter((page): page is typeof page & { properties: any } => 'properties' in page)
      .map((page) => {
        const properties = page.properties;
        
        // 제목 추출
        const titleProperty = properties.Title || properties.title || properties.Name || properties.name;
        const title = titleProperty?.type === 'title' 
          ? titleProperty.title.map((t: any) => t.plain_text).join('') 
          : '제목 없음';

        // Slug 추출 (Title 기반으로 생성하거나 Slug 속성 사용)
        const slugProperty = properties.Slug || properties.slug;
        const slug = slugProperty?.type === 'rich_text' 
          ? slugProperty.rich_text.map((t: any) => t.plain_text).join('') || 
            title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
          : title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

        // 설명 추출
        const descriptionProperty = properties.Description || properties.description || properties.Summary || properties.summary;
        const description = descriptionProperty?.type === 'rich_text' 
          ? descriptionProperty.rich_text.map((t: any) => t.plain_text).join('')
          : undefined;

        // 날짜 추출
        const dateProperty = properties.Date || properties.date || properties.Created || properties.created;
        const createdAt = dateProperty?.type === 'date' 
          ? dateProperty.date?.start || page.created_time
          : page.created_time;
        const updatedAt = page.last_edited_time;

        // 썸네일 추출
        const thumbnailProperty = properties.Thumbnail || properties.thumbnail || properties.Cover || properties.cover;
        let thumbnailUrl: string | undefined;
        if (thumbnailProperty?.type === 'files' && thumbnailProperty.files.length > 0) {
          const file = thumbnailProperty.files[0];
          if (file.type === 'external') {
            thumbnailUrl = file.external.url;
          } else if (file.type === 'file') {
            thumbnailUrl = file.file.url;
          }
        }

        // 태그 추출
        const tagsProperty = properties.Tags || properties.tags || properties.Tag || properties.tag;
        const tags = tagsProperty?.type === 'multi_select' 
          ? tagsProperty.multi_select.map((tag: any) => tag.name)
          : [];

        // 카테고리 추출
        const categoryProperty = properties.Category || properties.category;
        const category = categoryProperty?.type === 'select' 
          ? categoryProperty.select?.name
          : undefined;

        return {
          id: page.id,
          title,
          slug,
          description,
          createdAt,
          updatedAt,
          published: true,
          thumbnailUrl,
          tags,
          category,
        };
      });

    return posts;
  } catch (error) {
    console.error('❌ 게시글 목록 조회 실패:', error);
    // 에러 발생 시 빈 배열 반환 (페이지가 깨지지 않도록)
    return [];
  }
}

/**
 * Slug로 특정 게시글의 메타데이터를 가져옵니다.
 */
export async function getPostBySlug(slug: string): Promise<PostMetadata | null> {
  try {
    console.log(`📝 Notion API: 게시글 조회 (slug: ${slug})`);
    
    const posts = await getPosts();
    const post = posts.find((p) => p.slug === slug);
    
    if (!post) {
      console.log(`⚠️ 게시글을 찾을 수 없습니다: ${slug}`);
      return null;
    }

    return post;
  } catch (error) {
    console.error('❌ 게시글 조회 실패:', error);
    return null;
  }
}

/**
 * 게시글의 모든 블록을 재귀적으로 가져옵니다.
 */
export async function getPostBlocks(pageId: string): Promise<NotionBlock[]> {
  try {
    const notion = getNotionClient();
    
    console.log(`📝 Notion API: 블록 조회 시작 (pageId: ${pageId})`);
    
    const blocks: NotionBlock[] = [];
    let cursor: string | undefined = undefined;

    do {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
        page_size: 100,
      });

      const blockList = response.results as any[];
      
      // 각 블록의 자식 블록도 재귀적으로 가져오기
      for (const block of blockList) {
        if (block.has_children) {
          const children = await getPostBlocks(block.id);
          blocks.push({
            ...block,
            children,
          } as NotionBlock);
        } else {
          blocks.push(block as NotionBlock);
        }
      }

      cursor = response.next_cursor || undefined;
    } while (cursor);

    console.log(`✅ ${blocks.length}개의 블록을 가져왔습니다.`);
    return blocks;
  } catch (error) {
    console.error('❌ 블록 조회 실패:', error);
    // 에러 발생 시 빈 배열 반환 (페이지가 깨지지 않도록)
    return [];
  }
}

