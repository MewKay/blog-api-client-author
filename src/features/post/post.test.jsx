import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { addMonths } from "date-fns";
import Post from "./post";
import mockPosts from "@/testing/mocks/posts";

const mockPost = mockPosts[0];

describe("Post component", () => {
  it("renders correctly", () => {
    const { container } = render(<Post post={mockPost} />);

    expect(container).toMatchSnapshot();
  });

  it("displays edited date if post was modified", () => {
    const editedPost = {
      ...mockPost,
      edited_at: addMonths(mockPost.created_at, 2).toISOString(),
    };

    render(<Post post={editedPost} />);

    const editedText = screen.getByText(/edited/i);

    expect(editedText).toBeInTheDocument();
  });

  it("display whether post is published or not", () => {
    const publishedPost = {
      ...mockPost,
      is_published: true,
    };
    const unpublishedPost = {
      ...mockPost,
      is_published: false,
    };

    const { rerender } = render(<Post post={publishedPost} />);
    expect(screen.getByText(/published/i)).toBeInTheDocument();
    expect(screen.queryByText(/unpublished/i)).not.toBeInTheDocument();

    rerender(<Post post={unpublishedPost} />);
    expect(screen.queryByText(/^published/i)).not.toBeInTheDocument();
    expect(screen.getByText(/unpublished/i)).toBeInTheDocument();
  });
});
