import Link from 'next/link';
import { getPosts } from '@/lib/notion/posts';
import PostList from '@/components/blog/PostList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '홈 | Notion Blog',
  description: 'Notion API로 작성된 블로그',
};

export const revalidate = 3600; // ISR: 1시간마다 재생성

export default async function Home() {
  let posts = [];
  
  try {
    const allPosts = await getPosts();
    posts = allPosts.slice(0, 6); // 최신 게시글 6개만 표시
    console.log(`✅ 홈 페이지: ${posts.length}개의 최신 게시글을 로드했습니다.`);
  } catch (error) {
    console.error('❌ 홈 페이지 로드 실패:', error);
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 히어로 섹션 */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Notion Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Notion에서 작성한 콘텐츠를 자동으로 블로그에 게시합니다.
        </p>
        <Link
          href="/blog"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          모든 게시글 보기
        </Link>
      </section>

      {/* 최신 게시글 섹션 */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            최신 게시글
          </h2>
          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            더보기 →
          </Link>
        </div>
        
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              아직 게시글이 없습니다.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Notion Database에 게시글을 추가하고 Published 속성을 true로 설정하세요.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
