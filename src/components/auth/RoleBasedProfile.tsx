import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../../redux/store';
import { DoctorProfilePage } from '../../pages/profile/DoctorProfile';
import { PatientProfilePage } from '../../pages/profile/PatientProfile';
import { AdminProfilePage } from '../../pages/profile/AdminProfile';

const RoleBasedProfile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { currentUserRole } = useSelector((state: RootState) => state.role);

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Role'e göre profil sayfasını render et
  switch (currentUserRole) {
    case 'doctor':
      return <DoctorProfilePage />;
    case 'patient':
      return <PatientProfilePage />;
    case 'admin':
      return <AdminProfilePage />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default RoleBasedProfile; 