import { FlashCard, FlashCards } from "../types/flashcards";
import Hjson from "hjson";

export const prepareFlashcardsToRender = (flashcards: FlashCard[]) => {
  return flashcards.map(({ flashcard }) => {
    const frontCard = Hjson.parse(flashcard[0]) as { html: string }[];
    const backCard = Hjson.parse(flashcard[1]) as { html: string }[];
    return [frontCard, backCard];
  });
};
