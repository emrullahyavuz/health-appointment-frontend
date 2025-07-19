export type UserRole = 'admin' | 'patient' | 'doctor';

export interface RoleState {
  currentUserRole: UserRole | null;
  loading: boolean;
  error: string | null;
} 