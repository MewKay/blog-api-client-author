import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import AuthorPasswordInput from "./author-password-input";

const mockProps = {
  value: "imZewriter",
  setValue: vi.fn(),
  errorMessage: "No, you're not",
};

describe("AuthorPasswordInput component", () => {
  it("renders correclty", () => {
    const { container } = render(<AuthorPasswordInput {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});
