export interface ModalState {
  isOpen: boolean
  modalType: string | null
  modalProps: Record<string, unknown>
  modalData: unknown
}

export interface OpenModalPayload {
  modalType: string
  modalProps?: Record<string, unknown>
  modalData?: unknown
}

export interface UpdateModalDataPayload {
  modalData: unknown
}
