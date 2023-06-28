import { render, screen } from "../../../utils/test-utils";
import DeckTab from "../../../components/organims/DeckTab";

describe("DeckTab", () => {
  test("Should render deck tab", () => {
    const { getByText } = render(
      <DeckTab
        language='React'
        amountOfCards={40}
        onPress={() => {}}
        isfreeLanguage={true}
      />
    );
    expect(getByText("React")).toBeTruthy();
  });

  test("Should render opened lock when paid langauge is unblock", () => {
    const { getByTestId } = render(
      <DeckTab
        language='React'
        amountOfCards={40}
        onPress={() => {}}
        isfreeLanguage={false}
      />,
      {
        preloadedState: {
          dataUser: {
            languages: "react",
            isLoggedIn: true,
            id: "testID",
            email: "test@test.com",
            token: "tokenID",
          },
        },
      }
    );
    expect(getByTestId("lockOpen")).toBeTruthy();
  });

  test("Should render closed lock when paid langauge is not available", () => {
    const { getByTestId } = render(
      <DeckTab
        language='React'
        amountOfCards={40}
        onPress={() => {}}
        isfreeLanguage={false}
      />,
      {
        preloadedState: {
          dataUser: {
            languages: "javascript",
            isLoggedIn: true,
            id: "testID",
            email: "test@test.com",
            token: "tokenID",
          },
        },
      }
    );
    expect(getByTestId("lockClosed")).toBeTruthy();
  });

  test("Should render open lock when langauge is free", () => {
    const { getByTestId } = render(
      <DeckTab
        language='JavaScript'
        amountOfCards={40}
        onPress={() => {}}
        isfreeLanguage={true}
      />,
      {
        preloadedState: {
          dataUser: {
            languages: "javascript",
            isLoggedIn: false,
            id: "testID",
            email: "test@test.com",
            token: "tokenID",
          },
        },
      }
    );
    expect(getByTestId("lockOpen")).toBeTruthy();
  });

  test("Should render tab backgroundColor rgba(255,228,0,0.7) when paid language is active and theme is light", () => {
    const { getByTestId } = render(
      <DeckTab
        language='React'
        amountOfCards={40}
        onPress={() => {}}
        isfreeLanguage={false}
      />,
      {
        preloadedState: {
          dataUser: {
            languages: "react",
            isLoggedIn: true,
            id: "testID",
            email: "test@test.com",
            token: "tokenID",
          },
          theme: {
            mode: "light",
          },
        },
      }
    );
    expect(getByTestId("Container").props.style[1].backgroundColor).toEqual(
      "rgba(255,228,0,0.7)"
    );
  });

  test("Should render tab backgroundColor rgba(223,223,223,1) when paid language is active and the theme is dark", () => {
    const { getByTestId } = render(
      <DeckTab
        language='React'
        amountOfCards={40}
        onPress={() => {}}
        isfreeLanguage={false}
      />,
      {
        preloadedState: {
          dataUser: {
            languages: "react",
            isLoggedIn: true,
            id: "testID",
            email: "test@test.com",
            token: "tokenID",
          },
          theme: {
            mode: "dark",
          },
        },
      }
    );
    expect(getByTestId("Container").props.style[1].backgroundColor).toEqual(
      "rgba(223,223,223,1)"
    );
  });

  test("Should render tab backgroundColor rgba(223,223,223,0.5) when paid language is inactive and the theme is dark", () => {
    const { getByTestId } = render(
      <DeckTab
        language='React'
        amountOfCards={40}
        onPress={() => {}}
        isfreeLanguage={false}
      />,
      {
        preloadedState: {
          dataUser: {
            languages: "",
            isLoggedIn: true,
            id: "testID",
            email: "test@test.com",
            token: "tokenID",
          },
          theme: {
            mode: "dark",
          },
        },
      }
    );
    expect(getByTestId("Container").props.style[1].backgroundColor).toEqual(
      "rgba(223,223,223,0.5)"
    );
  });
  test("Should render tab backgroundColor rgba(223,223,223,0.5) when language is paid, when user is not logged in and the theme is dark", () => {
    const { getByTestId } = render(
      <DeckTab
        language='React'
        amountOfCards={40}
        onPress={() => {}}
        isfreeLanguage={false}
      />,
      {
        preloadedState: {
          dataUser: {
            languages: "",
            isLoggedIn: false,
            id: "testID",
            email: "test@test.com",
            token: "tokenID",
          },
          theme: {
            mode: "dark",
          },
        },
      }
    );
    expect(getByTestId("Container").props.style[1].backgroundColor).toEqual(
      "rgba(223,223,223,0.5)"
    );
  });

  test("Should render amount of cards", () => {
    const { getByText } = render(
      <DeckTab
        language='React'
        amountOfCards={40}
        onPress={() => {}}
        isfreeLanguage={false}
      />
    );
    expect(getByText(/40/i)).toBeTruthy();
  });
  test("Should render language name", () => {
    const { getByText } = render(
      <DeckTab
        language='React'
        amountOfCards={40}
        onPress={() => {}}
        isfreeLanguage={false}
      />
    );
    expect(getByText(/React/i)).toBeTruthy();
  });
});
