import { render } from "../../../utils/test-utils";
import ErrorInternetConnection from "../../../components/atoms/ErrorInternetConnection";

describe("ErrorInternetConnection", () => {
  test("Should render Error Internet Connection", () => {
    const { getByText } = render(<ErrorInternetConnection />);
    expect(
      getByText("Something went wrong, check your internet connection.")
    ).toBeTruthy();
  });

  test("Should container has background color dark when theme is dark", () => {
    const { getByTestId } = render(<ErrorInternetConnection />, {
      preloadedState: {
        theme: { mode: "dark" },
      },
    });
    expect(getByTestId("Container").props.style[1].backgroundColor).toEqual(
      "rgba(18,18,18,1)"
    );
  });

  test("Should container has background color light when theme is light", () => {
    const { getByTestId } = render(<ErrorInternetConnection />, {
      preloadedState: {
        theme: { mode: "light" },
      },
    });
    expect(getByTestId("Container").props.style[1].backgroundColor).toEqual(
      "rgba(255,255,255, 1)"
    );
  });
});
