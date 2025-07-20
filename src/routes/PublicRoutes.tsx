import { Routes, Route, Navigate } from "react-router-dom";

export function PublicRoutes() {
  return (
    <Routes>
      {/* Public landing page or redirect to auth */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
} 