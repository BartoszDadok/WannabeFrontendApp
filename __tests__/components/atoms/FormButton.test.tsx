import { render, screen } from "../../../utils/test-utils";
import FormButton from "../../../components/atoms/FormButton";

describe("Form Button", () => {
  test("Should render form button", () => {
    const { getByText } = render(
      <FormButton title='Test' onPress={undefined} backgroundColor={"black"} />
    );
    expect(getByText("Test")).toBeTruthy();
  });
});
