import { render, fireEvent, waitFor } from "../../../utils/test-utils";
import FrontCardNavigationButtons from "../../../components/molecules/FrontCardNavigationButtons";
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
    const { getByText } = render(<FrontCardNavigationButtons />);
    expect(getByText("Previous")).toBeTruthy();
    expect(getByText("Check answer")).toBeTruthy();
    expect(getByText("Next")).toBeTruthy();
  });

  test("Should navigate to the previous card after a click previous button", async () => {
    const { getByText } = render(<FrontCardNavigationButtons />);
    const button = getByText("Previous");
    fireEvent(button, "press");
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith({
        payload: "previous",
        type: "flashCard/swapCard",
      });
    });
  });

  test("Should show answer after a click Check answer button", async () => {
    const { getByText } = render(<FrontCardNavigationButtons />);
    const button = getByText("Check answer");
    fireEvent(button, "press");
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith({
        payload: "back",
        type: "flashCard/setActiveCardSide",
      });
    });
  });

  test("Should navigate to the next question after a click next button", async () => {
    const { getByText } = render(<FrontCardNavigationButtons />);
    const button = getByText("Next");
    fireEvent(button, "press");
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith({
        payload: "next",
        type: "flashCard/swapCard",
      });
    });
  });
});
