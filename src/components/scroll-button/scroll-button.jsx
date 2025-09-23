import { ChevronUp } from "lucide-react";
import PropTypes from "prop-types";
import styles from "./scroll-button.module.css";

const ScrollButton = ({ isVisible }) => {
  const className = isVisible
    ? styles.button
    : `${styles.button} ${styles.hidden}`;

  const handleScrollUp = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button className={className} onClick={handleScrollUp}>
      <ChevronUp />
    </button>
  );
};

ScrollButton.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default ScrollButton;
