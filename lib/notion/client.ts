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

  return new Client({
    auth: NOTION_API_KEY,
  });
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

