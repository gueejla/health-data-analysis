import { api } from './client'
import type { User } from './types'

export const getUser = (username: string) =>
  api.get<User>(`/users/${encodeURIComponent(username)}`)

export const createUser = (body: { username: string; password?: string }) =>
  api.post<User>('/users', body)
