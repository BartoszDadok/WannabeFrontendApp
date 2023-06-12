import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import NavigationButton from "../atoms/NavigationButton";
import { useAppDispatch } from "../../store/hooks";
import { setActiveCardSide, swapCard } from "../../store/state/flashCardSlice";

const BackCardNavigationButtons = () => {
  const dispatch = useAppDispatch();
  const deviceWidth = Dimensions.get("window").width;
  const buttonWidth = deviceWidth / 2.5 - 20;

  const nextQuestionHandler = () => {
    dispatch(setActiveCardSide("front"));
    dispatch(swapCard("next"));
  };

  return (
    <View style={styles.container}>
      <NavigationButton
        handler={() => {
          dispatch(setActiveCardSide("front"));
        }}
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
