import type { UserRole } from "../redux/role/roleTypes";

export interface RouteConfig {
  path: string;
  component: string;
  roles: UserRole[];
  title: string;
  icon?: string;
}

export const routeConfig: RouteConfig[] = [
  // Dashboard
  {
    path: "/dashboard",
    component: "HealthDashboardPage",
    roles: ["admin", "patient", "doctor"],
    title: "Dashboard",
    icon: "BarChart3"
  },
  
  // Appointments
  {
    path: "/appointments",
    component: "AppointmentsPage",
    roles: ["admin", "patient", "doctor"],
    title: "Appointments",
    icon: "Calendar"
  },
  
  // Messages
  {
    path: "/messages",
    component: "MessagesPage",
    roles: ["admin", "patient", "doctor"],
    title: "Messages",
    icon: "MessageSquare"
  },
  
  // Doctors (only for patients and admins)
  {
    path: "/doctors",
    component: "DoctorsPage",
    roles: ["admin", "patient"],
    title: "Doctors",
    icon: "Stethoscope"
  },
  
  // Reviews
  {
    path: "/reviews",
    component: "ReviewsPage",
    roles: ["admin", "patient", "doctor"],
    title: "Reviews",
    icon: "Star"
  },
  
  // Profile
  {
    path: "/profile/me",
    component: "RoleBasedProfile",
    roles: ["admin", "patient", "doctor"],
    title: "Profile",
    icon: "User"
  },
  
  // Settings
  {
    path: "/settings",
    component: "SettingsPage",
    roles: ["admin", "patient", "doctor"],
    title: "Settings",
    icon: "Settings"
  }
];

export const getRoutesByRole = (role: UserRole): RouteConfig[] => {
  return routeConfig.filter(route => route.roles.includes(role));
};

export const authRoutes = [
  {
    path: "/login",
    component: "LoginForm",
    title: "Login"
  },
  {
    path: "/register",
    component: "RegisterForm",
    title: "Register"
  },
  {
    path: "/password-update",
    component: "PasswordUpdateForm",
    title: "Update Password"
  }
]; 