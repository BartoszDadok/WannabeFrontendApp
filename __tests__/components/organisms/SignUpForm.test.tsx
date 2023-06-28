import SignupForm from "../../../components/organims/SignupForm";
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

describe("SignUp form", () => {
  test("Should render SignUp form", () => {
    const { getByTestId } = render(<SignupForm />);
    expect(getByTestId("SignUpContainer")).toBeTruthy();
  });

  test("Should show 'veryfication email has been sent' after request success", async () => {
    server.use(
      rest.post("https://wannabe.cyclic.app/create-user", (req, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json({
            email: "test@test.com",
            password: "Adshds1238]]",
            confirmPassword: "Adshds1238]]",
          })
        );
      })
    );

    const { getByTestId, getByText } = render(<SignupForm />);

    const button = getByTestId("SubmitButton");

    fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");
    fireEvent.changeText(getByTestId("passwordInput"), "ABcdf123stTest''.");
    fireEvent.changeText(
      getByTestId("confirmPasswordInput"),
      "ABcdf123stTest''."
    );
    fireEvent(button, "press");
    await waitFor(() => {
      expect(
        getByText(
          /Veryfication email has been sent. Please, go to your mailbox and verify your email./i
        )
      ).toBeTruthy();
    });
  });

  test("Should render loading indicator after click when the request is pending", async () => {
    server.use(
      rest.post("https://wannabe.cyclic.app/create-user", (req, res, ctx) => {
        return res(ctx.delay(100), ctx.json({}));
      })
    );
    const { getByTestId } = render(<SignupForm />);

    const button = getByTestId("SubmitButton");

    fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");
    fireEvent.changeText(getByTestId("passwordInput"), "ABcdf123stTest''.");
    fireEvent.changeText(
      getByTestId("confirmPasswordInput"),
      "ABcdf123stTest''."
    );
    fireEvent(button, "press");

    await waitFor(() => {
      expect(getByTestId("LoadingIndicator")).toBeTruthy();
    });
    await wait(100);
  });

  test("Should render loading indicator after click when the request is pending", async () => {
    server.use(
      rest.post("https://wannabe.cyclic.app/create-user", (req, res, ctx) => {
        return res(ctx.delay(100), ctx.json({}));
      })
    );
    const { getByTestId } = render(<SignupForm />);

    const button = getByTestId("SubmitButton");

    fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");
    fireEvent.changeText(getByTestId("passwordInput"), "ABcdf123stTest''.");
    fireEvent.changeText(
      getByTestId("confirmPasswordInput"),
      "ABcdf123stTest''."
    );
    fireEvent(button, "press");

    await waitFor(() => {
      expect(getByTestId("LoadingIndicator")).toBeTruthy();
    });
    await wait(100);
  });

  test("Should display a connection error or other error which is not an API response, when the login request fails", async () => {
    server.use(
      rest.post("https://wannabe.cyclic.app/create-user", (_req, res, ctx) => {
        return res(
          //@ts-ignore
          ctx.status("FETCH_ERROR"),
          ctx.json({ err: "Error connection" })
        );
      })
    );
    const { getByTestId, getByText } = render(<SignupForm />);

    const button = getByTestId("SubmitButton");

    fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");
    fireEvent.changeText(getByTestId("passwordInput"), "ABcdf123stTest''.");
    fireEvent.changeText(
      getByTestId("confirmPasswordInput"),
      "ABcdf123stTest''."
    );
    fireEvent(button, "press");

    await waitFor(() => {
      expect(
        getByText("Server error, check your internet connection!")
      ).toBeTruthy();
    });
  });

  test("Should display an API error when the createUser request fails", async () => {
    server.use(
      rest.post("https://wannabe.cyclic.app/create-user", (_req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ errors: ["Error occured"] }));
      })
    );

    const { getByTestId, getByText } = render(<SignupForm />);
    const button = getByTestId("SubmitButton");
    fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");
    fireEvent.changeText(getByTestId("passwordInput"), "ABcdf123stTest''.");
    fireEvent.changeText(
      getByTestId("confirmPasswordInput"),
      "ABcdf123stTest''."
    );
    fireEvent(button, "press");

    await waitFor(() => {
      expect(getByText("Error occured")).toBeTruthy();
    });
  });
});
// Should send request for new verification token after click the link
// Should show text after new verification request is success
// Should show loading indicator when request is pending
// Should show api error when request fails
