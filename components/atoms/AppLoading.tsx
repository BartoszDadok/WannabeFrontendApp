import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { colors } from "../../styles/colors";

const AppLoading = ({ theme }: { theme: "dark" | "light" }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[theme].backgroundColor },
      ]}
    >
      <ActivityIndicator color="rgba(255,228,0,1)" />
      <Text style={[styles.text, { color: colors[theme].textColor }]}>
        Loading...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    margin: 5,
    fontSize: 12,
  },
});

export default AppLoading;
