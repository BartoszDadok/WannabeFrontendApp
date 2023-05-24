import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackNavigatorParamList = {
  Drawer: undefined;
  FlashcardScreen: {
    languageName: string;
  };
  DecksScreen: undefined;
  LoginScreen: {
    afterSignup?: boolean;
    afterResetPassword?: boolean;
  };
  ResetPasswordScreen: undefined;
  StripePaymentScreen: {
    languageName: string;
  };
  AuthScreen: {
    signupScreen: boolean;
  };
  DeleteAccountScreen: undefined;
};

export type DecksScreenNavigationProp = NativeStackNavigationProp<
  StackNavigatorParamList,
  "DecksScreen"
>;

export type FlashCardScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  "FlashcardScreen"
>;

export type FlashcardScreenNavigationProp = NativeStackNavigationProp<
  StackNavigatorParamList,
  "FlashcardScreen"
>;

export type LoginScreenScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  "LoginScreen"
>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  StackNavigatorParamList,
  "LoginScreen"
>;

export type AuthScreenScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  "AuthScreen"
>;
export type DeleteAccountnScreenNavigationProp = NativeStackNavigationProp<
  StackNavigatorParamList,
  "DeleteAccountScreen"
>;
