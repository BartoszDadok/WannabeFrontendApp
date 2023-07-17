import StripePaymentCardForm from "../../../components/organims/StripePaymentCardForm";
import { render, fireEvent, waitFor, screen } from "../../../utils/test-utils";
import { useRoute } from "@react-navigation/core";
import { act } from "react-test-renderer";
import { rest } from "msw";
import { server } from "../../../setupTests";
import { useStripe } from "@stripe/stripe-react-native";

async function wait(ms = 0) {
  await act(async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
}
jest.mock("@react-navigation/core");
beforeEach(() => {
  jest.resetAllMocks();
});

jest.mock("@stripe/stripe-react-native", () => ({
  useStripe: jest.fn(),
}));
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

describe("Stripe Payment Card", () => {
  test("Should render Stripe Payment component", () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { languageName: "react" },
    });
    const { getByTestId } = render(<StripePaymentCardForm />);
    expect(getByTestId("StripePaymentCardContainer")).toBeTruthy();
  });

  test("Should render a WaitingForStripe component when stripe form is loading", async () => {
    server.use(
      rest.post(
        "https://wannabe.cyclic.app/stripe-react-payment",
        (req, res, ctx) => {
          return res(ctx.delay(100), ctx.json({}));
        }
      )
    );
    (useStripe as jest.Mock).mockImplementation(() => {
      return {
        initPaymentSheet: jest.fn(async () => ({
          paymentOption: {},
          error: null,
        })),
        presentPaymentSheet: jest.fn(async () => ({
          paymentOption: {},
          error: null,
        })),
      };
    });
    (useRoute as jest.Mock).mockReturnValue({
      params: { languageName: "react" },
    });
    const { getByTestId } = render(<StripePaymentCardForm />, {
      preloadedState: {
        dataUser: {
          token: "test",
          id: "123",
          email: "testtest@gmail.dom",
          isLoggedIn: true,
          languages: "",
        },
      },
    });

    const stripeButton = getByTestId("StripeButton");
    fireEvent(stripeButton, "press");
    await waitFor(() => {
      expect(getByTestId("WaitingForStripeContainer")).toBeTruthy();
    });
    await wait(100);
  });
  test("Should render a PaymentProccessed component when stripe payment is loading", async () => {
    server.use(
      rest.post(
        "https://wannabe.cyclic.app/stripe-react-payment",
        (req, res, ctx) => {
          return res(ctx.status(201), ctx.json({ clientSecret: "dsadsa" }));
        }
      )
    );
    server.use(
      rest.get("https://wannabe.cyclic.app/allLanguages", (req, res, ctx) => {
        return res(ctx.delay(400), ctx.json({ languages: ["react"] }));
      })
    );
    (useStripe as jest.Mock).mockImplementation(() => {
      return {
        initPaymentSheet: jest.fn(async () => ({
          paymentOption: {},
          error: null,
        })),
        presentPaymentSheet: jest.fn(async () => ({
          paymentOption: {},
          error: null,
        })),
      };
    });
    (useRoute as jest.Mock).mockReturnValue({
      params: { languageName: "react" },
    });
    const { getByTestId, getByText } = render(<StripePaymentCardForm />, {
      preloadedState: {
        dataUser: {
          token: "test",
          id: "123",
          email: "testtest@gmail.dom",
          isLoggedIn: true,
          languages: "",
        },
      },
    });

    const stripeButton = getByTestId("StripeButton");
    fireEvent(stripeButton, "press");

    await waitFor(() => {
      expect(getByText(/Your payment is being processed/i)).toBeTruthy();
    });
    await wait(9000);
  });
  test("Should render an error `Payment failed` when stipePayment request failed ", async () => {
    server.use(
      rest.post(
        "https://wannabe.cyclic.app/stripe-react-payment",
        (req, res, ctx) => {
          return res(
            ctx.status(404),
            ctx.json({ errors: ["Stripe Payment data error occured"] })
          );
        }
      )
    );

    (useRoute as jest.Mock).mockReturnValue({
      params: { languageName: "react" },
    });

    (useStripe as jest.Mock).mockImplementation(() => {
      return {
        initPaymentSheet: jest.fn(async () => ({
          paymentOption: {},
          error: null,
        })),
        presentPaymentSheet: jest.fn(async () => ({
          paymentOption: {},
          error: null,
        })),
      };
    });

    const { getByTestId, getByText } = render(<StripePaymentCardForm />, {
      preloadedState: {
        dataUser: {
          token: "test",
          id: "123",
          email: "testtest@gmail.dom",
          isLoggedIn: true,
          languages: "",
        },
      },
    });

    const stripeButton = getByTestId("StripeButton");
    fireEvent(stripeButton, "press");

    await waitFor(() => {
      expect(getByText(/Stripe Payment data error occured/i)).toBeTruthy();
    });
  });
  test("Should render an alert error message when initStripeSheet is failed ", async () => {
    server.use(
      rest.post(
        "https://wannabe.cyclic.app/stripe-react-payment",
        (req, res, ctx) => {
          return res(ctx.status(201), ctx.json({ clientSecret: "dsadsa" }));
        }
      )
    );
    (useRoute as jest.Mock).mockReturnValue({
      params: { languageName: "react" },
    });

    (useStripe as jest.Mock).mockImplementation(() => {
      return {
        initPaymentSheet: jest.fn(async () => ({
          paymentOption: null,
          error: { error: "error" },
        })),
        presentPaymentSheet: jest.fn(async () => ({
          paymentOption: {},
          error: null,
        })),
      };
    });
    const { getByTestId, getByText } = render(<StripePaymentCardForm />, {
      preloadedState: {
        dataUser: {
          token: "fsad",
          id: "12",
          email: "testrexst@gmail.dom",
          isLoggedIn: true,
          languages: "",
        },
      },
    });

    const stripeButton = getByTestId("StripeButton");
    fireEvent(stripeButton, "press");

    await waitFor(() => {
      expect(getByText(/Initiation stripe sheet error occured./i)).toBeTruthy();
    });
  });
  test("Should render an alert error message when presentPaymentSheet is failed ", async () => {
    server.use(
      rest.post(
        "https://wannabe.cyclic.app/stripe-react-payment",
        (req, res, ctx) => {
          return res(ctx.status(201), ctx.json({ clientSecret: "dsadsa" }));
        }
      )
    );
    (useRoute as jest.Mock).mockReturnValue({
      params: { languageName: "react" },
    });

    (useStripe as jest.Mock).mockImplementation(() => {
      return {
        initPaymentSheet: jest.fn(async () => ({
          paymentOption: { test: "Test" },
          error: null,
        })),
        presentPaymentSheet: jest.fn(async () => ({
          paymentOption: {},
          error: { error: "error" },
        })),
      };
    });
    const { getByTestId, getByText } = render(<StripePaymentCardForm />, {
      preloadedState: {
        dataUser: {
          token: "test",
          id: "123",
          email: "testtest@gmail.dom",
          isLoggedIn: true,
          languages: "",
        },
      },
    });

    const stripeButton = getByTestId("StripeButton");
    fireEvent(stripeButton, "press");

    await waitFor(() => {
      expect(
        getByText(/Presentation stripe sheet error occured/i)
      ).toBeTruthy();
    });
  });

  test("Should dispatch 'add language' action when payment is succeeded", async () => {
    server.use(
      rest.post(
        "https://wannabe.cyclic.app/stripe-react-payment",
        (req, res, ctx) => {
          return res(ctx.status(201), ctx.json({ clientSecret: "dsadsa" }));
        }
      )
    );
    server.use(
      rest.get("https://wannabe.cyclic.app/allLanguages", (req, res, ctx) => {
        return res(ctx.delay(201), ctx.json({ languages: ["react"] }));
      })
    );
    (useRoute as jest.Mock).mockReturnValue({
      params: { languageName: "react" },
    });

    (useStripe as jest.Mock).mockImplementation(() => {
      return {
        initPaymentSheet: jest.fn(async () => ({
          paymentOption: { test: "Test" },
          error: null,
        })),
        presentPaymentSheet: jest.fn(async () => ({
          paymentOption: { test: "Test" },
          error: null,
        })),
      };
    });
    const { getByTestId } = render(<StripePaymentCardForm />, {
      preloadedState: {
        dataUser: {
          token: "test",
          id: "123",
          email: "testtest@gmail.dom",
          isLoggedIn: true,
          languages: "",
        },
      },
    });

    const stripeButton = getByTestId("StripeButton");
    fireEvent(stripeButton, "press");
    await wait(8000);
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith({
        payload: "react",
        type: "DataUser/addLanguage",
      });
    });
  });

  test("Should naigate to DeckScreen after payment is succeeded", async () => {
    server.use(
      rest.post(
        "https://wannabe.cyclic.app/stripe-react-payment",
        (req, res, ctx) => {
          return res(ctx.status(201), ctx.json({ clientSecret: "dsadsa" }));
        }
      )
    );
    server.use(
      rest.get("https://wannabe.cyclic.app/allLanguages", (req, res, ctx) => {
        return res(ctx.delay(201), ctx.json({ languages: ["react"] }));
      })
    );
    (useRoute as jest.Mock).mockReturnValue({
      params: { languageName: "react" },
    });

    (useStripe as jest.Mock).mockImplementation(() => {
      return {
        initPaymentSheet: jest.fn(async () => ({
          paymentOption: { test: "Test" },
          error: null,
        })),
        presentPaymentSheet: jest.fn(async () => ({
          paymentOption: { test: "Test" },
          error: null,
        })),
      };
    });
    const { getByTestId } = render(<StripePaymentCardForm />, {
      preloadedState: {
        dataUser: {
          token: "test",
          id: "123",
          email: "testtest@gmail.dom",
          isLoggedIn: true,
          languages: "",
        },
      },
    });

    const stripeButton = getByTestId("StripeButton");
    fireEvent(stripeButton, "press");
    await wait(8000);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("DecksScreen");
    });
  });
});
