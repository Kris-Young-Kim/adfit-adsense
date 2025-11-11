import { Client } from "@notionhq/client";

/**
 * Notion API 클라이언트를 생성합니다.
 */
export function getNotionClient(): Client {
  const NOTION_API_KEY = process.env.NOTION_API_KEY;

  if (!NOTION_API_KEY) {
    throw new Error("NOTION_API_KEY가 설정되지 않았습니다.");
  }

  return new Client({
    auth: NOTION_API_KEY,
  });
}
