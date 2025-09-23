import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ScrollButton from "./scroll-button";

describe("ScrollButton component", () => {
  it("calls 'window.scroll' on click", async () => {
    window.scroll = vi.fn();
    const user = userEvent.setup();

    render(<ScrollButton visibility={true} />);
    await user.click(screen.getByRole("button"));

    expect(window.scroll).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ top: 0 }),
    );
  });
});
