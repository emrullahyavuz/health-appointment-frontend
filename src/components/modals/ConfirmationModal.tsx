import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react"
import { BaseModal } from "./BaseModal"
import { Button } from "../ui/Button"
import { useDispatch } from "react-redux"
import { closeModal } from "../../redux/modal/modalSlice"
import type { AppDispatch } from "../../redux/store"

interface ConfirmationModalProps {
  data?: {
    title: string
    message: string
    type: "warning" | "success" | "error" | "info"
    confirmText?: string
    cancelText?: string
    onConfirm?: () => void
    onCancel?: () => void
  }
}

export function ConfirmationModal({ data }: ConfirmationModalProps) {
  const dispatch = useDispatch<AppDispatch>()
  

  const {
    title = "Confirm Action",
    message = "Are you sure you want to proceed?",
    type = "warning",
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
  } = data || {}


  const handleConfirm = () => {
    onConfirm?.()
    dispatch(closeModal())
  }

  const handleCancel = () => {
    onCancel?.()
    dispatch(closeModal())
  }

  const iconMap = {
    warning: AlertTriangle,
    success: CheckCircle,
    error: XCircle,
    info: Info,
  }

  const colorMap = {
    warning: "text-yellow-600 bg-yellow-100",
    success: "text-green-600 bg-green-100",
    error: "text-red-600 bg-red-100",
    info: "text-blue-600 bg-blue-100",
  }

  const buttonColorMap = {
    warning: "bg-yellow-600 hover:bg-yellow-700",
    success: "bg-green-600 hover:bg-green-700",
    error: "bg-red-600 hover:bg-red-700",
    info: "bg-blue-600 hover:bg-blue-700",
  }

  const Icon = iconMap[type]

  return (
    <BaseModal size="sm" showCloseButton={false}>
      <div className="text-center space-y-6">
        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${colorMap[type]}`}>
          <Icon className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{message}</p>
        </div>

        <div className="flex justify-center space-x-3">
          <Button variant="outline" onClick={handleCancel}>
            {cancelText}
          </Button>
          <Button onClick={handleConfirm} className={buttonColorMap[type]}>
            {confirmText}
          </Button>
        </div>
      </div>
    </BaseModal>
  )
}
