import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import NavigationButton from "../atoms/NavigationButton";
interface Props {
  backHandler: () => void;
  nextQuestionHandler: () => void;
}

const BackCardNavigationButtons = ({
  backHandler,
  nextQuestionHandler,
}: Props) => {
  const deviceWidth = Dimensions.get("window").width;
  const buttonWidth = deviceWidth / 2.5 - 20;
  return (
    <View style={styles.container}>
      <NavigationButton
        handler={backHandler}
        width={buttonWidth}
        title={"Back"}
      />
      <NavigationButton
        handler={nextQuestionHandler}
        width={buttonWidth}
        title={"Next question"}
      />
    </View>
  );
};

export default BackCardNavigationButtons;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: Platform.OS === "ios" ? 20 : 5,
  },
});
