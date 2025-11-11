'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { NotionBlock } from '@/types/notion';
import { parseBlock } from '@/lib/notion/parser';

interface CodeBlockProps {
  block: NotionBlock;
}

export default function CodeBlock({ block }: CodeBlockProps) {
  const parsed = parseBlock(block);
  const code = parsed.content as string;
  const language = parsed.language as string;
  const caption = parsed.caption as string | undefined;

  return (
    <div className="my-6">
      <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <SyntaxHighlighter
          language={language || 'plaintext'}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            borderRadius: '0.5rem',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      {caption && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
          {caption}
        </p>
      )}
    </div>
  );
}

