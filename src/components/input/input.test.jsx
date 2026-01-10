import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import Input from "./input";
import userEvent from "@testing-library/user-event";

const mockProps = {
  value: "Writings",
  setValue: vi.fn(),
  errorMessage: "Something is wrong",
};

const setup = (customProps) => {
  const props = customProps ?? mockProps;
  const user = userEvent.setup();
  const component = render(<Input {...props}>Label :</Input>);
  const input = component.getByLabelText("Label :");

  return {
    user,
    component,
    input,
  };
};

describe("Input component", () => {
  it("renders correctly", () => {
    const { container } = setup().component;

    expect(container).toMatchSnapshot();
  });

  it("allows writing on inout when 'value' and 'setValue' are provided (controlled)", async () => {
    const { user, input } = setup();
    const inputText = "MyText";

    await user.clear(input);
    await user.type(input, inputText);

    expect(mockProps.setValue).toHaveBeenCalledTimes(inputText.length + 1); // setValue should be called after 'user.clear()' as well
  });

  it("allows writing on input when neither 'value' nor 'setValue' props are given (uncontrolled)", async () => {
    const { user, input } = setup({
      ...mockProps,
      value: undefined,
      setValue: undefined,
    });
    const typedText = "content";

    await user.type(input, typedText);
    expect(input).toHaveValue(typedText);
  });

  it("allows writing on input when only 'value' prop is given, 'setValue' is undefined (uncontrolled)", async () => {
    const { user, input } = setup({
      ...mockProps,
      setValue: undefined,
    });
    const typedText = " additional";

    await user.type(input, typedText);
    expect(input).toHaveValue(mockProps.value + typedText);
  });
});
