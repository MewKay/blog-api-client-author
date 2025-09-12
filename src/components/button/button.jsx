import PropTypes from "prop-types";
import styles from "./button.module.css";

const Button = ({ children, colorScheme, ...buttonProps }) => {
  const className =
    colorScheme === "light"
      ? styles.lightButton
      : colorScheme === "dark"
        ? styles.darkButton
        : styles.lightButton;

  return (
    <button className={className} {...buttonProps}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  colorScheme: PropTypes.string,
};

export default Button;
