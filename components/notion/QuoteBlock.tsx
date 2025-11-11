'use client';

import type { NotionBlock } from '@/types/notion';
import { parseBlock } from '@/lib/notion/parser';

interface QuoteBlockProps {
  block: NotionBlock;
}

export default function QuoteBlock({ block }: QuoteBlockProps) {
  const parsed = parseBlock(block);
  const content = parsed.content as string;

  return (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 my-4 italic text-gray-600 dark:text-gray-400">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </blockquote>
  );
}

