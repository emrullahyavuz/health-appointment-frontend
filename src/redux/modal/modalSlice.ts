import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ModalState, OpenModalPayload, UpdateModalDataPayload } from "./modalTypes"

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
  modalProps: {},
  modalData: null,
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenModalPayload>) => {
      state.isOpen = true
      state.modalType = action.payload.modalType
      state.modalProps = action.payload.modalProps || {}
      state.modalData = action.payload.modalData || null
    },
    closeModal: (state) => {
      state.isOpen = false
      state.modalType = null
      state.modalProps = {}
      state.modalData = null
    },
    updateModalData: (state, action: PayloadAction<UpdateModalDataPayload>) => {
      state.modalData = action.payload.modalData
    },
  },
})

export const { openModal, closeModal, updateModalData } = modalSlice.actions
export default modalSlice.reducer
