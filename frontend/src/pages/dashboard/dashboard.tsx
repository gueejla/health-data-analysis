import { useState } from 'react'
import { getHealthMetrics, getUser } from '@/api/users'
import type { HealthMetric, User } from '@/api/types'
import type { FormEvent } from 'react'

export default function Dashboard() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [metrics, setMetrics] = useState<HealthMetric[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const searchedUsername = username.trim()
    if (!searchedUsername) return

    setLoading(true)
    setError(null)
    setUser(null)
    setMetrics([])

    try {
      const [foundUser, foundMetrics] = await Promise.all([
        getUser(searchedUsername),
        getHealthMetrics(searchedUsername),
      ])
      setUser(foundUser)
      setMetrics(foundMetrics)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load user.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Find your data</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 max-w-2xl">
        <input
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          className="flex-1 rounded border border-gray-300 p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? 'Loading…' : 'Find'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded border border-red-200">
          Error loading health data: {error}
        </div>
      )}

      {user && (
        <>
          <section className="w-full max-w-2xl bg-white shadow rounded p-4">
            <h2 className="font-semibold text-gray-800">Account</h2>
            <p className="mt-2 text-gray-700">{user.username}</p>
            <p className="text-sm text-gray-500">
              Joined:{' '}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : '—'}
            </p>
          </section>

          <section className="w-full overflow-x-auto bg-white shadow rounded">
            <div className="p-4">
              <h2 className="font-semibold text-gray-800">Health metrics</h2>
              {metrics.length === 0 && (
                <p className="mt-2 text-sm text-gray-500">
                  No parsed health metrics are available for this user yet.
                </p>
              )}
            </div>
            {metrics.length > 0 && (
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 font-semibold">Type</th>
                    <th className="p-3 font-semibold">Source</th>
                    <th className="p-3 font-semibold">Measured</th>
                    <th className="p-3 font-semibold">Value</th>
                    <th className="p-3 font-semibold">Attributes</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((metric) => (
                    <tr key={metric.id} className="border-t border-gray-100">
                      <td className="p-3">{metric.metricType}</td>
                      <td className="p-3 text-gray-500">
                        {metric.source || '—'}
                      </td>
                      <td className="p-3 text-gray-500">
                        {new Date(metric.measuredAt).toLocaleString()}
                      </td>
                      <td className="p-3">{metric.value ?? '—'}</td>
                      <td className="p-3 text-sm text-gray-500">
                        {metric.attributes
                          ? JSON.stringify(metric.attributes)
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </>
      )}
    </div>
  )
}
