import { X } from "lucide-react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import dialogPolyfill from "dialog-polyfill";
import styles from "./modal.module.css";

const Modal = ({ title, children, onClose, onConfirm, isOpen = false }) => {
  const container = useRef(null);
  const modalRef = useRef(null);

  if (container.current == null) {
    container.current = document.createElement("div");
  }

  // Create node outside the react dom
  useEffect(() => {
    document.body.appendChild(container.current);
    return () => container.current.remove();
  }, []);

  // Older browser and jsdom support
  useEffect(() => {
    if (!modalRef.current) {
      return;
    }

    dialogPolyfill.registerDialog(modalRef.current);
  });

  useEffect(() => {
    const { current } = modalRef;

    if (!current) {
      return;
    }

    if (isOpen) {
      current.showModal();
    }

    return () => {
      try {
        current.close();
      } catch {
        current.removeAttribute("open");
      }
    };
  }, [isOpen]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }

    modalRef.current?.close();
  };

  const handleConfirm = () => {
    onConfirm();
    modalRef.current?.close();
  };

  return createPortal(
    <dialog ref={modalRef} aria-labelledby="modal-title" onClick={handleClose}>
      <div
        className={styles.modalContainer}
        data-testid="modal-container"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h3 id="modal-title">{title}</h3>
          <button type="button" onClick={handleClose} aria-label="Close">
            <X />
          </button>
        </div>
        <section>{children}</section>
        {!onConfirm ? null : (
          <div className={styles.buttonContainer}>
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={handleClose}>Cancel</button>
          </div>
        )}
      </div>
    </dialog>,
    container.current,
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default Modal;
