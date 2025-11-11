'use client';

import type { NotionBlock } from '@/types/notion';
import { parseBlock } from '@/lib/notion/parser';

interface HeadingBlockProps {
  block: NotionBlock;
}

export default function HeadingBlock({ block }: HeadingBlockProps) {
  const parsed = parseBlock(block);
  const content = parsed.content as string;
  const level = parsed.level as number;

  const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3';
  const className = {
    1: 'text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100',
    2: 'text-3xl font-bold mt-6 mb-3 text-gray-900 dark:text-gray-100',
    3: 'text-2xl font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100',
  }[level];

  return <HeadingTag className={className}>{content}</HeadingTag>;
}

