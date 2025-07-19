import api from './base'

export const userAPI = {
  getUserProfile: async () => {
    const response = await api.get(`/users/profile`)
    return response.data
  }
} 