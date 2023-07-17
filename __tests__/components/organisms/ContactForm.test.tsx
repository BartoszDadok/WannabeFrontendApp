import { rest } from "msw";
import { server } from "../../../setupTests";
import { render, fireEvent, waitFor } from "../../../utils/test-utils";
import ContactForm from "../../../components/organims/ContactForm";
import { act } from "react-test-renderer";

jest.mock("@react-navigation/elements", () => {
  const actual = jest.requireActual("@react-navigation/elements");
  return {
    ...actual,
    useHeaderHeight: jest.fn(),
  };
});
async function wait(ms = 0) {
  await act(async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
}
describe("Contact Form", () => {
  test("Should render loading indicator after click when request is pending", async () => {
    server.use(
      rest.post("https://wannabe.cyclic.app/contact", (req, res, ctx) => {
        return res(ctx.delay(100), ctx.json({}));
      })
    );
    const { getByText, getByTestId } = render(<ContactForm />, {
      preloadedState: {
        theme: { mode: "dark" },
      },
    });
    const button = getByText("Send message");

    fireEvent.changeText(getByTestId("nameInput"), "TestName");
    fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");
    fireEvent.changeText(getByTestId("messageInput"), "hello world test");
    fireEvent(button, "press");

    await waitFor(() => {
      expect(getByTestId("LoadingIndicator")).toBeTruthy();
    });
    await wait(100);
  });
});

test("Should display an API error when the deletion request fail", async () => {
  server.use(
    rest.post("https://wannabe.cyclic.app/contact", (_req, res, ctx) => {
      return res(ctx.status(404), ctx.json({ errors: ["Error occured"] }));
    })
  );

  const { getByText, getByTestId } = render(<ContactForm />);
  const button = getByText("Send message");

  fireEvent.changeText(getByTestId("nameInput"), "TestName");
  fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");
  fireEvent.changeText(getByTestId("messageInput"), "hello world test");
  fireEvent(button, "press");

  await waitFor(() => {
    expect(getByText("Error occured")).toBeTruthy();
  });
});

test("Should display connection or other error which is not an API response, when the deletion request fail", async () => {
  server.use(
    rest.post("https://wannabe.cyclic.app/contact", (_req, res, ctx) => {
      return res(
        //@ts-ignore
        ctx.status("FETCH_ERROR"),
        ctx.json({ err: "Error connection" })
      );
    })
  );

  const { getByTestId, getByText } = render(<ContactForm />);

  const button = getByText("Send message");

  fireEvent.changeText(getByTestId("nameInput"), "TestName");
  fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");
  fireEvent.changeText(getByTestId("messageInput"), "hello world test");
  fireEvent(button, "press");

  await waitFor(() => {
    expect(
      getByText("Server error, check your internet connection!")
    ).toBeTruthy();
  });
});

test("Should send an email when request is success", async () => {
  server.use(
    rest.post("https://wannabe.cyclic.app/contact", (_req, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json({ message: "Email sent successfully" })
      );
    })
  );

  const { getByTestId, getByText } = render(<ContactForm />);

  const button = getByText("Send message");

  fireEvent.changeText(getByTestId("nameInput"), "TestName");
  fireEvent.changeText(getByTestId("emailInput"), "abcde@gmail.com");
  fireEvent.changeText(getByTestId("messageInput"), "hello world test");
  fireEvent(button, "press");

  await waitFor(() => {
    expect(getByText("Email sent successfully")).toBeTruthy();
  });
});

test("Should render text color light when theme is dark", async () => {
  const { getByText } = render(<ContactForm />, {
    preloadedState: {
      theme: { mode: "dark" },
    },
  });

  expect(
    getByText(/You can contact directly via email/i).props.style[1].color
  ).toEqual("rgba(200,200,200,1)");
});
