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
    getAuthData: vi.fn(),
  },
}));
vi.mock("@/services/post.service", () => ({
  default: {
    getAuthorPost: vi.fn(),
    getAuthorPosts: vi.fn(),
    updatePost: vi.fn(),
  },
}));
vi.mock("@/services/comment.service", () => ({
  default: {
    getAllByPostId: vi.fn(),
    deleteOne: vi.fn(),
  },
}));

const mockPost = mockPosts[0];
const mockToken = "sometoken";

const setup = async (encodedId = "mockedId", slug = mockPost.slug) => {
  const user = userEvent.setup();
  setupPageRender(routes, [paths.blogPost.getHref(encodedId, slug)]);

  const homeLink = await screen.findByRole("link", { name: /to blog list/i });

  const postTitle = await screen.findByText(mockPost.title);
  const postText = await screen.findByText(mockPost.text);
  const publishButton = await screen.findByRole("button", {
    name: /Publish post/i,
  });

  const commentsText = [];
  const commentDeleteButtons = {};
  for (let comment of mockComments) {
    const commentText = await screen.findByText(comment.text);
    commentsText.push(commentText);
    const commentButton = commentText.closest("li").querySelector("button");
    commentDeleteButtons[comment.text] = commentButton;
  }

  return {
    user,
    homeLink,
    postTitle,
    postText,
    publishButton,
    commentsText,
    commentDeleteButtons,
  };
};

describe("Blog Post page", () => {
  beforeEach(() => {
    authService.getAuthData.mockReturnValue({
      user: mockAuthor,
      token: mockToken,
    });
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

  it("calls post service with post with 'is_published' field as true if Publish button is clicked", async () => {
    const { user, publishButton } = await setup();

    await user.click(publishButton);

    expect(postService.updatePost).toHaveBeenCalledWith(
      mockPost.id,
      {
        title: mockPost.title,
        text: mockPost.text,
        is_published: true,
      },
      mockToken,
    );
  });

  it("delete one comment on delete comment button click then confirm", async () => {
    const confirmMock = vi
      .spyOn(window, "confirm")
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    const { user, commentDeleteButtons } = await setup();

    const commentNotToDelete = mockComments[1].text;
    const commentToDelete = mockComments[0].text;

    await user.click(commentDeleteButtons[commentNotToDelete]);

    expect(confirmMock).toHaveBeenCalled();
    expect(commentService.deleteOne).not.toHaveBeenCalled();

    await user.click(commentDeleteButtons[commentToDelete]);

    expect(confirmMock).toHaveBeenCalled();
    expect(commentService.deleteOne).toHaveBeenCalledWith(
      expect.objectContaining({
        commentId: `${mockComments[0].id}`,
      }),
      "someToken",
    );
  });
});
