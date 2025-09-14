import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CommentList from "./comment-list";
import itemStyles from "./comment-item/comment-item.module.css";
import mockComments from "@/testing/mocks/comments";
import userEvent from "@testing-library/user-event";

vi.mock("@/components/delete-comment-button/delete-comment-button.jsx", () => ({
  default: () => <button>Delete comment</button>,
}));

const activeClass = itemStyles.active;

describe("CommentList component", () => {
  it("gives active class only to clicked element", async () => {
    const user = userEvent.setup();
    render(<CommentList comments={mockComments} />);

    const comments = screen.getAllByRole("listitem");

    let activeComment = comments.pop();
    await user.click(activeComment);

    expect(activeComment).toHaveClass(activeClass);
    comments.forEach((comment) => expect(comment).not.toHaveClass(activeClass));

    comments.push(activeComment);
    activeComment = comments.shift();
    await user.click(activeComment);

    expect(activeComment).toHaveClass(activeClass);
    comments.forEach((comment) => expect(comment).not.toHaveClass(activeClass));
  });

  it("toggles active class on clicked element", async () => {
    const user = userEvent.setup();
    render(<CommentList comments={mockComments} />);

    const comment = screen.getAllByRole("listitem")[1];

    await user.click(comment);
    expect(comment).toHaveClass(activeClass);

    await user.click(comment);
    expect(comment).not.toHaveClass(activeClass);

    await user.click(comment);
    expect(comment).toHaveClass(activeClass);
  });
});
