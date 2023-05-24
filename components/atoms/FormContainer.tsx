import React from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from "react-native";

interface Props {
  children: React.ReactNode;
}

const FormContainer = ({ children }: Props) => {
  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    paddingHorizontal: 20,
  },
});

export default FormContainer;
