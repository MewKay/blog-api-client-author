import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommentItem from "./comment-item";
import mockComments from "@/testing/mocks/comments";

vi.mock("@/components/delete-comment-button/delete-comment-button.jsx", () => ({
  default: () => <button>Delete comment</button>,
}));
const mockComment = mockComments[0];
const handleCommentClick = vi.fn();

const setup = (comment = mockComment) => {
  const user = userEvent.setup();
  const component = render(
    <CommentItem comment={comment} onClick={handleCommentClick} />,
  );
  const editedText = screen.queryByText(/edited/i);

  return {
    user,
    component,
    editedText,
  };
};

describe("CommentItem component", () => {
  it("renders correctly", () => {
    const { component } = setup();

    expect(component.container).toMatchSnapshot();
  });

  it("shows 'edited' if creation and edition dates differ", () => {
    const editedMock = {
      ...mockComment,
      edited_at: new Date(2017, 11, 24).toISOString(),
    };

    const { editedText } = setup(editedMock);

    expect(editedText).toBeInTheDocument();
  });

  it("calls onClick function when comment is clicked", async () => {
    const { user, component } = setup();
    await user.click(component.getByRole("listitem"));

    expect(handleCommentClick).toHaveBeenCalledOnce();
  });
});
