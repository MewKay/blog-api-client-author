import PropTypes from "prop-types";
import styles from "./button.module.css";

const Button = ({ children, colorScheme, className, ...buttonProps }) => {
  const buttonClassName = `
    ${
      colorScheme === "light"
        ? styles.lightButton
        : colorScheme === "dark"
          ? styles.darkButton
          : styles.lightButton
    } ${className}
  `;

  return (
    <button className={buttonClassName} {...buttonProps}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  colorScheme: PropTypes.string,
};

export default Button;
