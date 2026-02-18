import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
} from "react-router-dom";
import authService from "@/services/auth.service";
import Header from "./header";
import paths from "@/app/routes/paths";
import mockAuthor from "@/testing/mocks/author";

vi.mock("@/components/navigation-status/navigation-status.jsx", () => ({
  default: () => <>Status</>,
}));

const loginText = "This is log in page";

const mockRouter = createMemoryRouter(
  [
    {
      path: "/",
      element: (
        <>
          <Header />
          <main>Content</main>
        </>
      ),
    },
    {
      path: paths.login.path,
      element: <>{loginText}</>,
    },
  ],
  { initialEntries: ["/"] },
);

describe("Header component", () => {
  beforeEach(() => {
    authService.getAuthData = vi.fn().mockReturnValue({
      user: mockAuthor,
      token: "mockToken",
    });
  });
  it("renders correctly", () => {
    const { container } = render(<Header />, { wrapper: MemoryRouter });

    expect(container).toMatchSnapshot();
  });

  it("displays 'Guest mode' if author is a guest, nothing otherwise", () => {
    authService.getAuthData = vi
      .fn()
      .mockReturnValueOnce({
        user: { ...mockAuthor, is_guest: true },
        token: "mockToken",
      })
      .mockReturnValueOnce({
        user: { ...mockAuthor, is_guest: false },
        token: "mockToken",
      });
    const component = render(<Header />, {
      wrapper: MemoryRouter,
    });

    const guestButton = () => screen.queryByRole("button", { name: /guest/i });
    screen.debug();
    expect(guestButton()).toBeInTheDocument();

    component.rerender(<Header />, {
      wrapper: MemoryRouter,
    });
    expect(guestButton()).not.toBeInTheDocument();
  });

  it("calls authService log out on button click and redirect to log in page", async () => {
    authService.logout = vi.fn();
    const user = userEvent.setup();

    render(<RouterProvider router={mockRouter} />);
    await user.click(screen.getByRole("button", { name: /log out/i }));

    expect(authService.logout).toHaveBeenCalledOnce();
    expect(await screen.findByText(loginText)).toBeInTheDocument();
  });
});
