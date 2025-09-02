import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ActionErrorMessages from "./action-error-messages.jsx";

const setup = (prop = undefined) => {
  const { container } = render(<ActionErrorMessages actionData={prop} />);
  const errorMessages = screen.queryAllByRole("listitem");

  return {
    container,
    errorMessages,
  };
};

describe("ActionErrorMessages component", () => {
  it("displays empty component if actionData is falsy", () => {
    const { container, errorMessages } = setup();

    expect(container).toBeEmptyDOMElement();
    expect(errorMessages).toHaveLength(0);
  });

  it("displays a single error message if actionData error field is not an array", () => {
    const prop = { error: "Something went wrong!" };
    const { errorMessages } = setup(prop);

    expect(errorMessages).toHaveLength(1);
    expect(screen.getByText(prop.error)).toBeInTheDocument();
  });

  it("displays an list of errors if actionData error field is an array", () => {
    const prop = {
      error: [
        "Username is already taken",
        "Password is invalid",
        "Password is not matching",
      ],
    };
    const { errorMessages } = setup(prop);

    expect(errorMessages).toHaveLength(prop.error.length);
    prop.error.forEach((message) => {
      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });
});
