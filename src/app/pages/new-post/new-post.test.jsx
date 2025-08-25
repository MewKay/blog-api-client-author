import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import setupPageRender from "@/testing/utils/setupPageRender";
import paths from "@/app/routes/paths";
import routes from "@/app/routes/routes";
import mockPosts from "@/testing/mocks/posts";
import { createMemoryRouter, Link, RouterProvider } from "react-router-dom";
import postService from "@/services/post.service";
import authService from "@/services/auth.service";
import mockAuthor from "@/testing/mocks/author";
import BadRequestError from "@/lib/errors/bad-request.error";
import commentService from "@/services/comment.service";
import mockComments from "@/testing/mocks/comments";

vi.mock("@/services/post.service", () => ({
  default: {
    createPost: vi.fn(),
    getAuthorPost: vi.fn(),
  },
}));
vi.mock("@/services/comment.service", () => ({
  default: {
    getAllByPostId: vi.fn(),
  },
}));
vi.mock("@/services/auth.service", () => ({
  default: {
    getAuthData: vi.fn(),
  },
}));

const mockPost = mockPosts[0];
const mockToken = "someToken";
const mockInputValue = {
  title: mockPost.title,
  text: mockPost.text,
  is_published: true,
};

const mockRoutes = [
  ...routes,
  {
    path: "/test",
    element: (
      <main>
        <Link to={paths.newBlogPost.path}>To new post</Link>
        <p>This is test</p>{" "}
      </main>
    ),
  },
];

const setup = () => {
  const user = userEvent.setup();
  setupPageRender(routes, [paths.newBlogPost.path]);

  const titleInput = screen.getByLabelText(/title/i);
  const postTextInput = screen.getByPlaceholderText(/write your post/i);
  const publicationCheckbox = screen.getByLabelText(/Publish/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  return {
    user,
    titleInput,
    postTextInput,
    publicationCheckbox,
    submitButton,
  };
};

describe("New Post page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    postService.createPost.mockReturnValue(mockPost);
    postService.getAuthorPost.mockReturnValue(mockPost);
    commentService.getAllByPostId.mockReturnValue(mockComments);
    authService.getAuthData.mockReturnValue({
      user: mockAuthor,
      token: mockToken,
    });
  });

  it("should be able to type on title input", async () => {
    const { user, titleInput } = setup();
    await user.type(titleInput, mockInputValue.title);

    expect(titleInput).toHaveValue(mockInputValue.title);
  });

  it("should be able to type on post text input", async () => {
    const { user, postTextInput } = setup();
    await user.type(postTextInput, mockInputValue.text);

    expect(postTextInput).toHaveValue(mockInputValue.text);
  });

  it("should be able to check and uncheck publication checkbox", async () => {
    const { user, publicationCheckbox } = setup();

    await user.click(publicationCheckbox);
    expect(publicationCheckbox.checked).toBeTruthy();

    await user.click(publicationCheckbox);
    expect(publicationCheckbox.checked).toBeFalsy();
  });

  it("return back to last route in history if cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <RouterProvider
        router={createMemoryRouter(mockRoutes, { initialEntries: ["/test"] })}
      />,
    );

    const newPostLink = screen.getByRole("link", { name: /to new post/i });
    await user.click(newPostLink);

    const cancelButton = await screen.findByRole("button", { name: /cancel/i });
    await user.click(cancelButton);

    const lastRouteText = await screen.findByText("This is test");
    expect(lastRouteText).toBeInTheDocument();
  });

  it("calls createPost service with inputs then redirect to new blog post page on submit", async () => {
    const {
      user,
      titleInput,
      postTextInput,
      publicationCheckbox,
      submitButton,
    } = setup();

    await user.type(titleInput, mockInputValue.title);
    await user.type(postTextInput, mockInputValue.text);
    await user.click(publicationCheckbox);

    await user.click(submitButton);

    expect(postService.createPost).toHaveBeenCalledWith(
      mockInputValue,
      mockToken,
    );

    const postTitle = await screen.findByText(mockPost.title);
    expect(postTitle).toBeInTheDocument();
  });

  it("should display one or many error message for any problem occuring during api call", async () => {
    const errorMessages = ["Username is invalid", "Password is too weak"];

    postService.createPost.mockImplementationOnce(() => {
      throw new BadRequestError("Validation error", { error: errorMessages });
    });

    const {
      user,
      titleInput,
      postTextInput,
      publicationCheckbox,
      submitButton,
    } = setup();
    await user.type(titleInput, mockInputValue.title);
    await user.type(postTextInput, mockInputValue.text);
    await user.click(publicationCheckbox);
    await user.click(submitButton);

    expect(postService.createPost).toHaveBeenCalledWith(
      mockInputValue,
      mockToken,
    );

    for (let message of errorMessages) {
      const errorText = await screen.findByText(message);
      expect(errorText).toBeInTheDocument();
    }
  });

  it("should not let user submit form if it is invalid", async () => {
    const { user, titleInput, submitButton } = setup();

    await user.type(titleInput, "This is invalid post");
    await user.click(submitButton);

    expect(postService.createPost).not.toHaveBeenCalled();
  });
});
