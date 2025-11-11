import { getPosts } from '@/lib/notion/posts';
import PostList from '@/components/blog/PostList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '블로그 | Notion Blog',
  description: 'Notion API로 작성된 블로그 게시글 목록',
};

export const revalidate = 3600; // ISR: 1시간마다 재생성

export default async function BlogPage() {
  let posts = [];
  
  try {
    posts = await getPosts();
    console.log(`✅ 블로그 페이지: ${posts.length}개의 게시글을 로드했습니다.`);
  } catch (error) {
    console.error('❌ 블로그 페이지 로드 실패:', error);
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          블로그
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Notion에서 작성한 게시글을 확인하세요.
        </p>
      </div>
      
      <PostList posts={posts} />
    </div>
  );
}

