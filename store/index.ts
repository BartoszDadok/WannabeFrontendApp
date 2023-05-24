import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import userData from "./state/userDataSlice";
import veryficationToken from "./state/veificationTokenSlice";
import theme from "./state/themeSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    userData,
    veryficationToken,
    theme,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
