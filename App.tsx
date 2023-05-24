import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { useFonts } from "expo-font";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigatorParamList } from "./types/navigations.types";
import { logIn } from "./store/state/userDataSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { StripeProvider } from "@stripe/stripe-react-native";
import { removeVeryficationToken } from "./store/state/veificationTokenSlice";
import AppLoading from "./components/atoms/AppLoading";
import FlashcardScreen from "./screens/FlashcardScreen";
import { colors } from "./styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DrawerNavigator from "./navigator/DrawerNavigatior";
import { Appearance, Platform } from "react-native";
import { updateTheme } from "./store/state/themeSlice";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<StackNavigatorParamList>();

const Root = () => {
  const { mode } = useAppSelector((state) => state.theme);

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors[mode].backgroundColor,
    },
  };

  const [publishableKey, setPublishableKey] = useState("");

  const { isLoggedIn } = useAppSelector((state) => state.userData);

  const dispatch = useAppDispatch();

  const fetchAsyncStorage = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("id");
      const email = await AsyncStorage.getItem("email");
      const languages = await AsyncStorage.getItem("languages");

      const userData = { token, id, email, languages };

      const themeMode = (await AsyncStorage.getItem("mode")) as
        | "light"
        | "dark"
        | null;
      if (token && id && email && languages) {
        dispatch(logIn(userData));
      }
      if (themeMode) {
        dispatch(updateTheme(themeMode));
      }
    } catch ({ message }: any) {
      alert(message);
    } finally {
      await setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    }
  };

  useEffect(() => {
    fetchAsyncStorage();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(removeVeryficationToken());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => {
      if (!colorScheme) return;
      dispatch(updateTheme(colorScheme));
    });
  }, []);

  const fetchStripePublishableKey = async () => {
    try {
      const response = await fetch(
        "https://champagne-cockroach-wear.cyclic.app/stripe-publishable-key"
      );
      const { publishableStripeKey } = await response.json();

      return publishableStripeKey;
    } catch (e) {
      console.log(e);
      console.warn("Unable to fetch pusblishable key");
    }
  };

  const init = async () => {
    const publishableKey = await fetchStripePublishableKey();
    if (publishableKey) {
      setPublishableKey(publishableKey);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <StripeProvider publishableKey={publishableKey}>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            presentation:
              Platform.OS === "ios" ? undefined : "transparentModal",
            animation: "fade",
          }}
        >
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name='Drawer'
            component={DrawerNavigator}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              title: "Card",
              headerTintColor: colors[mode].textColor,
              headerStyle: {
                backgroundColor: colors[mode].menuColor,
              },
            }}
            name='FlashcardScreen'
            component={FlashcardScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
};

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
