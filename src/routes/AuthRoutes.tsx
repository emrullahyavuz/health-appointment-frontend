import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisterForm";
import { PasswordUpdateForm } from "../components/auth/PasswordUpdateForm";

export function AuthRoutes() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/password-update" element={<PasswordUpdateForm />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
} 