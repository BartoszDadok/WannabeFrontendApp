import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../styles/colors";
import { useAppSelector } from "../../store/hooks";

const WaitingForStripe = () => {
  const { mode } = useAppSelector((state) => state.theme);
  return (
    <View
      style={[
        styles.containerLoading,
        { backgroundColor: colors[mode].backgroundColor },
      ]}
    >
      <ActivityIndicator size={30} color='rgba(255,228,0,1)' />
      <Text style={{ color: colors[mode].textColor }}>
        Loading payment form...
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  containerLoading: {
    position: "absolute",
    top: 0,
    flexDirection: "column",
    width: "100%",
    margin: 10,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
});
export default WaitingForStripe;
