export default function Home() {
  return (
    <div className="min-h-screen bg-grey-100 text-gray-900 antialiased">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-6">
            Understand Your Health Data
            <br />
            <span className="text-gray-600 font-normal">
              Simply & Privately
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Import your health data, visualize trends, track metrics, and get
            anonymous AI insights—all without any of your information leaving
            your control.
          </p>
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            id="get-started"
          >
            <a
              href="/register"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Start Free Analysis
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              See How It Works
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            No account required · Data processed anonymously · Open source
          </p>
        </div>
      </section>

      {/* Trust Indicators / Sources */}
      <section className="border-y border-gray-100 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-gray-400">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-600">
                Full Samsung Health support
              </span>
            </div>
            <span className="w-px h-6 bg-gray-200 hidden md:block" />
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-600">
                Local-First
              </span>
            </div>
            <span className="w-px h-6 bg-gray-200 hidden md:block" />
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-600">
                Anonymous AI
              </span>
            </div>
            <span className="w-px h-6 bg-gray-200 hidden md:block" />
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18V6M12 6l-5 5M12 6l5 5"
                />
              </svg>
              <span className="text-sm font-medium text-gray-600">
                More features and integrations soon!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Everything You Need to Understand Your Health
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Purpose-built features for turning raw health exports into
            actionable understanding.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <article className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
            <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Seamless Samsung Health Import
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Export your data once, drag and drop. Supports heart rate, sleep,
              steps, workouts, stress, SpO₂, and more. No API keys, no cloud
              sync required.
            </p>
          </article>

          {/* Feature 2 */}
          <article className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
            <div className="w-11 h-11 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Advanced Visualizations
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Interactive charts for trends, correlations, distributions, and
              readiness scores. Filter by date range, activity type, or custom
              tags. Export publication-ready PNGs.
            </p>
          </article>

          {/* Feature 3 */}
          <article className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
            <div className="w-11 h-11 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Anonymous AI Insights
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Opt-in to receive pattern analysis, anomaly detection, and
              personalized recommendations—processed locally or via
              privacy-preserving inference. No identifiers ever transmitted.
            </p>
          </article>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 border-y border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              From Export to Insight in Three Steps
            </h2>
          </div>

          <ol className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'Export Your Data',
                desc: 'Open Samsung Health → Settings → Download Data. Choose your date range. Save the ZIP file locally.',
              },
              {
                num: '02',
                title: 'Drag & Drop',
                desc: 'Click upload, drop your ZIP file. An anonymous identifier is generated for your data, enabling secure insights.',
              },
              {
                num: '03',
                title: 'Explore & Act',
                desc: 'Browse dashboards, compare metrics, spot trends. Enable AI insights for deeper analysis. Export charts or reports to share with providers.',
              },
            ].map((step, i) => (
              <li key={i} className="relative pl-12 pb-8 md:pb-0">
                <span className="absolute left-0 top-0 text-3xl font-bold text-gray-200">
                  {step.num}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                {i < 2 && (
                  <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
          Ready to Understand Your Health Better?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Join many others taking control of their health data. Free, private,
          and open source.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          Start Your Analysis
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </a>
      </section>
    </div>
  )
}
