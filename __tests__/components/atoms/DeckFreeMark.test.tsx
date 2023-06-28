import { render } from "../../../utils/test-utils";
import DeckFreeMark from "../../../components/atoms/DeckFreeMark";

describe("DeckFreeMark", () => {
  test("Should render free mark", () => {
    const { getByText } = render(<DeckFreeMark />);
    expect(getByText("Free")).toBeTruthy();
  });
});
