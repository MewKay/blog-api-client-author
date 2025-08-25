import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import setupPageRender from "@/testing/utils/setupPageRender";
import paths from "@/app/routes/paths";
import routes from "@/app/routes/routes";
import mockPosts from "@/testing/mocks/posts";
import { createMemoryRouter, Link, RouterProvider } from "react-router-dom";

const mockInputValue = {
  title: mockPosts[0].title,
  text: mockPosts[0].text,
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
});
