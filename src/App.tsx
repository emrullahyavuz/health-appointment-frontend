import { Route, Routes } from 'react-router-dom'
import DoctorsPage from './pages/DoctorsPage'
import { HealthDashboardPage } from './pages/HealthDashboardPage'
import { LoginForm } from './components/auth/LoginForm'
import { RegisterForm } from './components/auth/RegisterForm'

function App() {
  return (
   <>
    <Routes>
      <Route path="/auth/register" element={<RegisterForm />} />
      <Route path="/auth/login" element={<LoginForm />} />
      <Route path="/dashboard" element={<HealthDashboardPage />} />
      <Route path="/doctors" element={<DoctorsPage />} />
    </Routes>
   </>
  )
}

export default App
