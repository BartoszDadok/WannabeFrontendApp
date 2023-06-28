import { render } from "../../../utils/test-utils";
import FormInput from "../../../components/atoms/FormInput";

describe("Form input", () => {
  test("Should render form input", () => {
    const { getByPlaceholderText } = render(
      <FormInput
        placeholder='Test Placeholder'
        label='Test Label'
        value='Test Value'
        onChangeText={() => {}}
        autoCapitalize='none'
        error={undefined}
        secureTextEntry={true}
      />
    );
    expect(getByPlaceholderText("Test Placeholder")).toBeTruthy();
  });
  test("Should render error when exist", () => {
    const { getByText } = render(
      <FormInput
        placeholder='Test Placeholder'
        label='Test Label'
        value='Test Value'
        onChangeText={() => {}}
        autoCapitalize='none'
        error='Test error'
        secureTextEntry={true}
      />
    );
    expect(getByText("Test error")).toBeTruthy();
  });
});
