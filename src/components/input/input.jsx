import PropTypes from "prop-types";
import { forwardRef } from "react";
import styles from "./input.module.css";

const Input = forwardRef(function Input(
  { children, value, setValue, errorMessage, ...inputProps },
  ref,
) {
  const isErrorMessageVisible = value !== "" && errorMessage;

  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabelContainer}>
        {children}
        <input
          className={styles.inputText}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          {...inputProps}
          ref={ref}
        />
      </label>
      <p
        className={`${styles.errorMessage}${!isErrorMessageVisible ? " " + styles.hidden : ""}`}
      >
        {errorMessage}
      </p>
    </div>
  );
});

Input.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
  setValue: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default Input;
