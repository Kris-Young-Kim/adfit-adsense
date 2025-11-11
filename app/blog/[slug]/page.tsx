import { notFound } from 'next/navigation';
import { getPosts, getPostBySlug, getPostBlocks } from '@/lib/notion/posts';
import PostDetail from '@/components/blog/PostDetail';
import type { Metadata } from 'next';

export const revalidate = 3600; // ISR: 1시간마다 재생성

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('❌ Static params 생성 실패:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: '게시글을 찾을 수 없습니다',
    };
  }

  return {
    title: `${post.title} | Notion Blog`,
    description: post.description || post.title,
    openGraph: {
      title: post.title,
      description: post.description || post.title,
      images: post.thumbnailUrl ? [post.thumbnailUrl] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  let post = null;
  let blocks = [];

  try {
    post = await getPostBySlug(slug);
    
    if (!post) {
      notFound();
    }

    blocks = await getPostBlocks(post.id);
    console.log(`✅ 게시글 상세 페이지: ${post.title} (${blocks.length}개 블록)`);
  } catch (error) {
    console.error('❌ 게시글 상세 페이지 로드 실패:', error);
    notFound();
  }

  return <PostDetail post={post} blocks={blocks} />;
}

