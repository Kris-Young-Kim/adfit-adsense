import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { PostMetadata, NotionBlock } from '@/types/notion';
import BlockRenderer from '@/components/notion/BlockRenderer';
import AdContainer from '@/components/ads/AdContainer';

interface PostDetailProps {
  post: PostMetadata;
  blocks: NotionBlock[];
}

export default function PostDetail({ post, blocks }: PostDetailProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 게시글 헤더 */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {post.title}
        </h1>
        
        {post.description && (
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            {post.description}
          </p>
        )}
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
          <time dateTime={post.createdAt}>
            {format(new Date(post.createdAt), 'yyyy년 M월 d일', { locale: ko })}
          </time>
          
          {post.updatedAt !== post.createdAt && (
            <span>
              (수정: {format(new Date(post.updatedAt), 'yyyy년 M월 d일', { locale: ko })})
            </span>
          )}
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* 상단 광고 */}
      <div className="my-8">
        <AdContainer position="top" />
      </div>

      {/* 게시글 본문 */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <BlockRenderer blocks={blocks} />
      </div>

      {/* 중간 광고 (본문 중간에 배치) */}
      {blocks.length > 10 && (
        <div className="my-12">
          <AdContainer position="middle" />
        </div>
      )}

      {/* 하단 광고 */}
      <div className="my-8">
        <AdContainer position="bottom" />
      </div>
    </article>
  );
}

