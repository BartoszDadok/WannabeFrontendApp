import { render } from "../../../utils/test-utils";

import DeleteAccountButton from "../../../components/atoms/DeleteAccountButton";
import { DeleteAccountRequsetType } from "../../../components/atoms/DeleteAccountButton";

describe("DeleteAccountButton", () => {
  test("Should render delete button", () => {
    const deleteFn = {} as DeleteAccountRequsetType;
    const { getByText } = render(
      <DeleteAccountButton deleteAccount={deleteFn} />
    );
    expect(getByText("Delete account")).toBeTruthy();
  });

  test("Should have background color light when theme is dark", () => {
    const deleteFn = {} as DeleteAccountRequsetType;
    const { getByTestId } = render(
      <DeleteAccountButton deleteAccount={deleteFn} />,
      {
        preloadedState: {
          theme: { mode: "dark" },
        },
      }
    );
    expect(getByTestId("DeleteAccount").props.style[1].backgroundColor).toEqual(
      "rgba(255,228,0,1)"
    );
  });

  test("Should have background color dark when theme is light", () => {
    const deleteFn = {} as DeleteAccountRequsetType;
    const { getByTestId } = render(
      <DeleteAccountButton deleteAccount={deleteFn} />,
      {
        preloadedState: {
          theme: { mode: "light" },
        },
      }
    );
    expect(getByTestId("DeleteAccount").props.style[1].backgroundColor).toEqual(
      "rgba(255,228,0,1)"
    );
  });
});
