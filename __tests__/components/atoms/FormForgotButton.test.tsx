import { render, fireEvent, waitFor } from "../../../utils/test-utils";
import FormForgotButton from "../../../components/atoms/FormForgotButton";

beforeEach(() => {
  jest.resetAllMocks();
});

const mockedNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe("FrogotButton", () => {
  test("Should render forgot button", () => {
    const { getByText } = render(<FormForgotButton />);
    expect(getByText("Forgot password?")).toBeTruthy();
  });

  test("Should navigate to ResetPasswordScreen after click ", async () => {
    const { getByTestId } = render(<FormForgotButton />);
    const button = getByTestId("ForgotPassword");

    fireEvent(button, "press");

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
