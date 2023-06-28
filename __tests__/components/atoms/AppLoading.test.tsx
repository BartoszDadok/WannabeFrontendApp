import AppLoading from "../../../components/atoms/AppLoading";
import { render } from "@testing-library/react-native";

describe("AppLoading", () => {
  test("Renders loading... text", () => {
    const { getByText } = render(<AppLoading theme='dark' />);
    expect(getByText("Loading...")).toBeTruthy();
  });

  test("Text color should be dark when theme is light", () => {
    const { getByText } = render(<AppLoading theme='light' />);
    const foundedElement = getByText("Loading...");
    expect(foundedElement.props.style[1].color).toEqual("rgba(0,0,0,1)");
  });

  test("Text color should be light when theme is black", () => {
    const { getByText } = render(<AppLoading theme='dark' />);
    const foundedElement = getByText("Loading...");
    expect(foundedElement.props.style[1].color).toEqual("rgba(200,200,200,1)");
  });
});
