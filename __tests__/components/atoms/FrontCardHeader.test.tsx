import FrontCardHeader from "../../../components/atoms/FrontCardHeader";
import { render } from "../../../utils/test-utils";

describe("FrontCardHeader", () => {
  test("Should render FrontCardHeader", () => {
    const { getByText } = render(<FrontCardHeader languageName='javascript' />);
    expect(getByText("JavaScript interview question")).toBeTruthy();
  });

  test("Should render flashcard number", () => {
    const { getByText } = render(
      <FrontCardHeader languageName='javascript' />,
      {
        preloadedState: {
          flashcard: {
            flashcardsData: null,
            flashcardNumber: 0,
            activeCardSide: "front",
          },
        },
      }
    );
    expect(getByText("Card: 1")).toBeTruthy();
  });

  test("Should render light flashcard number backgroundColor when theme is dark", () => {
    const { getByText } = render(
      <FrontCardHeader languageName='javascript' />,
      {
        preloadedState: {
          flashcard: {
            flashcardsData: null,
            flashcardNumber: 0,
            activeCardSide: "front",
          },
          theme: { mode: "dark" },
        },
      }
    );
    expect(getByText("Card: 1").props.style[1].backgroundColor).toEqual(
      "rgba(38,38,38,1)"
    );
  });
  test("Should render dark flashcard number backgroundColor when theme is light", () => {
    const { getByText } = render(
      <FrontCardHeader languageName='javascript' />,
      {
        preloadedState: {
          flashcard: {
            flashcardsData: null,
            flashcardNumber: 0,
            activeCardSide: "front",
          },
          theme: { mode: "light" },
        },
      }
    );
    expect(getByText("Card: 1").props.style[1].backgroundColor).toEqual(
      "rgba(233,233,233,1)"
    );
  });

  test("Should render with capitalized languageName letters", () => {
    const { getByText } = render(<FrontCardHeader languageName='javascript' />);
    const textRegex = /JavaScript/i;
    expect(getByText(textRegex)).toBeTruthy();
  });
});
