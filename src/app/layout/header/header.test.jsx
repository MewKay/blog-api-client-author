import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./header";
import useAuth from "@/hooks/useAuth";
import userEvent from "@testing-library/user-event";

vi.mock("@/hooks/useAuth", () => ({
  default: vi.fn(() => ({ logout: vi.fn() })),
}));

describe("Header component", () => {
  it("renders correctly", () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });

  it("calls log out on button click", async () => {
    const user = userEvent.setup();
    const mockLogout = vi.fn();
    useAuth.mockReturnValue({ logout: mockLogout });

    render(<Header />);
    await user.click(screen.getByRole("button", { name: /log out/i }));

    expect(mockLogout).toHaveBeenCalled();
  });
});
