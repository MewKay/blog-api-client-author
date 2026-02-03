import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import routes from "../routes/routes";
import authService from "@/services/auth.service";
import mockAuthor from "@/testing/mocks/author";
import paths from "../routes/paths";
import setupPageRender from "@/testing/utils/setupPageRender";
import authorService from "@/services/author.service";
import Layout from "./layout";
import { useOutletContext } from "react-router-dom";
import layoutLoader from "./layout.loader";
import mockLimitStatus from "@/testing/mocks/limit-status";

vi.mock("@/app/pages/login/login.jsx");
vi.mock("@/app/pages/home/home.jsx");
vi.mock("@/services/auth.service.js", () => ({
  default: {
    getAuthData: vi.fn(),
  },
}));
vi.mock("@/services/author.service.js", () => ({
  default: {
    getLimitStatus: vi.fn(),
  },
}));
vi.mock("@/services/post.service", () => ({
  default: {
    getAuthorPosts: vi.fn(),
  },
}));

const limitReachedMessage = "Limit Reached !";
const postRemainingMessage = (number) => `Post remaining : ${number}`;
const MockOutletConsumer = () => {
  const { user, limitStatus } = useOutletContext();

  return (
    <>
      <p>{user.username}</p>
      <div>
        {limitStatus.isLimitReached && <p>{limitReachedMessage}</p>}
        <p>{postRemainingMessage(limitStatus.postRemaining)}</p>
      </div>
    </>
  );
};
const mockRoute = [
  {
    path: "/",
    element: <Layout />,
    loader: layoutLoader,
    children: [
      {
        index: true,
        element: <MockOutletConsumer />,
      },
    ],
  },
];

describe("Layout component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    authService.getAuthData.mockReturnValue({ user: mockAuthor });
    authorService.getLimitStatus.mockReturnValue(mockLimitStatus);
  });

  it("redirects user to log in page if they are not authenticated", async () => {
    authService.getAuthData.mockReturnValue(false);
    setupPageRender(routes, [paths.home.path]);

    const loginText = await screen.findByText("This is login page");
    expect(loginText).toBeInTheDocument();
  });

  it("passes correctly author guest status to Header component", async () => {
    authService.getAuthData.mockReturnValue({
      user: { ...mockAuthor, is_guest: true },
    });
    setupPageRender(routes, [paths.home.path]);

    expect(
      await screen.findByRole("button", { name: /guest/i }),
    ).toBeInTheDocument();
  });

  it("provides user data to outlets", async () => {
    setupPageRender(mockRoute, ["/"]);
    const usernameText = await screen.findByText(mockAuthor.username);

    expect(usernameText).toBeInTheDocument();
  });

  it("provides limitStatus data to outlets", async () => {
    const numberRemaining = 14;
    authorService.getLimitStatus.mockReturnValue({
      isLimitReached: true,
      postRemaining: numberRemaining,
    });
    authService.getAuthData.mockReturnValue({
      user: { ...mockAuthor, is_guest: true },
    });
    setupPageRender(mockRoute, ["/"]);
    const limitReachedText = await screen.findByText(limitReachedMessage);
    const postRemainingText = await screen.findByText(
      postRemainingMessage(numberRemaining),
    );

    expect(limitReachedText).toBeInTheDocument();
    expect(postRemainingText).toBeInTheDocument();
  });
});
