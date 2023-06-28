import { render, screen } from "../../../utils/test-utils";
import LockIcon from "../../../components/atoms/LockIcon";

describe("LockIcon", () => {
  test("Should render open lock icon", () => {
    const { getByTestId } = render(<LockIcon lockOpen={true} />);
    expect(getByTestId("lockOpen")).toBeTruthy();
  });

  test("Should render closed lock icon", () => {
    const { getByTestId } = render(<LockIcon lockOpen={false} />);
    expect(getByTestId("lockClosed")).toBeTruthy();
  });
});
