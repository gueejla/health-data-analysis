import { api } from './client'
import type { User } from './types'

export const getUsers = () => api.get<User[]>('/users')

export const createUser = (body: { username: string; password?: string }) =>
  api.post<User>('/users', body)
