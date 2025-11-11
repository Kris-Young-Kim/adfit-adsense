import { Client } from '@notionhq/client';

// Notion API 클라이언트 초기화
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// 환경 변수 검증
if (!process.env.NOTION_API_KEY) {
  console.warn('⚠️ NOTION_API_KEY가 설정되지 않았습니다.');
}

if (!process.env.NOTION_DATABASE_ID) {
  console.warn('⚠️ NOTION_DATABASE_ID가 설정되지 않았습니다.');
}

