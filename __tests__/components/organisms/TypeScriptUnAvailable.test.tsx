import TypeScriptUnAvailable from "../../../components/organims/TypeScriptUnAvailable";
import { render } from "../../../utils/test-utils";

describe("Typescript unavailable", () => {
  test("Should render TypeScript Unavailable", () => {
    const { getByText } = render(<TypeScriptUnAvailable />);
    expect(
      getByText(/TypeScript questions are not available yet/i)
    ).toBeTruthy();
  });

  test("Should render light text color when mode is dark", () => {
    const { getByText } = render(<TypeScriptUnAvailable />, {
      preloadedState: {
        theme: { mode: "dark" },
      },
    });
    expect(
      getByText(/TypeScript questions are not available yet/i).props.style[1]
        .color
    ).toEqual("rgba(200,200,200,1)");
  });
});
