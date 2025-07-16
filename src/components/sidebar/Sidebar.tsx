import { useLocation, useNavigate } from "react-router-dom"
import { LogOut } from "lucide-react"
import { Button } from "../ui/Button"
import { authAPI } from "../../lib/api"
import { toast } from "sonner"
import { sidebarItems } from "./sidebarItems"




export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (href: string) => {
    navigate(href)
  }

  const handleLogout = async () => {
    try {
      await authAPI.logout()
      toast.success("Başarıyla çıkış yapıldı")
      navigate("/auth/login")
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
  const user = {
    role: "patient",
  }

  const filteredItems = sidebarItems.filter((item) => (user?.role ? item.roles.includes(user.role) : true))

  return (
    <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-8">
      {/* Logo */}
      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
        <div className="w-6 h-6 bg-white rounded-sm opacity-80"></div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-6 flex-1">
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Button
              key={item.href}
              variant="ghost"
              size="icon"
              onClick={() => handleNavigation(item.href)}
              className={`w-12 h-12 sidebar-nav-item ${
                isActive ? "bg-gray-900 text-white hover:bg-gray-800" : "text-gray-400 hover:text-gray-600"
              }`}
              title={item.label}
            >
              <item.icon className="w-6 h-6" />
            </Button>
          )
        })}
      </nav>

      {/* Logout */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLogout}
        className="w-12 h-12 text-gray-400 hover:text-red-600 sidebar-nav-item"
        title="Logout"
      >
        <LogOut className="w-6 h-6" />
      </Button>
    </div>
  )
}
