import { BarChart3, Calendar, LogOut, MessageSquare, Settings, Stethoscope } from "lucide-react"
import { Button } from "../ui/Button"
import { authAPI } from "../../lib/api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Header: React.FC = () => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        await authAPI.logout()
        toast.success("Çıkış yapıldı")
        navigate("/auth/login")
    }
  return (
    <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-8">
        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-sm opacity-80"></div>
        </div>

        <nav className="flex flex-col space-y-6">
          <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-400 hover:text-gray-600 sidebar-nav-item">
            <BarChart3 className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-400 hover:text-gray-600 sidebar-nav-item">
            <Calendar className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-400 hover:text-gray-600 sidebar-nav-item">
            <MessageSquare className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 bg-gray-900 text-white hover:bg-gray-800 sidebar-nav-item"
          >
            <Stethoscope className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-400 hover:text-gray-600 sidebar-nav-item">
            <Settings className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-400 hover:text-gray-600 sidebar-nav-item">
          <LogOut onClick={handleLogout} className="w-6 h-6" />
          </Button>
        </nav>
      </div>
  )
}

export default Header