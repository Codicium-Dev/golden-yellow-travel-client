import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../../lib/store";

// Define a type for the slice state
interface NewsSlugState {
  [slug: string]: number;
}

// Load initial state from localStorage
const loadState = (): NewsSlugState => {
  try {
    const serializedState = localStorage.getItem("newsSlugState");
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
const saveState = (state: NewsSlugState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("newsSlugState", serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

const removeState = (state: NewsSlugState) => {
  try {
    localStorage.removeItem("newsSlugState");
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

const initialState: NewsSlugState = loadState();

export const newsSlugSlice = createSlice({
  name: "newsSlug",
  initialState,
  reducers: {
    addNews: (state, action: PayloadAction<{ slug: string; id: number }>) => {
      const { slug, id } = action.payload;
      state[slug] = id;
      saveState(state);
    },
    removeNews: (state, action: PayloadAction<{ slug: string }>) => {
      const { slug } = action.payload;
      delete state[slug];
      saveState(state);
    },
  },
});

export const { addNews, removeNews } = newsSlugSlice.actions;

export const selectNews = (state: RootState) => state.newsSlug;

// Export the reducer
export default newsSlugSlice.reducer;
