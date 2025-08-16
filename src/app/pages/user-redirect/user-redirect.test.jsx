import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import UserRedirect from "./user-redirect";

describe("UserRedirect component", () => {
  it("renders correctly", () => {
    const { container } = render(<UserRedirect />);

    expect(container).toMatchSnapshot();
  });
});
