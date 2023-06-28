import ResetPasswordForm from "../../../components/organims/ResetPasswordForm";
import { render, fireEvent, waitFor } from "../../../utils/test-utils";
import { act } from "react-test-renderer";
import { rest } from "msw";
import { server } from "../../../setupTests";
async function wait(ms = 0) {
  await act(async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
}
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

describe("Reset password form", () => {
  test("Should render rest password form", () => {
    const { getAllByText } = render(<ResetPasswordForm />);
    expect(getAllByText("Reset password")[0]).toBeTruthy();
  });

  test("Should display an API error when the logIn request fails", async () => {
    server.use(
      rest.post(
        "https://wannabe.cyclic.app/reset-password",
        (_req, res, ctx) => {
          return res(ctx.status(404), ctx.json({ errors: ["Error occured"] }));
        }
      )
    );

    const { getByTestId, getByText } = render(<ResetPasswordForm />);
    const button = getByTestId("SubmitButton");

    fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");

    fireEvent(button, "press");

    await waitFor(() => {
      expect(getByText("Error occured")).toBeTruthy();
    });
  });

  test("Should display a connection error or other error which is not an API response, when the login request fails", async () => {
    server.use(
      rest.post(
        "https://wannabe.cyclic.app/reset-password",
        (_req, res, ctx) => {
          return res(
            //@ts-ignore
            ctx.status("FETCH_ERROR"),
            ctx.json({ err: "Error connection" })
          );
        }
      )
    );

    const { getByTestId, getByText } = render(<ResetPasswordForm />);
    const button = getByTestId("SubmitButton");

    fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");

    fireEvent(button, "press");

    await waitFor(() => {
      expect(
        getByText("Server error, check your internet connection!")
      ).toBeTruthy();
    });
  });

  test("Should navigate to LoginScreen with afterRestPassword flag after the requsest success", async () => {
    server.use(
      rest.post(
        "https://wannabe.cyclic.app/reset-password",
        (req, res, ctx) => {
          return res(
            ctx.status(201),
            ctx.json({
              email: "test@test.com",
            })
          );
        }
      )
    );

    const { getByTestId } = render(<ResetPasswordForm />);
    const button = getByTestId("SubmitButton");

    fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");

    fireEvent(button, "press");

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("LoginScreen", {
        afterResetPassword: true,
      });
    });
  });

  test("Should render loading indicator after click when the request is pending", async () => {
    server.use(
      rest.post(
        "https://wannabe.cyclic.app/reset-password",
        (req, res, ctx) => {
          return res(ctx.delay(100), ctx.json({}));
        }
      )
    );
    const { getByTestId } = render(<ResetPasswordForm />);
    const button = getByTestId("SubmitButton");

    fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");
    fireEvent(button, "press");

    await waitFor(() => {
      expect(getByTestId("LoadingIndicator")).toBeTruthy();
    });
    await wait(100);
  });
});
