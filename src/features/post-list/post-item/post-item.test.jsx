import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PostItem from "./post-item";
import mockPosts from "@/testing/mocks/posts";
import sqids from "@/lib/sqids";
import { MemoryRouter } from "react-router-dom";

vi.setSystemTime(new Date(2025, 8, 1));
const mockPost = mockPosts[1];

describe("Post Item component", () => {
  it("renders correctly", () => {
    const { container } = render(<PostItem post={mockPost} />, {
      wrapper: MemoryRouter,
    });

    expect(container).toMatchSnapshot();
  });

  it("calls sqids encoding when rendering", async () => {
    sqids.encode = vi.fn();

    render(<PostItem post={mockPost} />, { wrapper: MemoryRouter });

    expect(sqids.encode).toHaveBeenCalledOnce();
  });

  it("displays update date if applied, hide otherwise", () => {
    const postDate = new Date(2023, 5, 2).toISOString();
    const updatedPost = {
      ...mockPost,
      created_at: postDate,
      edited_at: new Date(2024, 6, 13).toISOString(),
    };
    const notEditedPost = {
      ...mockPost,
      created_at: postDate,
      edited_at: postDate,
    };

    const { rerender } = render(<PostItem post={updatedPost} />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByText(/Last update/i)).toBeInTheDocument();

    rerender(<PostItem post={notEditedPost} />, {
      wrapper: MemoryRouter,
    });
    expect(screen.queryByText(/Last update/i)).not.toBeInTheDocument();
  });

  it("display post state if published or not", () => {
    const publishedPost = {
      ...mockPost,
      is_published: true,
    };
    const unpublishedPost = {
      ...mockPost,
      is_published: false,
    };

    const { rerender } = render(<PostItem post={publishedPost} />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByText(/published/i)).toBeInTheDocument();
    expect(screen.queryByText(/unpublished/i)).not.toBeInTheDocument();

    rerender(<PostItem post={unpublishedPost} />, {
      wrapper: MemoryRouter,
    });
    expect(screen.queryByText(/^published/i)).not.toBeInTheDocument();
    expect(screen.getByText(/unpublished/i)).toBeInTheDocument();
  });
});
