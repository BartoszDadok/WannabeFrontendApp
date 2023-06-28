import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import {
  render as rtlRender,
  RenderOptions,
} from "@testing-library/react-native";
import {
  configureStore,
  EmptyObject,
  EnhancedStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { api } from "../store/api/api";

import veryficationToken from "../store/state/veificationTokenSlice";
import theme from "../store/state/themeSlice";
import flashcard from "../store/state/flashCardSlice";
import dataUser from "../store/state/dataUserSlice";
import { RootState } from "../store";

type ReducerTypes = RootState;
type TStore = EnhancedStore<ReducerTypes>;

type CustomRenderOptions = {
  preloadedState?: PreloadedState<RootState & EmptyObject>;
  store?: TStore;
} & Omit<RenderOptions, "wrapper">;

function render(ui: ReactElement, options?: CustomRenderOptions) {
  const { preloadedState } = options || {};

  const store =
    options?.store ||
    configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
        veryficationToken,
        theme,
        flashcard,
        dataUser,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
          api.middleware
        ),
      preloadedState,
    });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react-native";
export { render };
