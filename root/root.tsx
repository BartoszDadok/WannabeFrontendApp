import React, { useEffect, useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigatorParamList } from "../types/navigations.types";
import { logIn } from "../store/state/userDataSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { StripeProvider } from "@stripe/stripe-react-native";
import { removeVeryficationToken } from "../store/state/veificationTokenSlice";
import FlashcardScreen from "../screens/FlashcardScreen";
import { colors } from "../styles/colors";
import DrawerNavigator from "../navigator/DrawerNavigatior";
import { Appearance, Platform } from "react-native";
import { updateTheme } from "../store/state/themeSlice";
import * as SplashScreen from "expo-splash-screen";
import { fetchAsyncStorage } from "../utils/fetchAsyncStorage";
import { fetchAsyncStorageTheme } from "../utils/fetchAsyncStorageTheme";
import { useLazyGetPublishableStripeKeyQuery } from "../store/api/api";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<StackNavigatorParamList>();

export const Root = () => {
  const [getPublishableStripeKey] = useLazyGetPublishableStripeKeyQuery();
  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors[mode].backgroundColor,
    },
  };

  const [publishableKey, setPublishableKey] = useState("");

  const { isLoggedIn } = useAppSelector((state) => state.dataUser);

  const updateThemeInit = async () => {
    const themeMode = await fetchAsyncStorageTheme();
    if (themeMode) {
      dispatch(updateTheme(themeMode));
    }
  };

  const updateUserStateInit = async () => {
    const userData = await fetchAsyncStorage();
    if (userData) {
      const { token, id, email, languages } = userData;
      if (token && id && email && languages) {
        dispatch(logIn(userData));
      }
    }
  };

  const stripeInit = async () => {
    try {
      const { publishableStripeKey } = await getPublishableStripeKey().unwrap();
      if (publishableStripeKey) {
        setPublishableKey(publishableStripeKey);
      }
    } catch (err) {
      console.log(err);
      console.warn("Unable to fetch pusblishable key");
    }
  };
  const removeVeryfiToken = () => {
    if (isLoggedIn) {
      dispatch(removeVeryficationToken());
    }
  };
  const themeListener = () => {
    Appearance.addChangeListener(({ colorScheme }) => {
      if (!colorScheme) return;
      dispatch(updateTheme(colorScheme));
    });
  };

  useEffect(() => {
    updateThemeInit();
  }, []);

  useEffect(() => {
    updateUserStateInit();
  }, []);

  useEffect(() => {
    stripeInit();
  }, []);

  useEffect(() => {
    removeVeryfiToken();
  }, [isLoggedIn]);

  useEffect(() => {
    themeListener();
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
              title: "Go back to decks",
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
