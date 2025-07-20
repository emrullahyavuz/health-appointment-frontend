import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { AuthRoutes } from "../routes/AuthRoutes";
import { PatientRoutes } from "../routes/PatientRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { DoctorRoutes } from "./DoctorRoutes";

function AppRoutes() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { currentUserRole } = useSelector((state: RootState) => state.role);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes - Always accessible */}
          <Route path="/auth/*" element={<AuthRoutes />} />
          
          {/* Protected Routes based on user role */}
          {isAuthenticated && user && currentUserRole && (
            <>
              {currentUserRole === 'admin' && (
                <Route path="/*" element={<AdminRoutes />} />
              )}
              {currentUserRole === 'patient' && (
                <Route path="/*" element={<PatientRoutes />} />
              )}
              {currentUserRole === 'doctor' && (
                <Route path="/*" element={<DoctorRoutes />} />
              )}
            </>
          )}
          
          {/* Default redirect for unauthenticated users */}
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes; 