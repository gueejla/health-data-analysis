import { api } from './client'
import type { HealthMetric, User } from './types'

export const getUser = (username: string) =>
  api.get<User>(`/users/${encodeURIComponent(username)}`)

export const getHealthMetrics = (username: string) =>
  api.get<HealthMetric[]>(
    `/users/${encodeURIComponent(username)}/health-data/metrics`,
  )

export const createUser = (body: { username: string; password?: string }) =>
  api.post<User>('/users', body)

export const registerUserWithCsv = (username: string, file: File) => {
  const body = new FormData()
  body.append('username', username)
  body.append('file', file)
  return api.post<User>('/users', body)
}
