import ThemePanel from "../../../components/organims/ThemePanel";
import { render, fireEvent, waitFor } from "../../../utils/test-utils";
jest.mock("expo-font");
jest.mock("expo-asset");
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

describe("Theme panel", () => {
  test("Should render SignUp form", () => {
    const { getByTestId } = render(<ThemePanel />);
    expect(getByTestId("ThemePanelContainer")).toBeTruthy();
  });

  test("Should run a dark mode when light dark is clicked", async () => {
    const { getByTestId } = render(<ThemePanel />);
    const button = getByTestId("DarkModeButton");
    fireEvent(button, "press");
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith({
        payload: "dark",
        type: "theme/updateTheme",
      });
    });
  });

  test("Should run a light mode when light button is clicked", async () => {
    const { getByTestId } = render(<ThemePanel />);
    const button = getByTestId("LightModeButton");
    fireEvent(button, "press");
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith({
        payload: "light",
        type: "theme/updateTheme",
      });
    });
  });
});
