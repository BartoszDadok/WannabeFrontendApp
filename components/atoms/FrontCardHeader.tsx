import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { capitalizeLetters } from "../../utils/capitalizeLetters";
import { useAppSelector } from "../../store/hooks";
import { colors } from "../../styles/colors";

interface Props {
  languageName: string;
}

const FrontCardHeader = ({ languageName }: Props) => {
  const { mode } = useAppSelector((state) => state.theme);
  const { flashcardNumber } = useAppSelector((state) => state.flashcard);
  const capitalizedLanguageName = capitalizeLetters(languageName);

  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text style={[styles.headerText, { color: colors[mode].textColor }]}>
        {capitalizedLanguageName} interview question
      </Text>
      <Text
        style={[
          styles.order,
          {
            color: colors[mode].textColor,
            backgroundColor: colors[mode].orderbackGroundColor,
          },
        ]}
      >
        Card: {flashcardNumber + 1}
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
    marginBottom: 5,
  },
  order: {
    color: "black",
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontSize: 18,
  },
});
