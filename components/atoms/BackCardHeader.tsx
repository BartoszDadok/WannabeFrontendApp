import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import RenderHtml, { HTMLSource } from "react-native-render-html";
import { useAppSelector } from "../../store/hooks";
import { colors } from "../../styles/colors";
interface Props {
  flashcardNumber: number;
  frontCard: HTMLSource;
}

const BackCardHeader = ({ flashcardNumber, frontCard }: Props) => {
  const deviceWidth = Dimensions.get("window").width;
  const { mode } = useAppSelector((state) => state.theme);

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
    <View style={styles.frontCard}>
      <Text style={[styles.order, { color: colors[mode].orderColor }]}>
        {flashcardNumber + 1}
      </Text>
      <RenderHtml
        // @ts-ignore
        tagsStyles={mixedStyleFront}
        contentWidth={deviceWidth}
        source={frontCard}
      />
    </View>
  );
};

export default BackCardHeader;

const styles = StyleSheet.create({
  frontCard: {
    marginVertical: 5,
  },
  order: {
    position: "absolute",
    top: -40,
    fontFamily: "open-sans-bold",
    right: -25,
    fontSize: 150,
  },
});
