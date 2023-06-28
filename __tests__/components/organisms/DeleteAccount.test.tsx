import { render } from "../../../utils/test-utils";
import { server } from "../../../setupTests";
import DeleteAccount from "../../../components/organims/DeleteAccount";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { rest } from "msw";
import { act } from "react-test-renderer";

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
async function wait(ms = 0) {
  await act(async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
}
describe("DeleteAccount", () => {
  test("Should display an API error when the deletion request fail", async () => {
    server.use(
      rest.post(
        "https://wannabe.cyclic.app/delete-account",
        (_req, res, ctx) => {
          return res(ctx.status(404), ctx.json({ errors: ["Error occured"] }));
        }
      )
    );

    const { getByTestId, getByText } = render(<DeleteAccount />);
    const button = getByTestId("DeleteAccount");
    fireEvent(button, "press");

    await waitFor(() => {
      expect(getByText("Error occured")).toBeTruthy();
    });
  });

  test("Should display connection or other error which is not an API response, when the deletion request fail", async () => {
    server.use(
      rest.post(
        "https://wannabe.cyclic.app/delete-account",
        (_req, res, ctx) => {
          return res(
            //@ts-ignore
            ctx.status("FETCH_ERROR"),
            ctx.json({ err: "Error connection" })
          );
        }
      )
    );

    const { getByTestId, getByText } = render(<DeleteAccount />);
    const button = getByTestId("DeleteAccount");
    fireEvent(button, "press");

    await waitFor(() => {
      expect(
        getByText("Server error, check your internet connection!")
      ).toBeTruthy();
    });
  });

  test("Should delete account when request is success", async () => {
    server.use(
      rest.post(
        "https://wannabe.cyclic.app/delete-account",
        (_req, res, ctx) => {
          return res(
            ctx.status(201),
            ctx.json({ message: "Account deleted successfully" })
          );
        }
      )
    );

    const { getByTestId } = render(<DeleteAccount />, {
      preloadedState: {
        dataUser: {
          token: "abc",
          isLoggedIn: true,
          id: "abcd",
          email: "abcde",
          languages: "abcdef",
        },
      },
    });

    const button = getByTestId("DeleteAccount");
    fireEvent(button, "press");
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith({
        payload: undefined,
        type: "DataUser/logOut",
      });
    });
  });

  test("Should navigate to Decks Screen after success", async () => {
    server.use(
      rest.post(
        "https://wannabe.cyclic.app/delete-account",
        (_req, res, ctx) => {
          return res(
            ctx.status(201),
            ctx.json({ message: "Account deleted successfully" })
          );
        }
      )
    );

    const { getByTestId } = render(<DeleteAccount />, {
      preloadedState: {
        dataUser: {
          token: "abc",
          isLoggedIn: true,
          id: "abcd",
          email: "abcde",
          languages: "abcdef",
        },
      },
    });

    const button = getByTestId("DeleteAccount");
    fireEvent(button, "press");
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledTimes(1);
    });
  });

  test("Should render loading indicator after click when the request is pending", async () => {
    server.use(
      rest.post(
        "https://wannabe.cyclic.app/delete-account",
        (req, res, ctx) => {
          return res(ctx.delay(100), ctx.json({}));
        }
      )
    );
    const { getByTestId } = render(<DeleteAccount />);
    const button = getByTestId("DeleteAccount");
    fireEvent(button, "press");

    await waitFor(() => {
      expect(getByTestId("LoadingIndicator")).toBeTruthy();
    });
    await wait(100);
  });
});
