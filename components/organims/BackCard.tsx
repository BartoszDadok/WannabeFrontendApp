import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import BackCardNavigationButtons from "../molecules/BackCardNavigationButtons";
import BackCardHeader from "../atoms/BackCardHeader";
import BackCardQuestion from "../atoms/BackCardQuestion";
import { useAppSelector } from "../../store/hooks";

const BackCard = () => {
  const { flashcardNumber, flashcardsData } = useAppSelector(
    (state) => state.flashcard
  );

  if (!flashcardsData) return null;

  const frontCard = flashcardsData[flashcardNumber][0][0];
  const backCard = flashcardsData[flashcardNumber][1];
  return (
    <Animated.View entering={SlideInLeft} style={styles.animatedContainer}>
      <View style={styles.container}>
        <BackCardHeader frontCard={frontCard} />
        <BackCardQuestion backCard={backCard} />
        <BackCardNavigationButtons />
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
