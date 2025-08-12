import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from "./input";
import userEvent from "@testing-library/user-event";

const mockProps = {
  value: "Writings",
  setValue: vi.fn(),
  errorMessage: "Something is wrong",
};

describe("Input component", () => {
  it("renders correctly", () => {
    const { container } = render(<Input {...mockProps}>Label :</Input>);

    expect(container).toMatchSnapshot();
  });

  it("calls setValue when input is typed", async () => {
    const user = userEvent.setup();
    render(<Input {...mockProps}>Label :</Input>);

    const input = screen.getByLabelText("Label :");
    await user.type(input, "A");

    expect(mockProps.setValue).toHaveBeenCalledOnce();

    await user.type(input, "BC");

    expect(mockProps.setValue).toHaveBeenCalledTimes(3);
  });

  it("hides error message if value is empty", () => {
    render(
      <Input {...mockProps} value="">
        Label :
      </Input>,
    );

    const errorMessage = screen.queryByText(mockProps.errorMessage);

    expect(errorMessage).not.toBeInTheDocument();
  });
});
