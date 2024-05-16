import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../../lib/store";

// Define a type for the slice state
interface TourSlugState {
  [slug: string]: number;
}

// Define the initial state using that type
const initialState: TourSlugState = {};

export const tourSlugSlice = createSlice({
  name: "tourSlug",
  initialState,
  reducers: {
    // Action to add a tour slug and ID
    addTour: (state, action: PayloadAction<{ slug: string; id: number }>) => {
      const { slug, id } = action.payload;
      state[slug] = id;
    },
    // Action to remove a tour by slug
    removeTour: (state, action: PayloadAction<{ slug: string }>) => {
      const { slug } = action.payload;
      delete state[slug];
    },
  },
});

export const { addTour, removeTour } = tourSlugSlice.actions;

export const selectTours = (state: RootState) => state.tourSlug;

// Export the reducer
export default tourSlugSlice.reducer;
