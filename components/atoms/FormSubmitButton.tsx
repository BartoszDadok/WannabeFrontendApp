import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppSelector } from "../../store/hooks";
import { colors } from "../../styles/colors";

interface FormSubmitButtonProps {
  title: string;
  onPress?: any;
  submitting: boolean;
}

const FormSubmitButton = ({
  title,
  onPress,
  submitting,
}: FormSubmitButtonProps) => {
  const { mode } = useAppSelector((state) => state.theme);
  const backgroundColor = submitting
    ? colors[mode].primaryColor200
    : colors[mode].primaryColor500;
  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : null}
      style={[styles.container, { backgroundColor }]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 18, fontFamily: "open-sans" },
});

export default FormSubmitButton;
