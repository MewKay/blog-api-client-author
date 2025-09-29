import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useNavigation } from "react-router-dom";
import NavigationStatus from "./navigation-status";

vi.mock("react-router-dom", async (importOriginal) => {
  const reactRouterDom = await importOriginal();

  return {
    ...reactRouterDom,
    useNavigation: vi.fn(),
  };
});

const setup = (navigationStatus = "idle") => {
  useNavigation.mockReturnValue({
    state: navigationStatus,
  });
  const component = render(<NavigationStatus />);

  return {
    component,
    rerender: (newNavigationStatus) => {
      useNavigation.mockReturnValue({
        state: newNavigationStatus,
      });
      component.rerender(<NavigationStatus />);
    },
  };
};

describe("SubmitAlert component", () => {
  it("shows loading message when navigation is 'loading'", () => {
    setup("loading");
    const message = screen.getByText(/Loading/i);

    expect(message).toBeInTheDocument();
  });

  it("shows submit message when navigation is 'submitting'", () => {
    setup("submitting");
    const message = screen.getByText(/Submit/i);

    expect(message).toBeInTheDocument();
  });

  it("have the last shown message when navigation is 'idle'", () => {
    const { rerender } = setup("loading");
    const loadingMessage = screen.getByText(/Loading/i);
    expect(loadingMessage).toBeInTheDocument();

    rerender("idle");
    expect(loadingMessage).toBeInTheDocument();

    rerender("submitting");
    const submittingMessage = screen.getByText(/Submit/i);
    expect(submittingMessage).toBeInTheDocument();

    rerender("idle");
    expect(submittingMessage).toBeInTheDocument();
  });
});
