import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DoctorsPage from "./pages/DoctorsPage";
import { HealthDashboardPage } from "./pages/HealthDashboardPage";
import { LoginForm } from "./components/auth/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm";
import { PasswordUpdateForm } from "./components/auth/PasswordUpdateForm";
import { ProfileForm } from "./components/auth/ProfileForm";
import { Toaster } from "sonner";
import { AppointmentsPage } from "./pages/Appointments";
import { MessagesPage } from "./pages/Messages";
import { ReviewsPage } from "./pages/Reviews";
import { SettingsPage } from "./pages/Settings";
import { PatientProfilePage } from "./pages/profile/PatientProfile";
import { DoctorProfilePage } from "./pages/profile/DoctorProfile";
import { BaseModal } from "./components/modals/BaseModal";
import { AppointmentBookingModal } from "./components/modals/AppointmentBookingModal";

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
          <Route path="/profile/me" element={<ProfileForm />} />
          <Route path="/dashboard" element={<HealthDashboardPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile/patient" element={<PatientProfilePage />} />
          <Route path="/profile/doctor" element={<DoctorProfilePage />} />
          <Route path="/modals" element={<AppointmentBookingModal />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
