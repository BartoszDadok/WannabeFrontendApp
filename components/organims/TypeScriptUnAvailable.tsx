import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import { colors } from "../../styles/colors";

const TypeScriptUnAvailable = () => {
  const { mode } = useAppSelector((state) => state.theme);
  return (
    <View
      style={[
        styles.errorContainer,
        { backgroundColor: colors[mode].backgroundColor },
      ]}
    >
      <Text style={[styles.header, { color: colors[mode].textColor }]}>
        TypeScript questions are not available yet. We are working on that.
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
export default TypeScriptUnAvailable;
