import { useState } from 'react'
import { createUser } from '@/api/users'
import type { User } from '@/api/types'

export default function Upload() {
  const [form, setForm] = useState<User>({ email: '', name: '' })
  const [error, setError] = useState<string | null>(null)
  const [createdUser, setCreatedUser] = useState<User | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  const nameValid = form.name.trim().length > 0 && form.name.trim().length <= 100
  const formValid = emailValid && nameValid && !submitting

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!formValid) return

    setError(null)
    setCreatedUser(null)
    setSubmitting(true)

    try {
      const user = await createUser({ email: form.email.trim(), name: form.name.trim() })

      if (user === null) {
        // Spring returns validation errors as 400; surface a readable message
        throw new Error(`Request failed to create user ${user}`)
      }

      setCreatedUser(user)
      setForm({ email: '', name: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">
          Upload your health data here for secure and actionable insights!
        </h1>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              maxLength={100}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {form.name.trim().length > 100 && (
              <p className="mt-1 text-sm text-red-600">Name must be 100 characters or fewer.</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {form.email.length > 0 && !emailValid && (
              <p className="mt-1 text-sm text-red-600">Please enter a valid email address.</p>
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
            User created: {createdUser.name} (#{createdUser.id}, {createdUser.email})
          </p>
        )}
      </div>
    </div>
  )
}
