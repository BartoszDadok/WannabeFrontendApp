import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import RenderHtml, { HTMLSource } from "react-native-render-html";
import { useAppSelector } from "../../store/hooks";
import { colors } from "../../styles/colors";
interface Props {
  frontCard: HTMLSource;
}

const BackCardHeader = ({ frontCard }: Props) => {
  const deviceWidth = Dimensions.get("window").width;
  const { mode } = useAppSelector((state) => state.theme);
  const { flashcardNumber } = useAppSelector((state) => state.flashcard);
  const mixedStyleFront = {
    h1: {
      color: colors[mode].textColor,
      fontSize: 22,
      textAlign: "center",
      fontWeight: "normal",
      marginVertical: 5,
      paddingBottom: 3,
      borderBottomWidth: 1,
      borderBottomColor: "#a3a3a3",
    },
  };

  return (
    <View style={styles.containter}>
      <RenderHtml
        // @ts-ignore
        tagsStyles={mixedStyleFront}
        contentWidth={deviceWidth}
        source={frontCard}
      />
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

export default BackCardHeader;

const styles = StyleSheet.create({
  containter: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginVertical: 5,
  },
  order: {
    color: "black",
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontSize: 18,
  },
});
