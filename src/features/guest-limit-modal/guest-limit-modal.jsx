import { useEffect } from "react";
import authService from "@/services/auth.service";
import Modal from "@/components/modal/modal";
import PropTypes from "prop-types";

const GuestLimitModal = ({ user, isOpen, onVisibilityChange }) => {
  const { is_guest: isUserGuest, hasGuestSignedBefore } = user;

  useEffect(() => {
    if (isUserGuest && !hasGuestSignedBefore) {
      onVisibilityChange(true);
    }
  }, [isUserGuest, hasGuestSignedBefore, onVisibilityChange]);

  const handleCloseModal = () => {
    onVisibilityChange(false);
    authService.markGuestSigned();
  };

  return (
    <Modal
      title="Welcome — Your are in Guest Mode"
      onClose={handleCloseModal}
      isOpen={isOpen}
    >
      You’re in <strong>Guest Mode</strong>
      so you can quickly test the app. Guest users are limited to{" "}
      <strong>five posts total</strong>. This temporary account expires in{" "}
      <strong>seven days</strong> or the moment you log out, and posts created
      here are only associated with the guest session, they are not
      transferable. If you’d like a permanent place for your writing, create an
      author account and your future posts will be saved.
    </Modal>
  );
};

GuestLimitModal.propTypes = {
  user: PropTypes.shape({
    is_guest: PropTypes.bool.isRequired,
    hasGuestSignedBefore: PropTypes.bool.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onVisibilityChange: PropTypes.func.isRequired,
};

export default GuestLimitModal;
