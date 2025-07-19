import api from './base'

// Doctor API endpoints
export const doctorAPI = {
  getDoctors: async () => {
    const response = await api.get('/doctors')
    return response.data
  },
  getMyProfile: async () => {
    const response = await api.get('/doctors/profile/me')
    return response.data
  }
} 