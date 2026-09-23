export interface User {
  id?: number
  username: string
  createdAt?: string // ISO timestamp string from the backend
}

export interface HealthMetric {
  id: number
  metricType: string
  source?: string
  measuredAt: string
  value?: number
  attributes?: Record<string, unknown>
  createdAt: string
}
