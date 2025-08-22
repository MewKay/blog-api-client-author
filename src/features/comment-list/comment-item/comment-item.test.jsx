import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import CommentItem from "./comment-item";
import mockComments from "@/testing/mocks/comments";

const mockComment = mockComments[0];

describe("CommentItem component", () => {
  it("renders correctly", () => {
    const { container } = render(<CommentItem comment={mockComment} />);

    expect(container).toMatchSnapshot();
  });

  it("shows 'edited' if creation and edition dates differ", () => {
    const editedMock = {
      ...mockComment,
      edited_at: new Date(2017, 11, 24).toISOString(),
    };

    render(<CommentItem comment={editedMock} />);

    const editedText = screen.getByText(/edited/i);

    expect(editedText).toBeInTheDocument();
  });
});
