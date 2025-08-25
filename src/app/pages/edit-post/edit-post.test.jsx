import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import paths from "@/app/routes/paths";
import routes from "@/app/routes/routes";
import setupPageRender from "@/testing/utils/setupPageRender";
import mockPosts from "@/testing/mocks/posts";
import authService from "@/services/auth.service";
import mockAuthor from "@/testing/mocks/author";
import postService from "@/services/post.service";

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
  },
}));

const mockPost = mockPosts[1];
const mockToken = "thisistoken";
const mockInputValue = {
  title: mockPosts[0].title,
  text: mockPosts[0].text,
};

const setup = async ({ clearInputs }) => {
  const user = userEvent.setup();
  setupPageRender(routes, [
    paths.editBlogPost.getHref("mockedId", mockPost.slug),
  ]);

  const titleInput = await screen.findByLabelText(/title/i);
  const postTextInput = await screen.findByPlaceholderText(/write your post/i);
  const publicationCheckbox = await screen.findByLabelText(/Publish/i);
  const submitButton = await screen.findByRole("button", { name: /update/i });
  const deleteButton = await screen.findByRole("button", { name: /delete/i });

  if (clearInputs) {
    await user.clear(titleInput);
    await user.clear(postTextInput);
  }

  return {
    user,
    titleInput,
    postTextInput,
    publicationCheckbox,
    submitButton,
    deleteButton,
  };
};

describe("Edit Post page", () => {
  beforeEach(() => {
    authService.getAuthData.mockReturnValue({
      user: mockAuthor,
      token: mockToken,
    });
    postService.getAuthorPost.mockResolvedValue(mockPost);
  });

  it("should be able to type on title input", async () => {
    const { user, titleInput } = await setup({ clearInputs: true });
    await user.type(titleInput, mockInputValue.title);

    expect(titleInput).toHaveValue(mockInputValue.title);
  });

  it("should be able to type on post text input", async () => {
    const { user, postTextInput } = await setup({ clearInputs: true });
    await user.type(postTextInput, mockInputValue.text);

    expect(postTextInput).toHaveValue(mockInputValue.text);
  });

  it("fetches and insert post data in the inputs", async () => {
    const { titleInput, postTextInput, publicationCheckbox } = await setup({
      clearInputs: false,
    });

    expect(titleInput).toHaveValue(mockPost.title);
    expect(postTextInput).toHaveValue(mockPost.text);
    expect(publicationCheckbox.checked).toBe(mockPost.is_published);
  });
});
