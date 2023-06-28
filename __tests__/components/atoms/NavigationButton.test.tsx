import { render, fireEvent, waitFor } from "../../../utils/test-utils";
import NavigationButton from "../../../components/atoms/NavigationButton";

describe("NavigationButton", () => {
  test("Should render navigation button", () => {
    const { getByText } = render(
      <NavigationButton handler={() => {}} title='Test' width={150} />
    );
    expect(getByText("Test")).toBeTruthy();
  });

  test("Should execute action after click", async () => {
    const pressButtonFunc = jest.fn();
    const { getByTestId } = render(
      <NavigationButton handler={pressButtonFunc} title='Test' width={150} />
    );
    const button = getByTestId("NavigationButton");
    fireEvent(button, "press");
    await waitFor(() => {
      expect(pressButtonFunc).toBeCalledTimes(1);
    });
  });
  test("Should render backgroundColor light when theme is black", async () => {
    const pressButtonFunc = jest.fn();
    const { getByTestId } = render(
      <NavigationButton handler={pressButtonFunc} title='Test' width={150} />,
      {
        preloadedState: {
          theme: { mode: "dark" },
        },
      }
    );
    const button = getByTestId("NavigationButton");
    expect(button.props.style[1].backgroundColor).toEqual("rgba(71,71,71,1)");
  });
  test("Should render backgroundColor dark when theme is light", async () => {
    const pressButtonFunc = jest.fn();
    const { getByTestId } = render(
      <NavigationButton handler={pressButtonFunc} title='Test' width={150} />,
      {
        preloadedState: {
          theme: { mode: "light" },
        },
      }
    );
    const button = getByTestId("NavigationButton");
    expect(button.props.style[1].backgroundColor).toEqual("rgba(255,228,0,1)");
  });
});
