import { useEffect, useState } from 'react'
import { getUsers } from '@/api/users'
import type { User } from '@/api/types'

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]) // ← typed state
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null) // ← typed error

  useEffect(() => {
    let cancelled = false

    getUsers()
      .then((data) => {
        if (!cancelled) setUsers(data)
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return <p className="text-gray-500">Loading users…</p>
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded border border-red-200">
        Error loading users: {error}
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {users.length === 0 ? (
        <p className="text-gray-500">No users yet.</p>
      ) : (
        <table className="w-full max-w-2xl bg-white shadow rounded overflow-hidden text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">Email</th>
              <th className="p-3 font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-100">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 text-gray-500">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
