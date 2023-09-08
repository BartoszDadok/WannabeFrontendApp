import "whatwg-fetch";
import { rest } from "msw";
import { fetch, Headers, Request, Response } from "cross-fetch";
require("@shopify/flash-list/jestSetup");
import { setupServer } from "msw/node";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// include this line for mocking react-native-gesture-handler
import "react-native-gesture-handler/jestSetup";

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

globalThis.fetch = fetch;
globalThis.Headers = Headers;
globalThis.Request = Request;
globalThis.Response = Response;

export const handlers = [
  rest.post("https://wannabe.cyclic.app/*", (_req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.get("https://wannabe.cyclic.app/*", (_req, res, ctx) => {
    return res(ctx.json({}));
  }),
];

export const server = setupServer(...handlers);

// Enable the API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable the API mocking after the tests finished.
afterAll(() => server.close());
