import api from './base'

export const userAPI = {
  getUserProfile: async () => {
    const response = await api.get(`/users/profile`)
    return response.data
  },

  updateUserProfile: async (data: any) => {
    const response = await api.put(`/users/profile`, data)
    return response.data
  }
} 