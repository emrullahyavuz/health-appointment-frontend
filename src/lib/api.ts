// Re-export all API modules from the new modular structure
export { authAPI, isAuthenticated, getAccessToken, getRefreshToken, clearAuthTokens } from './api/auth'
export { userAPI } from './api/user'
export { doctorAPI } from './api/doctor'
export { default as api } from './api/base' 