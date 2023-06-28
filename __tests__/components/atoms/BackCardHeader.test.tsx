import { render } from "../../../utils/test-utils";
import BackCardHeader from "../../../components/atoms/BackCardHeader";

describe("BackCardHeader", () => {
  test("Should render card question", () => {
    const card = {
      html: "<h1>What is the difference between <strong>setTimeout()</strong> and <strong>setInterval()</strong>?</h1>",
    };
    const { getByText } = render(<BackCardHeader frontCard={card} />);
    expect(getByText("What is the difference between")).toBeTruthy();
  });

  test("Should render card number", () => {
    const card = {
      html: "<h1>What is the difference between <strong>setTimeout()</strong> and <strong>setInterval()</strong>?</h1>",
    };

    const { getByText } = render(<BackCardHeader frontCard={card} />, {
      preloadedState: {
        flashcard: {
          flashcardsData: null,
          flashcardNumber: 0,
          activeCardSide: "front",
        },
      },
    });

    expect(getByText("Card: 1")).toBeTruthy();
  });

  test("Should render light text when theme is dark", () => {
    const card = {
      html: "<h1>What is the difference between <strong>setTimeout()</strong> and <strong>setInterval()</strong>?</h1>",
    };
    const { getByText } = render(<BackCardHeader frontCard={card} />, {
      preloadedState: {
        theme: { mode: "dark" },
      },
    });
    const foundedElement = getByText("What is the difference between");
    expect(foundedElement.props.style[0].color).toEqual("rgba(200,200,200,1)");
  });

  test("Should render dark text when theme is light", () => {
    const card = {
      html: "<h1>What is the difference between <strong>setTimeout()</strong> and <strong>setInterval()</strong>?</h1>",
    };
    const { getByText } = render(<BackCardHeader frontCard={card} />, {
      preloadedState: {
        theme: { mode: "light" },
      },
    });
    const foundedElement = getByText("What is the difference between");
    expect(foundedElement.props.style[0].color).toEqual("rgba(0,0,0,1)");
  });
});
