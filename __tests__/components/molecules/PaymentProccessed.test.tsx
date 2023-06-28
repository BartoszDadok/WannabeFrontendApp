import { render } from "../../../utils/test-utils";
import PaymentProcessed from "../../../components/molecules/PaymentProcessed";

describe("PaymentProcessed", () => {
  test("Should render payment proccessed component", () => {
    const { getByText } = render(<PaymentProcessed />);
    expect(
      getByText("Your payment is being processed... It can take a few seconds.")
    ).toBeTruthy();
  });
});
