import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IApp {
  showSearchBar: boolean;
  showMobileMenu: boolean;

  showLoginModal: boolean;
  showRegisterModal: boolean;
}

const initialState: IApp = {
  showSearchBar: false,
  showMobileMenu: false,
  showLoginModal: false,
  showRegisterModal: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShowSearchBar: (state: IApp, { payload }: PayloadAction<boolean>) => {
      state.showSearchBar = payload;
    },
    setShowLoginModal: (state: IApp, { payload }: PayloadAction<boolean>) => {
      state.showLoginModal = payload;
    },
    setShowMobileMenu: (state: IApp, { payload }: PayloadAction<boolean>) => {
      state.showMobileMenu = payload;
    },
    setShowRegisterModal: (
      state: IApp,
      { payload }: PayloadAction<boolean>
    ) => {
      state.showRegisterModal = payload;
    },
  },
});

export const {
  setShowSearchBar,
  setShowLoginModal,
  setShowRegisterModal,
  setShowMobileMenu,
} = appSlice.actions;
export default appSlice.reducer;
