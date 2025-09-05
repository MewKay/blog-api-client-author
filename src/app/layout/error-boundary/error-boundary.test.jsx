import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, useRouteError } from "react-router-dom";
import NetworkError from "@/lib/errors/network.error";
import ServerError from "@/lib/errors/server.error";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./error-boundary";

vi.mock("react-router-dom", async (importOriginal) => {
  const reactRouterDom = await importOriginal();

  return {
    ...reactRouterDom,
    useRouteError: vi.fn(),
  };
});

describe("Error Boundary", () => {
  it.each([
    {
      errorName: "NetworkError",
      error: new NetworkError(),
      queryMessage: /Connection issue/i,
    },
    {
      errorName: "ServerError",
      error: new ServerError({ error: "This is server error" }),
      queryMessage: /Server Temporarily Unavailable/i,
    },
    {
      errorName: "UnexpectedError",
      error: new Error(),
      queryMessage: /Something went wrong/i,
    },
  ])(
    "displays specific error page on $errorName",
    ({ error, queryMessage }) => {
      useRouteError.mockReturnValue(error);

      render(<ErrorBoundary />, { wrapper: MemoryRouter });
      expect(screen.getByText(queryMessage)).toBeInTheDocument();
    },
  );
});
