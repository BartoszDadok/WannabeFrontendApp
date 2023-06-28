import LoginForm from "../../../components/organims/LoginForm";
import { render, fireEvent, waitFor, screen } from "../../../utils/test-utils";
import { act } from "react-test-renderer";
import { rest } from "msw";
import { server } from "../../../setupTests";
import { useRoute } from "@react-navigation/core";
jest.mock("@react-navigation/core");

async function wait(ms = 0) {
  await act(async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
}
beforeEach(() => {
  jest.resetAllMocks();
});

const mockedDispatch = jest.fn();
jest.mock("../../../store/hooks", () => {
  const actualHooks = jest.requireActual("../../../store/hooks");
  return {
    ...actualHooks,
    useAppDispatch: () => mockedDispatch,
  };
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
describe("Login Form", () => {
  test("Should render login form", async () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { id: 356 },
    });
    const { getByTestId } = render(<LoginForm />);
    expect(getByTestId("LoginForm")).toBeTruthy();
  });

  test("Should render loading indicator after click when request is pending", async () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { id: 256 },
    });
    server.use(
      rest.post("https://wannabe.cyclic.app/sign-in", (req, res, ctx) => {
        return res(
          ctx.delay(100),
          ctx.json({
            token: "testTest",
            id: "testTest",
            email: "test@test.com",
            languages: "test",
          })
        );
      })
    );
    const { getByTestId } = render(<LoginForm />, {
      preloadedState: {
        theme: { mode: "dark" },
      },
    });
    const button = getByTestId("SubmitButton");

    fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");
    fireEvent.changeText(getByTestId("passwordInput"), "ABcdf123stTest''.");

    fireEvent(button, "press");

    await waitFor(() => {
      expect(getByTestId("LoadingIndicator")).toBeTruthy();
    });
    await wait(200);
  });

  test("Should render dispatch login action after requsest success", async () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { id: 256 },
    });
    server.use(
      rest.post("https://wannabe.cyclic.app/sign-in", (req, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json({
            token: "testTest",
            id: "testTest",
            email: "test@test.com",
            languages: "javascript",
          })
        );
      })
    );
    const { getByTestId } = render(<LoginForm />, {
      preloadedState: {
        theme: { mode: "dark" },
      },
    });
    const button = getByTestId("SubmitButton");

    fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");
    fireEvent.changeText(getByTestId("passwordInput"), "ABcdf123stTest''.");

    fireEvent(button, "press");

    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith({
        payload: {
          email: "test@test.com",
          id: "testTest",
          languages: "javascript",
          token: "testTest",
        },
        type: "DataUser/logIn",
      });
    });
  });

  test("Should navigate to DecksScreen after the requsest success", async () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { id: 256 },
    });
    server.use(
      rest.post("https://wannabe.cyclic.app/sign-in", (req, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json({
            token: "testTest",
            id: "testTest",
            email: "test@test.com",
            languages: "javascript",
          })
        );
      })
    );

    const { getByTestId } = render(<LoginForm />, {
      preloadedState: {
        theme: { mode: "dark" },
      },
    });
    const button = getByTestId("SubmitButton");

    fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");
    fireEvent.changeText(getByTestId("passwordInput"), "ABcdf123stTest''.");

    fireEvent(button, "press");

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("DecksScreen");
    });
  });

  test("Should display a connection error or other error which is not an API response, when the login request fails", async () => {
    server.use(
      rest.post("https://wannabe.cyclic.app/sign-in", (_req, res, ctx) => {
        return res(
          //@ts-ignore
          ctx.status("FETCH_ERROR"),
          ctx.json({ err: "Error connection" })
        );
      })
    );

    const { getByTestId, getByText } = render(<LoginForm />, {
      preloadedState: {
        theme: { mode: "dark" },
      },
    });
    const button = getByTestId("SubmitButton");

    fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");
    fireEvent.changeText(getByTestId("passwordInput"), "ABcdf123stTest''.");

    fireEvent(button, "press");

    await waitFor(() => {
      expect(
        getByText("Server error, check your internet connection!")
      ).toBeTruthy();
    });
  });

  test("Should display an API error when the logIn request fails", async () => {
    server.use(
      rest.post("https://wannabe.cyclic.app/sign-in", (_req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ errors: ["Error occured"] }));
      })
    );

    const { getByTestId, getByText } = render(<LoginForm />, {
      preloadedState: {
        theme: { mode: "dark" },
      },
    });
    const button = getByTestId("SubmitButton");

    fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");
    fireEvent.changeText(getByTestId("passwordInput"), "ABcdf123stTest''.");

    fireEvent(button, "press");

    await waitFor(() => {
      expect(getByText("Error occured")).toBeTruthy();
    });
  });

  test("Should display a statement: 'Email with a reset link has been sent' - after the password reset", async () => {
    server.use(
      rest.post("https://wannabe.cyclic.app/sign-in", (req, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json({
            token: "testTest",
            id: "testTest",
            email: "test@test.com",
            languages: "javascript",
          })
        );
      })
    );
    (useRoute as jest.Mock).mockReturnValue({
      params: { afterResetPassword: true },
    });
    const { getByTestId, getByText } = render(<LoginForm />, {
      preloadedState: {
        theme: { mode: "dark" },
      },
    });
    const button = getByTestId("SubmitButton");

    fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");
    fireEvent.changeText(getByTestId("passwordInput"), "ABcdf123stTest''.");

    fireEvent(button, "press");

    await waitFor(() => {
      expect(getByText(/Email with a reset link has been sent/i)).toBeTruthy();
    });
  });

  test("Should render loading indicator after click when the request is pending", async () => {
    server.use(
      rest.post("https://wannabe.cyclic.app/sign-in", (req, res, ctx) => {
        return res(
          ctx.delay(100),
          ctx.json({
            token: "testTest",
            id: "testTest",
            email: "test@test.com",
            languages: "javascript",
          })
        );
      })
    );
    const { getByTestId } = render(<LoginForm />);
    const button = getByTestId("SubmitButton");

    fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");
    fireEvent.changeText(getByTestId("passwordInput"), "ABcdf123stTest''.");
    fireEvent(button, "press");

    await waitFor(() => {
      expect(getByTestId("LoadingIndicator")).toBeTruthy();
    });
    await wait(100);
  });
});
