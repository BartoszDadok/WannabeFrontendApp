import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TokenProps {
  veryficationToken: null | string;
}

const initialState: TokenProps = {
  veryficationToken: null,
};

export const veryficationTokenSlice = createSlice({
  name: "veryficationToken",
  initialState,
  reducers: {
    addVeryficationToken: (state, action: PayloadAction<null | string>) => {
      if (action.payload) {
        state.veryficationToken = action.payload;
        AsyncStorage.setItem("veryficationToken", action.payload);
      }
    },
    removeVeryficationToken: (state) => {
      state.veryficationToken = null;
      AsyncStorage.removeItem("veryficationToken");
    },
  },
});

export const { addVeryficationToken, removeVeryficationToken } =
  veryficationTokenSlice.actions;

export default veryficationTokenSlice.reducer;
