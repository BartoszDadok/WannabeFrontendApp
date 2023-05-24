import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../store/hooks";
import { colors } from "../../styles/colors";

interface FromHeaderProps {
  firstRowHeading: string;
  secondRowHeading: string;
}

const FormHeader = ({ firstRowHeading, secondRowHeading }: FromHeaderProps) => {
  const { mode } = useAppSelector((state) => state.theme);
  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: colors[mode].textColor }]}>
        {firstRowHeading}
      </Text>
      <Text style={[styles.heading2, { color: colors[mode].textColor }]}>
        {secondRowHeading}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  heading: { fontSize: 30, fontFamily: "open-sans-bold" },
  heading2: { fontSize: 20 },

  subHeading: {
    fontSize: 20,
    fontFamily: "open-sans-bold",
    textAlign: "center",
  },
});
export default FormHeader;
