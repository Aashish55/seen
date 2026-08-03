import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  mobileNavOpen: boolean;
  newsletterStatus: "idle" | "loading" | "success" | "error";
}

const initialState: UiState = {
  mobileNavOpen: false,
  newsletterStatus: "idle",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobileNavOpen(state, action: PayloadAction<boolean>) {
      state.mobileNavOpen = action.payload;
    },
    setNewsletterStatus(state, action: PayloadAction<UiState["newsletterStatus"]>) {
      state.newsletterStatus = action.payload;
    },
  },
});

export const { setMobileNavOpen, setNewsletterStatus } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
