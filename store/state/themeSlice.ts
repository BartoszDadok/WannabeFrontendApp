import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appearance } from "react-native";

export interface Theme {
  mode: "dark" | "light";
}
const systemTheme = Appearance.getColorScheme();

const initialState: Theme = {
  mode: systemTheme || "dark",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<"light" | "dark">) => {
      if (state.mode === action.payload) return;
      AsyncStorage.setItem("mode", action.payload);
      state.mode = action.payload;
    },
  },
});

export const { updateTheme } = themeSlice.actions;

export default themeSlice.reducer;
