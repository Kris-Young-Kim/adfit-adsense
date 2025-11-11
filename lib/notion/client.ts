import { Client } from '@notionhq/client';

/**
 * Notion API 클라이언트를 생성합니다.
 * 함수 내부에서 호출하여 매번 새로운 클라이언트를 생성합니다.
 * Next.js 서버 컴포넌트에서 안전하게 작동합니다.
 */
export function getNotionClient(): Client {
  const NOTION_API_KEY = process.env.NOTION_API_KEY?.trim();

  if (!NOTION_API_KEY || NOTION_API_KEY === '') {
    throw new Error('NOTION_API_KEY가 설정되지 않았습니다. .env.local 파일을 확인하세요.');
  }

  try {
    // Client 클래스 직접 인스턴스화
    const client = new Client({
      auth: NOTION_API_KEY,
    });

    // 클라이언트가 올바르게 생성되었는지 검증
    if (!client || typeof client !== 'object') {
      throw new Error('Notion Client가 올바르게 생성되지 않았습니다.');
    }

    if (!client.databases || typeof client.databases.query !== 'function') {
      console.error('❌ Notion Client 구조 오류:');
      console.error('   client:', client);
      console.error('   client.databases:', client.databases);
      console.error('   client keys:', Object.keys(client));
      throw new Error('Notion Client의 databases.query 메서드를 찾을 수 없습니다.');
    }

    // 디버깅: 클라이언트 구조 확인
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Notion Client 생성 완료');
      console.log('   databases.query 타입:', typeof client.databases.query);
    }

    return client;
  } catch (error) {
    console.error('❌ Notion Client 생성 실패:', error);
    throw error;
  }
}

/**
 * 환경 변수 검증
 */
export function validateNotionConfig(): { apiKey: string; databaseId: string } {
  const apiKey = process.env.NOTION_API_KEY?.trim();
  const databaseId = process.env.NOTION_DATABASE_ID?.trim();

  if (!apiKey || apiKey === '') {
    throw new Error('NOTION_API_KEY가 설정되지 않았습니다.');
  }

  if (!databaseId || databaseId === '') {
    throw new Error('NOTION_DATABASE_ID가 설정되지 않았습니다.');
  }

  return { apiKey, databaseId };
}

