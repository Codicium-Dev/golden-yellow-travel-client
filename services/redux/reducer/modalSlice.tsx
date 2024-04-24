import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../../lib/store"

// Define a type for the slice state
interface CounterState {
    isOpen: boolean
  }
  
// Define the initial state using that type
const initialState: CounterState = {
    isOpen: false,
}

export const modalSlice = createSlice({
    name : "modal",
    initialState,
    reducers : {
        ModalOpen : (state) => {
            state.isOpen = true
        },
        ModalClose : (state) => {
            state.isOpen = false
        }
    }
})

export const { ModalOpen, ModalClose } = modalSlice.actions

export const selectModal = (state : RootState) => state.modal.isOpen

export default modalSlice.reducer