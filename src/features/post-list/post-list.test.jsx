import { describe, it, vi, expect } from "vitest";
import PostList from "./post-list";
import { render, screen } from "@testing-library/react";
import mockPosts from "@/testing/mocks/posts";

vi.mock("./no-post/no-post.jsx", () => ({
  default: () => <>There is no post</>,
}));
vi.mock("./post-item/post-item.jsx", () => ({
  default: ({ post }) => (
    <div>
      <p>{post.title}</p>
      <p>{post.preview}</p>
    </div>
  ),
}));

describe("Post list component", () => {
  it("renders no post if post list is empty", () => {
    render(<PostList posts={[]} />);

    const noPostMessage = screen.getByText("There is no post");
    expect(noPostMessage).toBeInTheDocument();
  });

  it("renders with passed posts", () => {
    render(<PostList posts={mockPosts} />);

    mockPosts.forEach((post) => {
      const postTitle = screen.getByText(post.title);
      const postPreview = screen.getByText(post.preview);

      expect(postTitle).toBeInTheDocument();
      expect(postPreview).toBeInTheDocument();
    });
  });
});
