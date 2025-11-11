import { Client } from '@notionhq/client';

// 환경 변수 검증
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY) {
  console.warn('⚠️ NOTION_API_KEY가 설정되지 않았습니다.');
}

if (!NOTION_DATABASE_ID) {
  console.warn('⚠️ NOTION_DATABASE_ID가 설정되지 않았습니다.');
}

// Notion API 클라이언트 초기화
// API 키가 없으면 더미 클라이언트를 생성 (타입 안정성을 위해)
let notionInstance: Client;

if (NOTION_API_KEY) {
  notionInstance = new Client({
    auth: NOTION_API_KEY,
  });
} else {
  // API 키가 없을 때는 더미 객체를 생성하되, 메서드 호출 시 에러를 발생시킴
  notionInstance = {
    databases: {
      query: () => {
        throw new Error('NOTION_API_KEY가 설정되지 않았습니다.');
      },
    },
    blocks: {
      children: {
        list: () => {
          throw new Error('NOTION_API_KEY가 설정되지 않았습니다.');
        },
      },
    },
  } as unknown as Client;
}

export const notion = notionInstance;

