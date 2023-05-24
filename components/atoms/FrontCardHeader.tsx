import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { useAppSelector } from "../../store/hooks";
import { colors } from "../../styles/colors";

interface Props {
  languageName: string;
  flashcardNumber: number;
}

const FrontCardHeader = ({ languageName, flashcardNumber }: Props) => {
  const { mode } = useAppSelector((state) => state.theme);

  const capitalizedLanguageName =
    languageName === "html" || languageName === "css"
      ? languageName.toLocaleUpperCase()
      : capitalizeFirstLetter(languageName);

  return (
    <View>
      <Text style={[styles.headerText, { color: colors[mode].textColor }]}>
        {capitalizedLanguageName} interview question
      </Text>
      <Text style={[styles.order, { color: colors[mode].orderColor }]}>
        {flashcardNumber + 1}
      </Text>
    </View>
  );
};

export default FrontCardHeader;

const styles = StyleSheet.create({
  headerText: {
    width: "90%",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "open-sans",
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#323232",
  },
  order: {
    position: "absolute",
    top: 0,
    fontFamily: "open-sans-bold",
    right: 0,
    fontSize: 170,
  },
});
