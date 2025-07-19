import api from './base'

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