import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import authService from "@/services/auth.service";
import authorService from "@/services/author.service";
import postService from "@/services/post.service";
import mockAuthor from "@/testing/mocks/author";
import mockLimitStatus from "@/testing/mocks/limit-status";
import mockPosts from "@/testing/mocks/posts";
import setupPageRender from "@/testing/utils/setupPageRender";
import routes from "@/app/routes/routes";
import paths from "@/app/routes/paths";
import userEvent from "@testing-library/user-event";

vi.mock("../new-post/new-post.jsx");
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

const mockToken = "faketoken";

const setup = async () => {
  const user = userEvent.setup();
  setupPageRender(routes, [paths.home.path]);

  const newPostLink = await screen.findByRole("link", { name: /new post/i });

  return {
    user,
    newPostLink,
  };
};

describe("Home page", () => {
  beforeEach(() => {
    authService.getAuthData.mockReturnValue({
      user: mockAuthor,
      token: mockToken,
    });
    authorService.getLimitStatus.mockResolvedValue(mockLimitStatus);
    postService.getAuthorPosts.mockResolvedValue(mockPosts);
  });

  describe("New Post Link", () => {
    it("navigates to New Post page when new post link is clicked", async () => {
      const { user, newPostLink } = await setup();

      await user.click(newPostLink);

      const newPostText = await screen.findByText("This is new post");
      expect(newPostText).toBeInTheDocument();
    });

    it("disable new post link if limit is reached", async () => {
      authorService.getLimitStatus.mockResolvedValue({
        ...mockLimitStatus,
        isLimitReached: true,
      });
      const { newPostLink } = await setup();

      expect(newPostLink).toHaveAttribute("aria-disabled", "true");
    });

    it("prevents navigation to new post page if limit is reached", async () => {
      authorService.getLimitStatus.mockResolvedValue({
        ...mockLimitStatus,
        isLimitReached: true,
      });
      const { user, newPostLink } = await setup();
      await user.click(newPostLink);

      await waitFor(() => {
        const newPostText = screen.queryByText("This is new post");
        expect(newPostText).not.toBeInTheDocument();
      });
    });
  });
});
