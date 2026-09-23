import { useState, useEffect } from 'react'
import { generateUsername } from '@/api/username'
import { registerUserWithCsv } from '@/api/users'
import type { User } from '@/api/types'

export default function Register() {
  const [username, setUsername] = useState('')
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [createdUser, setCreatedUser] = useState<User | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    handleGenerateUsername()
  }, [])

  const usernameValid =
    username.trim().length > 0 && username.trim().length <= 100
  const csvValid =
    csvFile !== null &&
    csvFile.size > 0 &&
    csvFile.name.toLowerCase().endsWith('.csv')
  const formValid = usernameValid && csvValid && !submitting && !generating

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!formValid) return

    setError(null)
    setCreatedUser(null)
    setSubmitting(true)

    try {
      const user = await registerUserWithCsv(username.trim(), csvFile!)
      setCreatedUser(user)
      setUsername('')
      setCsvFile(null)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGenerateUsername() {
    setError(null)
    setGenerating(true)

    try {
      setUsername(await generateUsername())
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to generate a username.',
      )
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <section className="text-center mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
            Your data, your insights
          </p>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">
            Start with a secure account
          </h1>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Your health data is encrypted with your username and stored securely
            on our servers. Use it in personalized dashboards for actionable
            insights, with optional AI-powered analysis.
          </p>
        </section>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Create your anonymous account
          </h2>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                maxLength={100}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {username.length > 100 && (
                <p className="mt-1 text-sm text-red-600">
                  Username must be 100 characters or fewer.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="csv-file"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Samsung Health CSV
              </label>
              <input
                id="csv-file"
                type="file"
                accept=".csv,text/csv"
                onChange={(e) => setCsvFile(e.target.files?.[0] ?? null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Upload a non-empty CSV file to create your account.
              </p>
              {csvFile && !csvValid && (
                <p className="mt-1 text-sm text-red-600">
                  Please choose a non-empty .csv file.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!formValid}
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Creating…' : 'Create user'}
            </button>
          </form>

          {error && (
            <p role="alert" className="mt-4 text-sm text-red-600">
              {error}
            </p>
          )}

          {createdUser && (
            <p className="mt-4 text-sm text-green-700">
              User created: {createdUser.username} (#{createdUser.id})
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
