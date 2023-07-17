import { render } from "../../../utils/test-utils";
import WaitingForStripe from "../../../components/molecules/WaitingForStripeForm";

describe("WaitingForStripe", () => {
  test("Should render waiting for Stripe component", () => {
    const { getByText } = render(<WaitingForStripe />);
    expect(getByText("Loading payment form...")).toBeTruthy();
  });

  test("Should container has background color dark when theme is dark", () => {
    const { getByTestId } = render(<WaitingForStripe />, {
      preloadedState: {
        theme: { mode: "dark" },
      },
    });
    expect(
      getByTestId("WaitingForStripeContainer").props.style[1].backgroundColor
    ).toEqual("rgba(18,18,18,1)");
  });

  test("Should container has background color light when theme is light", () => {
    const { getByTestId } = render(<WaitingForStripe />, {
      preloadedState: {
        theme: { mode: "light" },
      },
    });
    expect(
      getByTestId("WaitingForStripeContainer").props.style[1].backgroundColor
    ).toEqual("rgba(255,255,255, 1)");
  });
});
