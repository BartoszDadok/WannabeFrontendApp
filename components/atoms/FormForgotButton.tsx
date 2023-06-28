import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp } from "../../types/navigations.types";

const FormForgotButton = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  return (
    <Pressable
      onPress={() => navigation.navigate("ResetPasswordScreen")}
      style={styles.container}
      android_ripple={{ color: "rgba(255,228,0,0,8)" }}
      testID='ForgotPassword'
    >
      <Text style={styles.text}>Forgot password?</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 7 },
  text: { fontSize: 16, color: "#7089f8", fontFamily: "open-sans" },
});
export default FormForgotButton;
