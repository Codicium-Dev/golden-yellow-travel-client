import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../../lib/store";

// Define a type for the slice state
interface CityTourSlugState {
  [slug: string]: number;
}

// Load initial state from localStorage
const loadState = (): CityTourSlugState => {
  try {
    const serializedState = localStorage.getItem("cityTourSlugState");
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
const saveState = (state: CityTourSlugState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cityTourSlugState", serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

const removeState = (state: CityTourSlugState) => {
  try {
    localStorage.removeItem("cityTourSlugState");
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

const initialState: CityTourSlugState = loadState();

export const cityTourSlugSlice = createSlice({
  name: "cityTourSlug",
  initialState,
  reducers: {
    // Action to add a tour slug and ID
    addCityTour: (
      state,
      action: PayloadAction<{ slug: string; id: number }>
    ) => {
      const { slug, id } = action.payload;
      state[slug] = id;
      saveState(state);
    },
    // Action to remove a tour by slug
    removeCityTour: (state, action: PayloadAction<{ slug: string }>) => {
      const { slug } = action.payload;
      delete state[slug];
      saveState(state);
    },
  },
});

export const { addCityTour, removeCityTour } = cityTourSlugSlice.actions;

export const selectCityTour = (state: RootState) => state.cityTourSlug;

// Export the reducer
export default cityTourSlugSlice.reducer;
