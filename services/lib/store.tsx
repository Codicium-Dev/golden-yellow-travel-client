import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "../redux/reducer/counterSlice"
import modalReducer from "../redux/reducer/modalSlice"
import mobileReducer from "../redux/reducer/mobileSlice"
import navigateReducer from "../redux/reducer/navigateSlice"
import packNavReducer from "../redux/reducer/packageSlice"
import mainSearchReducer from "../redux/reducer/mainSearchSlice"

export const rootStore = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalReducer,
    mobile : mobileReducer,
    navigate : navigateReducer,
    packNav : packNavReducer,
    mainSearch : mainSearchReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch