'use client';

import type { NotionBlock } from '@/types/notion';
import { parseBlock } from '@/lib/notion/parser';

interface ParagraphBlockProps {
  block: NotionBlock;
}

export default function ParagraphBlock({ block }: ParagraphBlockProps) {
  const parsed = parseBlock(block);
  
  if (!parsed.content && parsed.type === 'paragraph') {
    return <div className="h-4" />; // 빈 단락은 공간만 차지
  }

  return (
    <p
      className="text-base leading-7 text-gray-700 dark:text-gray-300"
      dangerouslySetInnerHTML={{ __html: parsed.content as string }}
    />
  );
}

