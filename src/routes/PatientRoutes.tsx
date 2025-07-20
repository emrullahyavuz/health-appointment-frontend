import { Routes, Route, Navigate } from "react-router-dom";
import RequireRole from "../components/auth/RequireRole";
import { Sidebar } from "../components/sidebar/Sidebar";
import { HealthDashboardPage } from "../pages/HealthDashboardPage";
import { AppointmentsPage } from "../pages/Appointments";
import { MessagesPage } from "../pages/Messages";
import { ReviewsPage } from "../pages/Reviews";
import { SettingsPage } from "../pages/Settings";
import RoleBasedProfile from "../components/auth/RoleBasedProfile";
import { DoctorsPage } from "../pages/DoctorsPage";

export function PatientRoutes() {
  return (
    <RequireRole allowedRoles={['patient']}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/dashboard" element={<HealthDashboardPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile/me" element={<RoleBasedProfile />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </RequireRole>
  );
} 