import bookingReducer from "../redux/reducer/bookTourSlice";
import cityTourSlugReducer from "../redux/reducer/cityTourSlugSlice";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/reducer/counterSlice";
import mainSearchReducer from "../redux/reducer/mainSearchSlice";
import mobileReducer from "../redux/reducer/mobileSlice";
import modalReducer from "../redux/reducer/modalSlice";
import navigateReducer from "../redux/reducer/navigateSlice";
import newsSlugReducer from "../redux/reducer/newsSlugSlice";
import packNavReducer from "../redux/reducer/packageSlice";
import tourSlugReducer from "../redux/reducer/tourSlugSlice";

export const rootStore = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalReducer,
    mobile: mobileReducer,
    navigate: navigateReducer,
    packNav: packNavReducer,
    mainSearch: mainSearchReducer,
    tourSlug: tourSlugReducer,
    cityTourSlug: cityTourSlugReducer,
    newsSlug: newsSlugReducer,
    booking: bookingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch;
