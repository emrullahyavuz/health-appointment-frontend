import { Calendar, MessageSquare, BarChart3, Settings, Stethoscope, Star, User } from "lucide-react"

export const sidebarItems = [
    {
      icon: BarChart3,
      label: "Dashboard",
      href: "/dashboard",
      roles: ["patient", "doctor", "admin"],
    },
    {
      icon: Calendar,
      label: "Appointments",
      href: "/appointments",
      roles: ["patient", "doctor", "admin"],
    },
    {
      icon: MessageSquare,
      label: "Messages",
      href: "/messages",
      roles: ["patient", "doctor", "admin"],
    },
    {
      icon: Stethoscope,
      label: "Doctors",
      href: "/doctors",
      roles: ["patient", "admin"],
    },
    {
      icon: Star,
      label: "Reviews",
      href: "/reviews",
      roles: ["patient", "doctor", "admin"],
    },
    {
      icon: User,
      label: "Profile",
      href: "/profile/me",
      roles: ["patient", "doctor", "admin"],
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      roles: ["patient", "doctor", "admin"],
    },
  ]