import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../../redux/store';
import type { UserRole } from '../../redux/role/roleTypes';

interface RequireRoleProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

const RequireRole: React.FC<RequireRoleProps> = ({ children, allowedRoles }) => {
  const { currentUserRole, loading: roleLoading } = useSelector(
    (state: RootState) => state.role
  );
  const { user, loading: authLoading } = useSelector((state: RootState) => state.auth);

  if (roleLoading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!currentUserRole || !allowedRoles.includes(currentUserRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RequireRole; 