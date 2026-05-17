import { create } from 'zustand'
import api from '../services/api'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthStore {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null })
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      set({ isAuthenticated: true, user, token, loading: false })
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Erro ao fazer login', loading: false })
      throw error
    }
  },

  register: async (name: string, email: string, password: string) => {
    set({ loading: true, error: null })
    try {
      const response = await api.post('/auth/register', { name, email, password })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      set({ isAuthenticated: true, user, token, loading: false })
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Erro ao registrar', loading: false })
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ isAuthenticated: false, user: null, token: null })
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      set({ isAuthenticated: false, user: null, token: null })
      return
    }

    try {
      const response = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      set({ isAuthenticated: true, user: response.data, token })
    } catch {
      localStorage.removeItem('token')
      set({ isAuthenticated: false, user: null, token: null })
    }
  }
}))
