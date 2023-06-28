import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import ContactForm from "../components/organims/ContactForm";
import DecksScreen from "../screens/DecksScreen";
import AuthScreen from "../screens/AuthScreen";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logOut } from "../store/state/dataUserSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import StripePaymentScreen from "../screens/StripePaymentScreen";
import { StatusBar } from "react-native";
import ThemePanel from "../components/organims/ThemePanel";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
import IOSPaymentScreen from "../screens/IOSPaymentScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.dataUser.isLoggedIn);

  const { mode } = useAppSelector((state) => state.theme);

  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <View
            style={{ flex: 1, backgroundColor: colors[mode].navigationColor }}
          >
            <StatusBar
              backgroundColor={colors[mode].menuColor}
              barStyle={mode === "dark" ? "light-content" : "dark-content"}
            />
            <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
              <View style={{ marginTop: 30 }}>
                <DrawerItemList {...props} />
                <ThemePanel />
              </View>

              {isLoggedIn && (
                <Pressable
                  style={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginBottom: 40,
                  }}
                  onPress={() => {
                    dispatch(logOut());
                    props.navigation.closeDrawer();
                    props.navigation.navigate("DecksScreen");
                  }}
                >
                  <Text
                    style={{
                      backgroundColor: colors[mode].menuColor,
                      color: colors[mode].textColor,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                    }}
                  >
                    Log out
                  </Text>
                </Pressable>
              )}
            </SafeAreaView>
          </View>
        );
      }}
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <View>
            <Pressable onPress={navigation.toggleDrawer}>
              <Text>
                <Ionicons
                  name='ios-menu-outline'
                  size={40}
                  color={colors[mode].textColor}
                />
              </Text>
            </Pressable>
          </View>
        ),
        headerLeftContainerStyle: {
          display: "flex",
          marginLeft: 10,
        },
        headerStyle: {
          backgroundColor: colors[mode].menuColor,
        },
        headerTitle: "Wannabe",
        headerTitleStyle: {
          fontSize: 25,
          fontFamily: "open-sans",
          color: colors[mode].textColor,
        },
        headerTitleAlign: "center",
        drawerActiveBackgroundColor: colors[mode].activeNavigationColor,
      })}
    >
      <Drawer.Screen
        name='DecksScreen'
        component={DecksScreen}
        options={{
          title: "Decs",
          drawerLabelStyle: { color: colors[mode].textColor },
        }}
      />
      <Drawer.Screen
        name='ContactScreen'
        component={ContactForm}
        options={{
          title: "Contact",
          drawerLabelStyle: { color: colors[mode].textColor },
        }}
      />

      <Drawer.Screen
        name='SignupScreen'
        component={AuthScreen}
        initialParams={{ signupScreen: true }}
        options={{
          title: "Sign up",
          drawerItemStyle: { display: isLoggedIn ? "none" : "flex" },
          drawerLabelStyle: { color: colors[mode].textColor },
        }}
      />
      <Drawer.Screen
        name='LoginScreen'
        component={AuthScreen}
        options={{
          title: "Log in",
          drawerItemStyle: { display: isLoggedIn ? "none" : "flex" },
          drawerLabelStyle: { color: colors[mode].textColor },
        }}
      />
      <Drawer.Screen
        name='ResetPasswordScreen'
        component={ResetPasswordScreen}
        options={{
          title: "Reset password",
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name='StripePaymentScreen'
        component={StripePaymentScreen}
        options={{
          title: "Stripe payment",
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name='IOSPaymentScreen'
        component={IOSPaymentScreen}
        options={{
          title: "IOS payment",
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name='DeleteAccount'
        component={DeleteAccountScreen}
        options={{
          title: "Delete account",
          drawerItemStyle: { display: !isLoggedIn ? "none" : "flex" },
          drawerLabelStyle: { color: colors[mode].textColor },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
const styles = StyleSheet.create({});
