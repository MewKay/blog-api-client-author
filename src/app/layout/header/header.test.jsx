import { describe, expect, it, vi } from "vitest";
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
  it("renders correctly", () => {
    const { container } = render(<Header />, { wrapper: MemoryRouter });

    expect(container).toMatchSnapshot();
  });

  it("displays 'Guest mode' if author is a guest, nothing otherwise", () => {
    const component = render(<Header isUserGuest={true} />, {
      wrapper: MemoryRouter,
    });

    const guestButton = () => screen.queryByRole("button", { name: /guest/i });
    expect(guestButton()).toBeInTheDocument();

    component.rerender(<Header isUserGuest={false} />, {
      wrapper: MemoryRouter,
    });
    expect(guestButton()).not.toBeInTheDocument();

    component.rerender(<Header />, { wrapper: MemoryRouter });
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
