export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Notion Blog. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Powered by Notion API & Next.js
          </p>
          {/* 소유주 정보 - AdFit 심사 기준 충족 */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              소유주: kris071
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              이메일: <a href="mailto:dmsgheka@naver.com" className="hover:underline">dmsgheka@naver.com</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

