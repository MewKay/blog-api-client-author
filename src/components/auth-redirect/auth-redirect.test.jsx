import { describe, expect, it, vi } from "vitest";
import setupPageRender from "@/testing/utils/setupPageRender";
import { screen } from "@testing-library/react";
import AuthRedirect from "./auth-redirect";
import useAuth from "@/hooks/useAuth";

vi.mock("@/hooks/useAuth", () => ({
  default: vi.fn(),
}));

const mockRoutes = [
  {
    path: "/",
    element: <>This is home</>,
  },
  {
    path: "to-redirect",
    element: <AuthRedirect>Redirect element</AuthRedirect>,
  },
];

const setup = () => {
  setupPageRender(mockRoutes, ["/to-redirect"]);

  const redirectText = screen.queryByText("Redirect element");
  const homeText = screen.queryByText("This is home");

  return { redirectText, homeText };
};

describe("AuthRedirect component", () => {
  it("redirects to home if author is logged in", async () => {
    useAuth.mockReturnValue({ isAuthenticated: true });
    const { homeText, redirectText } = setup();

    expect(homeText).toBeInTheDocument();
    expect(redirectText).not.toBeInTheDocument();
  });

  it("render children components if author is not logged in", async () => {
    useAuth.mockReturnValue({ isAuthenticated: false });
    const { homeText, redirectText } = setup();

    expect(homeText).not.toBeInTheDocument();
    expect(redirectText).toBeInTheDocument();
  });
});
