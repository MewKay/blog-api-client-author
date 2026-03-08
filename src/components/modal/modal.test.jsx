import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Modal from "./modal";
import userEvent from "@testing-library/user-event";

const setup = (props = {}) => {
  const componentProps = {
    title: "My Modal",
    isOpen: true,
    onConfirm: () => {},
    onClose: () => {},
    ...props,
  };

  const componentToBeRendered = (props) => {
    return <Modal {...props}>This is modal</Modal>;
  };
  const user = userEvent.setup();
  const component = render(componentToBeRendered(componentProps));
  const backdrop = screen.getByRole("dialog", { hidden: true });
  const modalContainer = screen.getByTestId("modal-container");
  const closeButton = screen.getByRole("button", {
    name: "Close",
    hidden: true,
  });
  const confirmButton = screen.getByRole("button", {
    name: "Confirm",
    hidden: true,
  });
  const cancelButton = screen.getByRole("button", {
    name: "Cancel",
    hidden: true,
  });

  return {
    component,
    user,
    backdrop,
    modalContainer,
    closeButton,
    confirmButton,
    cancelButton,
    rerender: (props = {}) =>
      component.rerender(
        componentToBeRendered({ ...componentProps, ...props }),
      ),
  };
};

describe("Modal component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    const { component } = setup();
    expect(component.container).toMatchSnapshot();
  });

  it("does not render when 'isOpen' prop is 'false'", () => {
    const { modalContainer, rerender } = setup({ isOpen: true });
    expect(modalContainer).toBeVisible();

    rerender({ isOpen: false });
    expect(modalContainer).not.toBeVisible();
  });

  describe("'onConfirm' prop", () => {
    it("calls 'onConfirm' prop and close modal when Confirm button is clicked", async () => {
      const mockOnConfirm = vi.fn();
      const { user, modalContainer, confirmButton } = setup({
        onConfirm: mockOnConfirm,
      });

      await user.click(confirmButton);

      expect(mockOnConfirm).toHaveBeenCalledOnce();
      expect(modalContainer).not.toBeVisible();
    });

    it("hides confirm button if onConfirm function is not provided", async () => {
      // Render with 'onConfirm' provided first so that confirmButton is query-able
      const { confirmButton, rerender } = setup();

      rerender({ onConfirm: null });
      expect(confirmButton).not.toBeInTheDocument();
    });
  });

  describe("'onClose' prop provided, calls it when", () => {
    const mockOnClose = vi.fn();

    it("is clicked on backdrop but not on modal click", async () => {
      const { user, modalContainer, backdrop } = setup({
        onClose: mockOnClose,
        isOpen: true,
      });

      await user.click(modalContainer);
      expect(mockOnClose).not.toHaveBeenCalled();

      await user.click(backdrop);
      expect(mockOnClose).toHaveBeenCalledOnce();
    });

    it("is clicked on close button", async () => {
      const { user, closeButton } = setup({
        onClose: mockOnClose,
        isOpen: true,
      });

      await user.click(closeButton);
      expect(mockOnClose).toHaveBeenCalledOnce();
    });

    it("is clicked on cancel button", async () => {
      const { user, cancelButton } = setup({
        onClose: mockOnClose,
        isOpen: true,
      });

      await user.click(cancelButton);
      expect(mockOnClose).toHaveBeenCalledOnce();
    });
  });

  describe("'onClose' prop not provided, it removes the modal when", () => {
    it("is clicked on backdrop but not on modal click", async () => {
      const { user, modalContainer, backdrop } = setup({ isOpen: true });

      await user.click(modalContainer);
      expect(modalContainer).toBeVisible();

      await user.click(backdrop);
      expect(modalContainer).not.toBeVisible();
    });

    it("is clicked on close button", async () => {
      const { user, modalContainer, closeButton } = setup({ isOpen: true });

      await user.click(closeButton);
      expect(modalContainer).not.toBeVisible();
    });

    it("is clicked on cancel button", async () => {
      const { user, modalContainer, cancelButton } = setup({ isOpen: true });

      await user.click(cancelButton);
      expect(modalContainer).not.toBeVisible();
    });
  });
});
