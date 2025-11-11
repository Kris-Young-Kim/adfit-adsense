import type { PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// Notion Page 타입
export type NotionPage = PageObjectResponse | PartialPageObjectResponse;

// 게시글 메타데이터 타입
export interface PostMetadata {
  id: string;
  title: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  thumbnailUrl?: string;
  tags?: string[];
  category?: string;
}

// Notion Block 타입
export type BlockType =
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'to_do'
  | 'toggle'
  | 'code'
  | 'image'
  | 'quote'
  | 'callout'
  | 'divider'
  | 'table_of_contents';

// Notion Block 기본 구조
export interface NotionBlock {
  id: string;
  type: BlockType;
  has_children: boolean;
  children?: NotionBlock[];
}

// Paragraph Block
export interface ParagraphBlock extends NotionBlock {
  type: 'paragraph';
  paragraph: {
    rich_text: RichText[];
  };
}

// Heading Block
export interface HeadingBlock extends NotionBlock {
  type: 'heading_1' | 'heading_2' | 'heading_3';
  heading_1?: {
    rich_text: RichText[];
  };
  heading_2?: {
    rich_text: RichText[];
  };
  heading_3?: {
    rich_text: RichText[];
  };
}

// Code Block
export interface CodeBlock extends NotionBlock {
  type: 'code';
  code: {
    rich_text: RichText[];
    language: string;
    caption?: RichText[];
  };
}

// Image Block
export interface ImageBlock extends NotionBlock {
  type: 'image';
  image: {
    type: 'external' | 'file';
    external?: {
      url: string;
    };
    file?: {
      url: string;
      expiry_time?: string;
    };
    caption?: RichText[];
  };
}

// List Block
export interface ListBlock extends NotionBlock {
  type: 'bulleted_list_item' | 'numbered_list_item';
  bulleted_list_item?: {
    rich_text: RichText[];
    children?: NotionBlock[];
  };
  numbered_list_item?: {
    rich_text: RichText[];
    children?: NotionBlock[];
  };
}

// Quote Block
export interface QuoteBlock extends NotionBlock {
  type: 'quote';
  quote: {
    rich_text: RichText[];
  };
}

// Rich Text 타입
export interface RichText {
  type: 'text' | 'mention' | 'equation';
  text?: {
    content: string;
    link?: {
      url: string;
    };
  };
  mention?: {
    type: string;
  };
  equation?: {
    expression: string;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href?: string | null;
}

