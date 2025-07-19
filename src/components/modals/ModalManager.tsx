import { useSelector } from "react-redux"
import { AppointmentBookingModal } from "./appointment-booking-modal"
// import { DoctorDetailsModal } from "./doctor-details-modal"
// import { ReviewModal } from "./review-modal"
// import { ProfileEditModal } from "./profile-edit-modal"
// import { ConfirmationModal } from "./confirmation-modal"
// import { HealthRecordModal } from "./health-record-modal"
// import { PaymentModal } from "./payment-modal"
// import { NotificationModal } from "./notification-modal"

const MODAL_COMPONENTS = {
  APPOINTMENT_BOOKING: AppointmentBookingModal,
//   DOCTOR_DETAILS: DoctorDetailsModal,
//   REVIEW: ReviewModal,
//   PROFILE_EDIT: ProfileEditModal,
//   CONFIRMATION: ConfirmationModal,
//   HEALTH_RECORD: HealthRecordModal,
//   PAYMENT: PaymentModal,
//   NOTIFICATION: NotificationModal,
}

export function ModalManager() {
  const { isOpen, modalType, modalProps, modalData } = useSelector((state) => state.modal)

  if (!isOpen || !modalType) {
    return null
  }

  const ModalComponent = MODAL_COMPONENTS[modalType as keyof typeof MODAL_COMPONENTS]

  if (!ModalComponent) {
    return null
  }

  return <ModalComponent {...modalProps} data={modalData} />
}
