export default function About() {
  return (
    <div className="text-gray-900 antialiased">
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Hero */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            About Health Data Analysis
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            A privacy-first, open-source tool to help you understand your own
            health data.
          </p>
        </header>

        {/* Philosophy */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why This Exists
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>...</p>
          </div>
        </section>

        {/* Principles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Design Principles
          </h2>
          <dl className="space-y-6">
            <div className="border-l-2 border-gray-200 pl-4">
              <dt className="font-semibold text-gray-900">
                Anonymous Insights
              </dt>
              <dd className="text-gray-600 mt-1">...</dd>
            </div>
            <div className="border-l-2 border-gray-200 pl-4">
              <dt className="font-semibold text-gray-900">Source-agnostic</dt>
              <dd className="text-gray-600 mt-1">...</dd>
            </div>
            <div className="border-l-2 border-gray-200 pl-4">
              <dt className="font-semibold text-gray-900">Open source</dt>
              <dd className="text-gray-600 mt-1">
                MIT-licensed...
                <a href="#" className="text-blue-600 hover:underline">
                  GitHub →
                </a>
              </dd>
            </div>
            <div className="border-l-2 border-gray-200 pl-4">
              <dt className="font-semibold text-gray-900">
                No business model on your data
              </dt>
              <dd className="text-gray-600 mt-1">...</dd>
            </div>
          </dl>
        </section>

        {/* License */}
        <section className="pt-8 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">License</h2>
          <p className="text-gray-600">
            Health Data Analysis is released under the{' '}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              MIT License
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  )
}
