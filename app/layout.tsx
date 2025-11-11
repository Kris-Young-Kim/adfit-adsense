import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import AdScripts from "@/components/ads/AdScripts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Notion Blog",
    template: "%s | Notion Blog",
  },
  description: "Notion에서 작성한 콘텐츠를 자동으로 블로그에 게시하는 웹사이트입니다.",
  keywords: ["Notion", "블로그", "Blog", "콘텐츠", "Content"],
  authors: [{ name: "김은호", email: "dmsgheka@naver.com" }],
  creator: "김은호",
  publisher: "김은호",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com",
    siteName: "Notion Blog",
    title: "Notion Blog",
    description: "Notion에서 작성한 콘텐츠를 자동으로 블로그에 게시하는 웹사이트입니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notion Blog",
    description: "Notion에서 작성한 콘텐츠를 자동으로 블로그에 게시하는 웹사이트입니다.",
  },
  verification: {
    // Google Search Console, Naver Search Advisor 등에서 제공하는 메타 태그를 여기에 추가
    // google: "your-google-verification-code",
    // other: {
    //   "naver-site-verification": "your-naver-verification-code",
    // },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* AdFit 가이드에 따라 body 하단에 스크립트 배치 */}
        <AdScripts />
      </body>
    </html>
  );
}
