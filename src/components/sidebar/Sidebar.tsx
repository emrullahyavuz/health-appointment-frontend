import { useLocation, useNavigate } from "react-router-dom"
import { LogOut } from "lucide-react"
import { Button } from "../ui/Button"
import { toast } from "sonner"
import { sidebarItems } from "./sidebarItems"
import { logoutUser } from "../../redux/auth/authSlice"
import type { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import { openModal } from "../../redux/modal/modalSlice";

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const {user: userData} = useSelector((state: RootState) => state.auth)
  const {isOpen: isOpenModal} = useSelector((state: RootState) => state.modal)
  

  const handleNavigation = (href: string) => {
    navigate(href)
  }

  const handleLogout = async () => {
    try {
      dispatch(openModal({modalType: "confirmation"}))
     
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  const handleConfirmLogout = async () => {
    try {
      await dispatch(logoutUser())
      toast.success("Başarıyla çıkış yapıldı")
      navigate("/auth/login")
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  const user = {
    role: userData?.role
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

      {isOpenModal && <ConfirmationModal data={{
        title: "Çıkış Yap",
        message: "Çıkış yapmak istediğinize emin misiniz?",
        type: "warning",
        confirmText: "Çıkış Yap",
        cancelText: "İptal",
        onConfirm: handleConfirmLogout,
      }} />}
    </div>
  )
}
