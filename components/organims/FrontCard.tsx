import React from "react";
import { StyleSheet, TouchableWithoutFeedback, Dimensions } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import FrontCardQuestion from "../atoms/FrontCardQuestion";
import FrontCardHeader from "../atoms/FrontCardHeader";
import FrontCardNavigationButtons from "../molecules/FrontCardNavigationButtons";
import GestureRecognizer from "react-native-swipe-gestures";
import { useAppSelector } from "../../store/hooks";
import { swapCard } from "../../store/state/flashCardSlice";
import { useAppDispatch } from "../../store/hooks";

interface Props {
  languageName: string;
}

const FrontCard = ({ languageName }: Props) => {
  const { flashcardNumber, flashcardsData } = useAppSelector(
    (state) => state.flashcard
  );
  if (!flashcardsData) return null;

  const frontCard = flashcardsData[flashcardNumber][0];
  const { width } = Dimensions.get("window");
  const dispatch = useAppDispatch();

  const goToNextOrPreviousCardHandler = (e: any) => {
    if (e.nativeEvent.locationX > width / 2) {
      dispatch(swapCard("next"));
    } else {
      dispatch(swapCard("previous"));
    }
  };

  return (
    <GestureRecognizer
      testID='GestureContainer'
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
      onSwipeLeft={() => dispatch(swapCard("next"))}
      onSwipeRight={() => dispatch(swapCard("previous"))}
    >
      <TouchableWithoutFeedback
        testID='Button'
        onPress={goToNextOrPreviousCardHandler}
      >
        <Animated.View entering={SlideInLeft} style={styles.container}>
          <FrontCardHeader languageName={languageName} />
          <FrontCardQuestion frontCard={frontCard} />
          <FrontCardNavigationButtons />
        </Animated.View>
      </TouchableWithoutFeedback>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default FrontCard;
