export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a
              href="https://github.com/gueejla/health-data-analysis"
              className="hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Privacy
            </a>
            <a href="/about" className="hover:text-gray-900 transition-colors">
              About
            </a>
          </div>
          <p className="text-sm text-gray-400">
            Not affiliated with Samsung. Samsung Health is a trademark of
            Samsung Electronics Co., Ltd.
          </p>
        </div>
      </div>
    </footer>
  )
}
