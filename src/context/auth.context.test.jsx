import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./auth.context";
import mockAuthor from "@/testing/mocks/author";
import authService from "@/services/auth.service";

vi.mock("@/services/auth.service", () => ({
  default: {
    getAuthData: vi.fn(),
    logout: vi.fn(),
  },
}));

const MockChildComponent = () => {
  const { author, logout, isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <p>{author?.username}</p>
      {isAuthenticated && <p>User is logged in</p>}
      <button onClick={logout}>logging out...</button>
    </>
  );
};

describe("Auth Context", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    authService.getAuthData.mockReturnValue({ user: mockAuthor });
  });

  it("provides user data to child components", () => {
    render(
      <AuthProvider>
        <MockChildComponent />
      </AuthProvider>,
    );

    const usernameText = screen.getByText(mockAuthor.username);

    expect(usernameText).toBeInTheDocument();
  });

  it("avoids providing user data if not an author", () => {
    authService.getAuthData.mockReturnValueOnce({
      user: { ...mockAuthor, is_author: false },
    });

    render(
      <AuthProvider>
        <MockChildComponent />
      </AuthProvider>,
    );

    const usernameText = screen.queryByText(mockAuthor.username);

    expect(usernameText).not.toBeInTheDocument();
  });

  it("provides isAuthenticated boolean to child components", () => {
    const { rerender } = render(
      <AuthProvider>
        <MockChildComponent />
      </AuthProvider>,
    );

    const authText = screen.getByText(/logged in/i);
    expect(authText).toBeInTheDocument();

    authService.getAuthData.mockReturnValueOnce(null);

    rerender();
    expect(authText).not.toBeInTheDocument();
  });

  it("provides a logout function to child components", async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <MockChildComponent />
      </AuthProvider>,
    );

    const logoutButton = screen.getByRole("button", { name: /logging out/i });
    await user.click(logoutButton);

    expect(authService.logout).toHaveBeenCalled();
  });
});
