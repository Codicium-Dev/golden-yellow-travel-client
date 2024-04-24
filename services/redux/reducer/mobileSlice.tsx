import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/services/lib/store";


interface mobileState {
    isOpen : boolean
}

const initialState : mobileState = {
    isOpen : false
}

export const mobileSlice = createSlice({
    name : "mobile",
    initialState,
    reducers : {
        mobileIsOpen : (state) => {
            state.isOpen = true
        },
        mobileIsClose : (state) => {
            state.isOpen = false
        },
        mobileToggle : (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

export const { mobileIsOpen, mobileIsClose, mobileToggle } = mobileSlice.actions

export const selectMobile = (state : RootState) => state.mobile.isOpen

export default mobileSlice.reducer;