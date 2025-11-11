'use client';

import Image from 'next/image';
import type { NotionBlock } from '@/types/notion';
import { parseBlock } from '@/lib/notion/parser';

interface ImageBlockProps {
  block: NotionBlock;
}

export default function ImageBlock({ block }: ImageBlockProps) {
  const parsed = parseBlock(block);
  const url = parsed.url as string;
  const caption = parsed.caption as string | undefined;

  return (
    <figure className="my-6">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={url}
          alt={caption || '이미지'}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </div>
      {caption && (
        <figcaption className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

