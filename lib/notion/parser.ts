import type { NotionBlock, RichText } from '@/types/notion';

/**
 * Rich Text 배열을 HTML 문자열로 변환합니다.
 */
export function richTextToHtml(richText: RichText[]): string {
  return richText
    .map((text) => {
      let content = text.plain_text;

      // 링크 처리
      if (text.href) {
        content = `<a href="${text.href}" target="_blank" rel="noopener noreferrer">${content}</a>`;
      }

      // 스타일 적용
      if (text.annotations.bold) {
        content = `<strong>${content}</strong>`;
      }
      if (text.annotations.italic) {
        content = `<em>${content}</em>`;
      }
      if (text.annotations.strikethrough) {
        content = `<s>${content}</s>`;
      }
      if (text.annotations.underline) {
        content = `<u>${content}</u>`;
      }
      if (text.annotations.code) {
        content = `<code>${content}</code>`;
      }

      return content;
    })
    .join('');
}

/**
 * Rich Text 배열을 일반 텍스트로 변환합니다.
 */
export function richTextToPlainText(richText: RichText[]): string {
  return richText.map((text) => text.plain_text).join('');
}

/**
 * Notion Block을 파싱하여 컴포넌트에 전달할 데이터를 반환합니다.
 */
export function parseBlock(block: NotionBlock) {
  switch (block.type) {
    case 'paragraph':
      return {
        type: 'paragraph',
        content: richTextToHtml((block as any).paragraph.rich_text),
        plainText: richTextToPlainText((block as any).paragraph.rich_text),
      };

    case 'heading_1':
      return {
        type: 'heading_1',
        content: richTextToPlainText((block as any).heading_1.rich_text),
        level: 1,
      };

    case 'heading_2':
      return {
        type: 'heading_2',
        content: richTextToPlainText((block as any).heading_2.rich_text),
        level: 2,
      };

    case 'heading_3':
      return {
        type: 'heading_3',
        content: richTextToPlainText((block as any).heading_3.rich_text),
        level: 3,
      };

    case 'code':
      return {
        type: 'code',
        content: richTextToPlainText((block as any).code.rich_text),
        language: (block as any).code.language || 'plaintext',
        caption: (block as any).code.caption
          ? richTextToPlainText((block as any).code.caption)
          : undefined,
      };

    case 'image':
      const imageBlock = block as any;
      const image = imageBlock.image;
      return {
        type: 'image',
        url: image.type === 'external' ? image.external.url : image.file.url,
        caption: image.caption ? richTextToPlainText(image.caption) : undefined,
      };

    case 'bulleted_list_item':
      return {
        type: 'bulleted_list_item',
        content: richTextToHtml((block as any).bulleted_list_item.rich_text),
        children: (block as any).bulleted_list_item.children,
      };

    case 'numbered_list_item':
      return {
        type: 'numbered_list_item',
        content: richTextToHtml((block as any).numbered_list_item.rich_text),
        children: (block as any).numbered_list_item.children,
      };

    case 'quote':
      return {
        type: 'quote',
        content: richTextToHtml((block as any).quote.rich_text),
      };

    case 'divider':
      return {
        type: 'divider',
      };

    default:
      return {
        type: 'paragraph',
        content: '',
        plainText: '',
      };
  }
}

