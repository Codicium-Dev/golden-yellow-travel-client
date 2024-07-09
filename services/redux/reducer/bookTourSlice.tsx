import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../../lib/store";

// Define types for the slice state
// interface TourData {
//   adults: number;
//   children: number;
//   infants: number;
//   destinations: string;
//   tour_type: string;
//   arrival_date: string;
//   arrival_airport: string;
//   accommodation: string;
//   full_name: string;
//   email: string;
//   phone: string;
//   own_country: string;
//   how_u_know: string;
//   other_information: string;
//   special_note: string;
// }

// interface CustomerData {
//   adults: number;
//   childrens: number;
//   infants: number;
//   destinations: string;
//   tourType: string;
//   arrivalDate: string;
//   arrivalAirport: string;
//   accommo: string;
//   fullName: string;
//   email: string;
//   phone: string;
//   country: string;
//   how: string;
//   otherInfo: string;
//   special: string;
// }

interface BookingData {
  tourData: any;
  customerData: any;
  customerEmail: string;
}

interface BookingState {
  bookingData?: BookingData;
}

// Load initial state from localStorage
const loadState = (): BookingState => {
  try {
    const serializedState = localStorage.getItem("bookingData");
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
const saveState = (state: BookingState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("bookingData", serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

const initialState: BookingState = loadState();

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // Action to set booking data
    setBookingData: (state, action: PayloadAction<BookingData>) => {
      state.bookingData = action.payload;
      saveState(state);
    },
    // Action to clear booking data
    clearBookingData: (state) => {
      state.bookingData = undefined;
      saveState(state);
    },
  },
});

export const { setBookingData, clearBookingData } = bookingSlice.actions;

// Selector to retrieve booking data
export const selectBookingData = (state: RootState) =>
  state.booking.bookingData;

// Export the reducer
export default bookingSlice.reducer;
