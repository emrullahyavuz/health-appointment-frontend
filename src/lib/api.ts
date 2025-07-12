import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

// API base configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // For cookies
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor for token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            refreshToken
          })
          
          const { accessToken } = response.data
          localStorage.setItem('accessToken', accessToken)
          
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return api(originalRequest)
        }
      } catch {
        // Refresh token failed, redirect to login
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/auth/login'
      }
    }

    return Promise.reject(error)
  }
)

type RegisterFormData = {
  name: string
  email: string
  telephone: string
  password: string
  role: 'patient' | 'doctor' | 'admin'
}

// Auth API endpoints
export const authAPI = {
  // Register new user
  register: async (userData: RegisterFormData) => {
    const response = await api.post('/auth/register', {
      name: userData.name,
      email: userData.email,
      telephone: userData.telephone,
      password: userData.password,
      role: userData.role
    })
    return response.data
  },

  // Login user
  login: async (credentials: {
    email: string
    password: string
  }) => {
    const response = await api.post('/auth/login', credentials)
    
    // Store tokens in localStorage
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
    }
    
    return response.data
  },

  updatePassword: async (credentials: {
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }) => {
    const response = await api.post('/auth/update-password', credentials)
    return response.data
  },

  // Logout user
  logout: async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      // Clear tokens regardless of API call success
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  },

  // Refresh access token
  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/auth/refresh-token', { refreshToken })
    return response.data
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile')
    return response.data
  }
}

// Doctor API endpoints
export const doctorAPI = {
  getDoctors: async () => {
    const response = await api.get('/doctors')
    return response.data
  }
}

export const userAPI = {
  getUserProfile: async () => {
    const response = await api.get(`/users/profile`)
    return response.data
  }
}

// Utility functions
export const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken')
}

export const getAccessToken = () => {
  return localStorage.getItem('accessToken')
}

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken')
}

export const clearAuthTokens = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export default api 