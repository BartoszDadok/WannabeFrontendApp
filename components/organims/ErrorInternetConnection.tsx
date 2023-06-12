import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../store/hooks";
import { colors } from "../../styles/colors";

const ErrorInternetConnection = () => {
  const { mode } = useAppSelector((state) => state.theme);
  return (
    <View
      style={[
        styles.errorContainer,
        { backgroundColor: colors[mode].backgroundColor },
      ]}
    >
      <Text style={[styles.header, { color: colors[mode].textColor }]}>
        Something went wrong, check your internet connection.
      </Text>
      <Text style={[styles.header, { color: colors[mode].textColor }]}>
        If you are online, please try again later.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontFamily: "open-sans",
    textAlign: "center",
    marginBottom: 10,
  },
});
export default ErrorInternetConnection;
