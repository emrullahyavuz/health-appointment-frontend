import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DoctorsPage from "./pages/DoctorsPage";
import { HealthDashboardPage } from "./pages/HealthDashboardPage";
import { LoginForm } from "./components/auth/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm";
import { PasswordUpdateForm } from "./components/auth/PasswordUpdateForm";
import { ProfileForm } from "./components/auth/ProfileForm";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/register" element={<RegisterForm />} />
          <Route path="/auth/login" element={<LoginForm />} />
          <Route
            path="/auth/password-update"
            element={<PasswordUpdateForm />}
          />
          <Route path="/auth/profile" element={<ProfileForm />} />
          <Route path="/dashboard" element={<HealthDashboardPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
