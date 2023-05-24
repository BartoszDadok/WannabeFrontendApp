import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { useAppSelector } from "../../store/hooks";
import { colors } from "../../styles/colors";
interface Props {
  width: number;
  handler: any;
  title: string;
}
const NavigationButton = ({ handler, width, title }: Props) => {
  const { mode } = useAppSelector((state) => state.theme);
  return (
    <Pressable
      android_ripple={{ color: "rgba(255,228,0,0,8)" }}
      onPress={handler}
      style={[
        styles.button,
        { width: width, backgroundColor: colors[mode].menuColor },
      ]}
    >
      <Text style={{ color: colors[mode].textColor }}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    textAlign: "center",
    paddingVertical: 15,
    paddingHorizontal: 8,
  },
});
export default NavigationButton;
