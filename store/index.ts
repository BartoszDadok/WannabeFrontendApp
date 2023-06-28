import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import veryficationToken from "./state/veificationTokenSlice";
import theme from "./state/themeSlice";
import flashcard from "./state/flashCardSlice";
import dataUser from "./state/dataUserSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    veryficationToken,
    theme,
    flashcard,
    dataUser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
