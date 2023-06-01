import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { useFonts } from "expo-font";
import AppLoading from "./components/atoms/AppLoading";
import { Appearance } from "react-native";
import { Root } from "./root/root";

export default function App() {
  const mode = Appearance.getColorScheme() as "light" | "dark";

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) return <AppLoading theme={mode} />;

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
