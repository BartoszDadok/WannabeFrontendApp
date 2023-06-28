import { render, fireEvent, waitFor } from "../../../utils/test-utils";
import BackCardNavigationButtons from "../../../components/molecules/BackCardNavigationButtons";

beforeEach(() => {
  jest.resetAllMocks();
});

const mockedDispatch = jest.fn();
jest.mock("../../../store/hooks", () => {
  const actualHooks = jest.requireActual("../../../store/hooks");
  return {
    ...actualHooks,
    useAppDispatch: () => mockedDispatch,
  };
});

describe("Backcard Navigation Buttons", () => {
  test("Should render navigation buttons", () => {
    const { getByText } = render(<BackCardNavigationButtons />);
    expect(getByText("Back")).toBeTruthy();
    expect(getByText("Next question")).toBeTruthy();
  });

  test("Should navigate to the front card side after a click back button", async () => {
    const { getByText } = render(<BackCardNavigationButtons />);
    const button = getByText("Back");
    fireEvent(button, "press");
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith({
        payload: "front",
        type: "flashCard/setActiveCardSide",
      });
    });
  });

  test("Should navigate to the front card side after a click next question button", async () => {
    const { getByText } = render(<BackCardNavigationButtons />);
    const button = getByText("Next question");
    fireEvent(button, "press");
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith({
        payload: "front",
        type: "flashCard/setActiveCardSide",
      });
    });
  });
  test("Should show next question card after a click next question button", async () => {
    const { getByText } = render(<BackCardNavigationButtons />);
    const button = getByText("Next question");
    fireEvent(button, "press");
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith({
        payload: "next",
        type: "flashCard/swapCard",
      });
    });
  });
});
