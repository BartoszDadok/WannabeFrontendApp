import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IsLoggedIn {
  token: null | string;
  isLoggedIn: boolean;
  id: null | string;
  email: null | string;
  languages: null | string;
}

const initialState: IsLoggedIn = {
  token: null,
  isLoggedIn: false,
  id: null,
  email: null,
  languages: null,
};

export const userDataSlice = createSlice({
  name: "isLoggedIn",
  initialState,
  reducers: {
    logIn: (
      state,
      action: PayloadAction<{
        id: null | string;
        email: null | string;
        token: null | string;
        languages: null | string;
      }>
    ) => {
      if (
        action.payload.token &&
        action.payload.id &&
        action.payload.email &&
        action.payload.languages
      ) {
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.languages = action.payload.languages;
        state.isLoggedIn = true;
        AsyncStorage.setItem("token", action.payload.token);
        AsyncStorage.setItem("id", action.payload.id);
        AsyncStorage.setItem("email", action.payload.email);
        AsyncStorage.setItem("languages", action.payload.languages);
      }
    },
    logOut: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("id");
      AsyncStorage.removeItem("email");
      AsyncStorage.removeItem("languages");
    },
    addLanguage: (state, action: PayloadAction<null | string>) => {
      if (action.payload) {
        const updatedLanguages = state.languages + action.payload;
        state.languages = updatedLanguages;

        AsyncStorage.setItem("language", updatedLanguages);
      }
    },
  },
});

export const { logIn, logOut, addLanguage } = userDataSlice.actions;

export default userDataSlice.reducer;
