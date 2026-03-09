import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import authService from "@/services/auth.service";
import mockAuthor from "@/testing/mocks/author";
import paths from "../routes/paths";
import setupPageRender from "@/testing/utils/setupPageRender";
import authorService from "@/services/author.service";
import Layout from "./layout";
import { Link, useOutletContext } from "react-router-dom";
import layoutLoader from "./layout.loader";
import mockLimitStatus from "@/testing/mocks/limit-status";
import userEvent from "@testing-library/user-event";

vi.mock("@/app/pages/login/login.jsx");
vi.mock("@/app/layout/header/header.jsx");
vi.mock("@/app/pages/home/home.jsx");
vi.mock("@/services/auth.service.js", () => ({
  default: {
    getAuthData: vi.fn(),
    logout: vi.fn(),
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
      <Link to="/my-post">Link to my post</Link>
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
    shouldRevalidate: () => true,
    children: [
      {
        index: true,
        element: <MockOutletConsumer />,
      },
      {
        path: "/my-post",
        element: <>This is my post</>,
      },
    ],
  },
  {
    path: paths.login.path,
    element: <>This is login page</>,
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
    setupPageRender(mockRoute, [paths.home.path]);

    const loginText = await screen.findByText("This is login page");
    expect(loginText).toBeInTheDocument();
  });

  it("redirects user to log in page if they do not have required permission", async () => {
    authService.getAuthData.mockReturnValue({
      user: { ...mockAuthor, is_author: false },
    });
    setupPageRender(mockRoute, [paths.home.path]);

    const loginText = await screen.findByText("This is login page");
    expect(loginText).toBeInTheDocument();
  });

  it("redirects to log in page if user's session expired", async () => {
    authService.getAuthData
      .mockReturnValueOnce({ user: mockAuthor })
      .mockReturnValueOnce(false);
    const user = userEvent.setup();
    setupPageRender(mockRoute, ["/"]);

    const postLink = await screen.findByRole("link", {
      name: /link to my post/i,
    });
    await user.click(postLink);

    await waitFor(() => {
      expect(screen.queryByText("This is my post")).not.toBeInTheDocument();
    });
    expect(screen.getByText("This is login page")).toBeInTheDocument();
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
