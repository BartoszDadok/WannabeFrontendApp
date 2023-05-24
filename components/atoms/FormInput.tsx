import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import { colors } from "../../styles/colors";

interface FormInputProps {
  placeholder: string;
  label: string;
  value?: string;
  onChangeText?: (value: string) => void;
  autoCapitalize: "none" | "sentences" | "words" | "characters" | undefined;
  error?: string | false | undefined;
  onBlur?: (e: any) => void;
  secureTextEntry?: boolean;
}

const FormInput = (props: FormInputProps) => {
  const { mode } = useAppSelector((state) => state.theme);
  const { placeholder, label, error } = props;
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={[styles.inputText, { color: colors[mode].textColor }]}>
          {label}
        </Text>
        {error ? <Text style={styles.inputErrorText}>{error}</Text> : null}
      </View>
      <TextInput
        {...props}
        placeholder={placeholder}
        style={[styles.input, { backgroundColor: colors[mode].inputColor }]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 40,
    fontSize: 16,
    fontFamily: "open-sans",
    paddingLeft: 10,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  inputText: { fontFamily: "open-sans-bold" },
  inputErrorText: { color: "red", fontSize: 14, fontFamily: "open-sans" },
});
export default FormInput;
