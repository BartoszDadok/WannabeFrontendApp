import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { generateNextOrPrevNumber } from "../../utils/generateNextOrPrevNumber";
import { HTMLSource } from "react-native-render-html";
import BackCardNavigationButtons from "../molecules/BackCardNavigationButtons";
import BackCardHeader from "../atoms/BackCardHeader";
import BackCardQuestion from "../atoms/BackCardQuestion";

type Flashcard = HTMLSource[][];

interface Props {
  flashcard: Flashcard;
  flashcardNumber: number;
  setFlashcardNumber: React.Dispatch<React.SetStateAction<number>>;
  setActiveCardSide: React.Dispatch<React.SetStateAction<string>>;
  flashcardsAmount: number;
}

const BackCard = ({
  flashcard,
  flashcardNumber,
  setFlashcardNumber,
  setActiveCardSide,
  flashcardsAmount,
}: Props) => {
  const frontCard = flashcard[0][0];
  const backCard = flashcard[1];

  const nextQuestionHandler = () => {
    const newNumber = generateNextOrPrevNumber(
      flashcardNumber,
      flashcardsAmount,
      "next"
    );
    setActiveCardSide("front");
    setFlashcardNumber(newNumber);
  };
  const backHandler = () => {
    setActiveCardSide("front");
  };
  return (
    <Animated.View entering={SlideInLeft} style={styles.animatedContainer}>
      <View style={styles.container}>
        <BackCardHeader
          flashcardNumber={flashcardNumber}
          frontCard={frontCard}
        />
        <BackCardQuestion backCard={backCard} />
        <BackCardNavigationButtons
          backHandler={backHandler}
          nextQuestionHandler={nextQuestionHandler}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: { flex: 1 },
  container: {
    width: Dimensions.get("window").width,
    marginVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "space-between",
  },
});
export default BackCard;
