import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import UserRedirect from "./user-redirect";
import { MemoryRouter } from "react-router-dom";

describe("UserRedirect component", () => {
  it("renders correctly", () => {
    const { container } = render(<UserRedirect />, { wrapper: MemoryRouter });

    expect(container).toMatchSnapshot();
  });
});
