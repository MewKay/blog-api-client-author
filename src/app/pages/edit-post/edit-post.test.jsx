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
import sqids from "@/lib/sqids";

vi.mock("@/components/editor/editor");
vi.mock("@/lib/sqids.js", () => ({
  default: {
    encode: vi.fn(),
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
    deletePost: vi.fn(),
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
  const postTextInput = await screen.findByRole("textbox", {
    name: "editable markdown",
  });
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
    sqids.decode.mockReturnValue(mockPost.id);
    authService.getAuthData.mockReturnValue({
      user: mockAuthor,
      token: mockToken,
    });
    postService.getAuthorPost.mockResolvedValue(mockPost);
    postService.getAuthorPosts.mockResolvedValue(mockPosts);
    postService.updatePost.mockReturnValue(mockPost);
    postService.deletePost.mockReturnValue();
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

  it("should be able to check and uncheck publication checkbox", async () => {
    const { user, publicationCheckbox } = await setup({ clearInputs: false });

    await user.click(publicationCheckbox);
    expect(publicationCheckbox.checked).toBe(!mockPost.is_published);

    await user.click(publicationCheckbox);
    expect(publicationCheckbox.checked).toBe(mockPost.is_published);
  });

  it("fetches and insert post data in the inputs", async () => {
    const { titleInput, postTextInput, publicationCheckbox } = await setup({
      clearInputs: false,
    });

    expect(titleInput).toHaveValue(mockPost.title);
    expect(postTextInput).toHaveValue(mockPost.text);
    expect(publicationCheckbox.checked).toBe(mockPost.is_published);
  });

  it("calls deletePost service on delete button click after confirm", async () => {
    const confirmMock = vi
      .spyOn(window, "confirm")
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    const { user, deleteButton } = await setup({ clearInputs: false });

    await user.click(deleteButton);
    expect(confirmMock).toHaveBeenCalled();
    expect(postService.deletePost).not.toHaveBeenCalled();

    await user.click(deleteButton);
    expect(confirmMock).toHaveBeenCalled();
    expect(postService.deletePost).toHaveBeenCalledOnce();
  });

  it("calls updatePost service update button click", async () => {
    const { user, titleInput, postTextInput, submitButton } = await setup({
      clearInputs: false,
    });
    const additionalTitle = " plus extra";
    const newContent = "foo bar";

    await user.type(titleInput, additionalTitle);
    await user.clear(postTextInput);
    await user.type(postTextInput, newContent);

    await user.click(submitButton);

    expect(postService.updatePost).toHaveBeenCalledWith(
      mockPost.id,
      {
        title: mockPost.title + additionalTitle,
        text: newContent,
        is_published: mockPost.is_published,
      },
      mockToken,
    );
  });
});
