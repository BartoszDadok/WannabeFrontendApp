export type FlashCards = {
  _id: string;
  flashcard: string[];
}[];

export interface FlashCard {
  _id: string;
  flashcard: string[];
}

export interface FlashcardsApi {
  data: FlashCard[];
}
export type PreapredFlashCard = { html: string }[][][];
