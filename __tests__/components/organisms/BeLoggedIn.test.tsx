import { render, fireEvent, waitFor, screen } from "../../../utils/test-utils";
import BeLoggedIn from "../../../components/organims/BeLoggedIn";

beforeEach(() => {
  jest.resetAllMocks();
});

const mockedNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe("BeLoggedIn", () => {
  test("Should render BeLoggedIn component", () => {
    const { getByText } = render(<BeLoggedIn languageName='react' />);
    expect(getByText("5$ - lifetime access")).toBeTruthy();
    expect(
      getByText(/flashcards first you have to be logged in/i)
    ).toBeTruthy();
  });

  test("Should naviagte to LoginScreen after click LogIn button", async () => {
    const { getByText } = render(<BeLoggedIn languageName='react' />);
    const button = getByText("Log in");
    fireEvent(button, "press");

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith("LoginScreen", {
        afterSignup: false,
      });
    });
  });

  test("Should be languageName capitalized", () => {
    const { getByText } = render(<BeLoggedIn languageName='typescript' />);
    expect(getByText(/TypeScript interview questions/i)).toBeTruthy();
  });

  test("Should render logo of technology", () => {
    const { getByTestId } = render(<BeLoggedIn languageName='typescript' />);
    expect(getByTestId("Image").type).toEqual("Image");
  });
});
