import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/notion/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  
  // 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // 동적 페이지 (Notion 게시글)
  let dynamicPages: MetadataRoute.Sitemap = [];
  
  try {
    const posts = await getPosts();
    dynamicPages = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('❌ Sitemap 생성 중 오류:', error);
  }

  return [...staticPages, ...dynamicPages];
}

