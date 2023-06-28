import { render } from "../../../utils/test-utils";
import FormHeader from "../../../components/atoms/FormHeader";

describe("FormHeader", () => {
  test("Should render form header", () => {
    const { getByText } = render(
      <FormHeader
        firstRowHeading='firstRowHeading'
        secondRowHeading='secondRowHeading'
      />
    );
    expect(getByText("firstRowHeading")).toBeTruthy();
    expect(getByText("secondRowHeading")).toBeTruthy();
  });

  test("Should render light text when theme is dark", () => {
    const { getByText } = render(
      <FormHeader
        firstRowHeading='firstRowHeading'
        secondRowHeading='secondRowHeading'
      />,
      {
        preloadedState: {
          theme: { mode: "dark" },
        },
      }
    );

    expect(getByText("firstRowHeading").props.style[1].color).toEqual(
      "rgba(200,200,200,1)"
    );
  });

  test("Should render dark text when theme is light", () => {
    const { getByText } = render(
      <FormHeader
        firstRowHeading='firstRowHeading'
        secondRowHeading='secondRowHeading'
      />,
      {
        preloadedState: {
          theme: { mode: "light" },
        },
      }
    );
    expect(getByText("firstRowHeading").props.style[1].color).toEqual(
      "rgba(0,0,0,1)"
    );
  });
});
