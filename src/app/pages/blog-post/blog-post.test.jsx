import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routes from "@/app/routes/routes";
import setupPageRender from "@/testing/utils/setupPageRender";
import paths from "@/app/routes/paths";

import postService from "@/services/post.service";
import commentService from "@/services/comment.service";
import authService from "@/services/auth.service";
import mockAuthor from "@/testing/mocks/author";
import mockPosts from "@/testing/mocks/posts";
import mockComments from "@/testing/mocks/comments";

vi.mock("../home/home.jsx");
vi.mock("@/lib/sqids.js", () => ({
  default: {
    decode: vi.fn(),
  },
}));
vi.mock("@/services/auth.service", () => ({
  default: {
    getUser: vi.fn(),
    getToken: vi.fn(),
  },
}));
vi.mock("@/services/post.service", () => ({
  default: {
    getAuthorPost: vi.fn(),
    getAuthorPosts: vi.fn(),
  },
}));
vi.mock("@/services/comment.service", () => ({
  default: {
    getAllByPostId: vi.fn(),
  },
}));

const mockPost = mockPosts[1];

const setup = async (encodedId = "mockedId", slug = mockPost.slug) => {
  const user = userEvent.setup();
  setupPageRender(routes, [paths.blogPost.getHref(encodedId, slug)]);

  const homeLink = await screen.findByRole("link", { name: /to blog list/i });

  const postTitle = await screen.findByText(mockPost.title);
  const postText = await screen.findByText(mockPost.text);

  const commentsText = [];
  for (let comment of mockComments) {
    commentsText.push(await screen.findByText(comment.text));
  }

  return {
    user,
    homeLink,
    postTitle,
    postText,
    commentsText,
  };
};

describe("Blog Post page", () => {
  beforeEach(() => {
    authService.getToken.mockReturnValue("someToken");
    authService.getUser.mockReturnValue(mockAuthor);
    postService.getAuthorPost.mockResolvedValue(mockPost);
    commentService.getAllByPostId.mockResolvedValue(mockComments);
  });

  it("successfully fetched and display author's post with comments", async () => {
    const { postTitle, postText, commentsText } = await setup();

    expect(postTitle).toBeInTheDocument();
    expect(postText).toBeInTheDocument();
    commentsText.forEach((commentText) =>
      expect(commentText).toBeInTheDocument(),
    );
  });

  it("display a link to go back to home", async () => {
    const { user, homeLink } = await setup();

    expect(homeLink).toBeInTheDocument();
    await user.click(homeLink);

    expect(await screen.findByText("This is home")).toBeInTheDocument();
  });
});
