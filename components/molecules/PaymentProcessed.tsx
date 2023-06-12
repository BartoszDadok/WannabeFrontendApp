import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../styles/colors";
import { useAppSelector } from "../../store/hooks";

const PaymentProcessed = () => {
  const { mode } = useAppSelector((state) => state.theme);
  return (
    <View
      style={[
        styles.containerLoading,
        { backgroundColor: colors[mode].primaryColor500 },
      ]}
    >
      <ActivityIndicator size={20} color='black' />
      <Text style={styles.textLoading}>
        Your payment is being processed... It can take a few seconds.
      </Text>
      <Text></Text>
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
  textLoading: {
    textAlign: "center",
    fontSize: 18,
    marginLeft: 15,
    fontFamily: "open-sans",
  },
});
export default PaymentProcessed;
