'use client';

import type { NotionBlock } from '@/types/notion';
import { parseBlock } from '@/lib/notion/parser';
import BlockRenderer from './BlockRenderer';

interface ListBlockProps {
  block: NotionBlock;
}

export default function ListBlock({ block }: ListBlockProps) {
  const parsed = parseBlock(block);
  const content = parsed.content as string;
  const children = block.children;
  const isBulleted = block.type === 'bulleted_list_item';

  return (
    <li className="text-base leading-7 text-gray-700 dark:text-gray-300 my-1">
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {children && children.length > 0 && (
        <div className="ml-6 mt-2">
          {isBulleted ? (
            <ul className="list-disc list-inside space-y-1">
              <BlockRenderer blocks={children} />
            </ul>
          ) : (
            <ol className="list-decimal list-inside space-y-1">
              <BlockRenderer blocks={children} />
            </ol>
          )}
        </div>
      )}
    </li>
  );
}

