import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import ProtectedRedirect from "./protected-redirect";
import paths from "@/app/routes/paths";
import useAuth from "@/hooks/useAuth";
import setupPageRender from "@/testing/utils/setupPageRender";

vi.mock("@/hooks/useAuth", () => ({
  default: vi.fn(),
}));

const mockRoutes = [
  {
    path: "/",
    element: <ProtectedRedirect>Protected page</ProtectedRedirect>,
  },
  {
    path: paths.login.path,
    element: <>This is login page</>,
  },
];

const setup = () => {
  setupPageRender(mockRoutes, ["/"]);

  const protectedText = screen.queryByText("Protected page");
  const loginText = screen.queryByText("This is login page");

  return {
    protectedText,
    loginText,
  };
};

describe("ProtectedRedirect component", () => {
  it("redirect to login page if author is not logged in", () => {
    useAuth.mockReturnValue({ isAuthenticated: false });
    const { protectedText, loginText } = setup();

    expect(loginText).toBeInTheDocument();
    expect(protectedText).not.toBeInTheDocument();
  });

  it("render children if author is logged in", () => {
    useAuth.mockReturnValue({ isAuthenticated: true });
    const { protectedText, loginText } = setup();

    expect(loginText).not.toBeInTheDocument();
    expect(protectedText).toBeInTheDocument();
  });
});
