import { render, fireEvent, waitFor } from "../../../utils/test-utils";
import FormSubmitButton from "../../../components/atoms/FormSubmitButton";
beforeEach(() => {
  jest.resetAllMocks();
});

describe("Form Submit Button", () => {
  test("Should render form submit button", () => {
    const { getByText } = render(
      <FormSubmitButton title='Test Title' submitting={false} />
    );
    expect(getByText("Test Title")).toBeTruthy();
  });

  test("Should render submit button with backgroundColor rgba(255,228,0,0.2) when submitting", async () => {
    const press = () => {};
    const { getByTestId } = render(
      <FormSubmitButton
        pressFunc={press}
        title='Test Title'
        submitting={true}
      />
    );
    const button = getByTestId("SubmitButton");
    fireEvent(button, "press");

    await waitFor(() => {
      expect(button.props.style.backgroundColor).toEqual("rgba(255,228,0,0.2)");
    });
  });

  test("Should be inactive button press function when submiting flag is on.", async () => {
    const pressButton = jest.fn();
    const { getByTestId } = render(
      <FormSubmitButton
        pressFunc={pressButton}
        title='Test Title'
        submitting={true}
      />
    );
    const button = getByTestId("SubmitButton");
    fireEvent(button, "press");
    await waitFor(() => {
      expect(pressButton).toBeCalledTimes(0);
    });
  });
  test("Should be active button press function when submiting flag is off.", async () => {
    const pressButton = jest.fn();
    const { getByTestId } = render(
      <FormSubmitButton
        pressFunc={pressButton}
        title='Test Title'
        submitting={false}
      />
    );
    const button = getByTestId("SubmitButton");
    fireEvent(button, "press");
    await waitFor(() => {
      expect(pressButton).toBeCalledTimes(1);
    });
  });
});
