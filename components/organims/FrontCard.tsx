import React from "react";
import {
  View,
  StyleSheet,
  Touchable,
  TouchableWithoutFeedback,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { generateNextOrPrevNumber } from "../../utils/generateNextOrPrevNumber";
import { HTMLSource } from "react-native-render-html";
import FrontCardQuestion from "../atoms/FrontCardQuestion";
import FrontCardHeader from "../atoms/FrontCardHeader";
import FrontCardNavigationButtons from "../molecules/FrontCardNavigationButtons";
import GestureRecognizer from "react-native-swipe-gestures";
type Flashcard = HTMLSource[][];

interface Props {
  languageName: string;
  flashcard: Flashcard;
  setActiveCardSide: React.Dispatch<React.SetStateAction<string>>;
  flashcardNumber: number;
  setFlashcardNumber: React.Dispatch<React.SetStateAction<number>>;
  flashcardsAmount: any;
}

const FrontCard = ({
  setActiveCardSide,
  flashcardNumber,
  setFlashcardNumber,
  flashcard,
  languageName,
  flashcardsAmount,
}: Props) => {
  const frontCard = flashcard[0];
  const { width } = Dimensions.get("window");

  const questionsHandler = (direction: "next" | "previous") => {
    const newNumber = generateNextOrPrevNumber(
      flashcardNumber,
      flashcardsAmount,
      direction
    );
    setFlashcardNumber(newNumber);
  };
  const goToNextOrPreviousCardHandler = (e: any) => {
    if (e.nativeEvent.locationX > width / 2) {
      questionsHandler("next");
    } else {
      questionsHandler("previous");
    }
  };

  return (
    <GestureRecognizer
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
      onSwipeLeft={() => questionsHandler("next")}
      onSwipeRight={() => questionsHandler("previous")}
    >
      <TouchableWithoutFeedback onPress={goToNextOrPreviousCardHandler}>
        <Animated.View entering={SlideInLeft} style={styles.container}>
          <FrontCardHeader
            flashcardNumber={flashcardNumber}
            languageName={languageName}
          />
          <FrontCardQuestion frontCard={frontCard} />
          <FrontCardNavigationButtons
            questionsHandler={questionsHandler}
            setActiveCardSide={setActiveCardSide}
          />
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
