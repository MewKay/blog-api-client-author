import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GuestLimitModal from "./guest-limit-modal";
import mockAuthor from "@/testing/mocks/author";
import authService from "@/services/auth.service";

const setup = (userProp = mockAuthor, isOpen = true) => {
  const onVisibilityChange = vi.fn();
  const user = userEvent.setup();

  const component = render(
    <GuestLimitModal
      user={userProp}
      isOpen={isOpen}
      onVisibilityChange={onVisibilityChange}
    />,
  );
  const closeButton = screen.queryByRole("button", { name: "Close" });
  const modal = screen.queryByRole("dialog");

  return {
    user,
    component,
    closeButton,
    modal,
    onVisibilityChange,
    rerender: (userProp = mockAuthor, isOpen = true) =>
      component.rerender(
        <GuestLimitModal
          user={userProp}
          isOpen={isOpen}
          onVisibilityChange={onVisibilityChange}
        />,
      ),
  };
};

describe("GuestLimitModal components", () => {
  it("hides modal and the markGuestSigned service when closing", async () => {
    authService.markGuestSigned = vi.fn();
    const { user, onVisibilityChange, modal, closeButton } = setup();

    expect(modal).toBeVisible();
    await user.click(closeButton);

    expect(onVisibilityChange).toHaveBeenCalledWith(false);
    expect(modal).not.toBeVisible();
  });

  it("renders on mount if user is a guest and they have not signed in before", async () => {
    const { onVisibilityChange, rerender } = setup({
      ...mockAuthor,
      is_guest: false,
    });
    expect(onVisibilityChange).not.toHaveBeenCalled();

    rerender({ ...mockAuthor, is_guest: true, hasGuestSignedBefore: true });
    expect(onVisibilityChange).not.toHaveBeenCalled();

    rerender({ ...mockAuthor, is_guest: true, hasGuestSignedBefore: false });
    expect(onVisibilityChange).toHaveBeenCalledWith(true);
  });
});
