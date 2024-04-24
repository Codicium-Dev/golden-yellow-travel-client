import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../lib/store"

// Define a type for the slice state
interface mainSearchState {
  search: string
}

// Define the initial state using that type
const initialState: mainSearchState = {
  search: '',
}

export const mainSearchSlice = createSlice({
  name: "mainSearch",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setMainSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
})

export const { setMainSearch } =
  mainSearchSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.mainSearch.search

export default mainSearchSlice.reducer