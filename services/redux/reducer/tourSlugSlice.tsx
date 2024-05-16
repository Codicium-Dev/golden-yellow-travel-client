import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../../lib/store";

// Define a type for the slice state
interface TourSlugState {
  [slug: string]: number;
}

// Load initial state from localStorage
const loadState = (): TourSlugState => {
  try {
    const serializedState = localStorage.getItem("tourSlugState");
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return {};
  }
};

// Save state to localStorage
const saveState = (state: TourSlugState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("tourSlugState", serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

const removeState = (state: TourSlugState) => {
  try {
    localStorage.removeItem("tourSlugState");
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

const initialState: TourSlugState = loadState();

export const tourSlugSlice = createSlice({
  name: "tourSlug",
  initialState,
  reducers: {
    // Action to add a tour slug and ID
    addTour: (state, action: PayloadAction<{ slug: string; id: number }>) => {
      const { slug, id } = action.payload;
      state[slug] = id;
      saveState(state);
    },
    // Action to remove a tour by slug
    removeTour: (state, action: PayloadAction<{ slug: string }>) => {
      const { slug } = action.payload;
      delete state[slug];
      saveState(state);
    },
  },
});

export const { addTour, removeTour } = tourSlugSlice.actions;

export const selectTours = (state: RootState) => state.tourSlug;

// Export the reducer
export default tourSlugSlice.reducer;
