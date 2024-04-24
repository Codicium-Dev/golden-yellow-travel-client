import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../lib/store"

// Define a type for the slice state
interface NavigateState {
  search: string
}

// Define the initial state using that type
const initialState: NavigateState = {
  search: "",
}

export const packNavSlice = createSlice({
  name: "packNav",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    packNav: (state, action: PayloadAction<string>) => {
      state.search = action.payload
      return state;
    }
  },
})

export const { packNav } =
  packNavSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectNavigate = (state: RootState) => state.packNav.search

export default packNavSlice.reducer