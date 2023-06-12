import { PreapredFlashCard } from "../../types/flashcards";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateNextOrPrevNumber } from "../../utils/generateNextOrPrevNumber";
interface flashCardsState {
  flashcardsData: PreapredFlashCard | null;
  flashcardNumber: number;
  activeCardSide: "front" | "back";
}
const initialState: flashCardsState = {
  flashcardsData: null,
  flashcardNumber: 0,
  activeCardSide: "front",
};

export const flashCardSlice = createSlice({
  name: "flashCard",
  initialState,
  reducers: {
    setFlashcardNumber: (state, action: PayloadAction<number>) => {
      if (action.payload) {
        state.flashcardNumber = action.payload;
      }
    },
    setActiveCardSide: (state, action: PayloadAction<"front" | "back">) => {
      if (action.payload) {
        state.activeCardSide = action.payload;
      }
    },
    setFLashcardsData: (
      state,
      action: PayloadAction<PreapredFlashCard | null>
    ) => {
      if (action.payload) {
        state.flashcardsData = action.payload;
      }
    },
    swapCard: (state, action: PayloadAction<"next" | "previous">) => {
      if (!state.flashcardsData) return;

      const newNumber = generateNextOrPrevNumber(
        state.flashcardNumber,
        state.flashcardsData.length,
        action.payload
      );

      state.flashcardNumber = newNumber;
    },
    resetFlashcards: (state) => {
      state.flashcardNumber = 0;
      state.flashcardsData = null;
      state.activeCardSide = "front";
    },
  },
});

export const {
  setActiveCardSide,
  setFLashcardsData,
  setFlashcardNumber,
  swapCard,
  resetFlashcards,
} = flashCardSlice.actions;

export default flashCardSlice.reducer;
