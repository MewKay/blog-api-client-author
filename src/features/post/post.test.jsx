import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { addMonths } from "date-fns";
import Post from "./post";
import mockPosts from "@/testing/mocks/posts";
import { MemoryRouter } from "react-router-dom";
import paths from "@/app/routes/paths";

const mockProps = {
  post: mockPosts[0],
  editPostLink: paths.editBlogPost.getHref("mockedId", "this-is-blog-post"),
};

describe("Post component", () => {
  it("renders correctly", () => {
    const { container } = render(<Post {...mockProps} />, {
      wrapper: MemoryRouter,
    });

    expect(container).toMatchSnapshot();
  });

  it("displays edited date if post was modified", () => {
    const editedPost = {
      ...mockProps.post,
      edited_at: addMonths(mockProps.post.created_at, 2).toISOString(),
    };

    render(<Post post={editedPost} editPostLink={mockProps.editPostLink} />, {
      wrapper: MemoryRouter,
    });

    const editedText = screen.getByText(/edited/i);

    expect(editedText).toBeInTheDocument();
  });

  it("display whether post is published or not", () => {
    const publishedPost = {
      ...mockProps.post,
      is_published: true,
    };
    const unpublishedPost = {
      ...mockProps.post,
      is_published: false,
    };

    const { rerender } = render(
      <Post post={publishedPost} editPostLink={mockProps.editPostLink} />,
      {
        wrapper: MemoryRouter,
      },
    );
    expect(screen.getByText(/published/i)).toBeInTheDocument();
    expect(screen.queryByText(/unpublished/i)).not.toBeInTheDocument();

    rerender(
      <Post post={unpublishedPost} editPostLink={mockProps.editPostLink} />,
      {
        wrapper: MemoryRouter,
      },
    );
    expect(screen.queryByText(/^published/i)).not.toBeInTheDocument();
    expect(screen.getByText(/unpublished/i)).toBeInTheDocument();
  });
});
