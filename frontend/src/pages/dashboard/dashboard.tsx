import { useState } from 'react'
import { getUser } from '@/api/users'
import type { User } from '@/api/types'
import type { FormEvent } from 'react'

export default function Dashboard() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setUser(null)

    try {
      setUser(await getUser(username.trim()))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load user.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <p className="text-gray-500">Loading user…</p>
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded border border-red-200">
        Error loading user: {error}
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Find your data</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 max-w-2xl">
        <input
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          className="flex-1 rounded border border-gray-300 p-2"
        />
        <button type="submit" disabled={loading} className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
          {loading ? 'Loading…' : 'Find'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded border border-red-200">
          Error loading user: {error}
        </div>
      )}

      {user && (
        <table className="w-full max-w-2xl bg-white shadow rounded overflow-hidden text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 font-semibold">Username</th>
              <th className="p-3 font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-100">
              <td className="p-3">{user.username}</td>
              <td className="p-3 text-gray-500">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : '—'}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}
