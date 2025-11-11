import { getNotionClient, validateNotionConfig } from './client';
import type { PostMetadata, NotionBlock } from '@/types/notion';

/**
 * Notion Database에서 게시글 목록을 가져옵니다.
 * Published 속성이 true인 게시글만 반환합니다.
 */
export async function getPosts(): Promise<PostMetadata[]> {
  try {
    // 환경 변수 검증
    const { databaseId } = validateNotionConfig();
    
    // Notion 클라이언트 생성
    const notion = getNotionClient();
    
    // 클라이언트 검증
    if (!notion || !notion.databases || typeof notion.databases.query !== 'function') {
      console.error('❌ Notion 클라이언트가 올바르게 초기화되지 않았습니다.');
      console.error('   notion:', !!notion);
      console.error('   notion.databases:', !!notion?.databases);
      console.error('   notion.databases.query:', typeof notion?.databases?.query);
      console.error('   notion 객체 키:', notion ? Object.keys(notion) : 'null');
      return [];
    }
    
    console.log('📝 Notion API: 게시글 목록 조회 시작');
    
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    console.log(`✅ ${response.results.length}개의 게시글을 찾았습니다.`);

    const posts: PostMetadata[] = response.results
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
    // 환경 변수 검증 (getPosts 내부에서도 검증되지만 명시적으로 확인)
    validateNotionConfig();
    
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
    // 환경 변수 검증
    validateNotionConfig();
    
    // Notion 클라이언트 생성
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

