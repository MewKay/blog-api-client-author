import PropTypes from "prop-types";
import { forwardRef } from "react";
import styles from "./input.module.css";
import InputErrorMessage from "../input-error-message/input-error-message";

const Input = forwardRef(function Input(
  { children, className, value, setValue, errorMessage, ...inputProps },
  ref,
) {
  const containerClassName = className
    ? `${styles.inputContainer} ${className}`
    : styles.inputContainer;
  const isInputControlled = value !== null && setValue;

  return (
    <div className={containerClassName}>
      <label className={styles.inputLabelContainer}>
        {children}
        <input
          className={styles.inputText}
          value={isInputControlled ? value : undefined}
          onChange={
            isInputControlled
              ? (event) => setValue(event.target.value)
              : undefined
          }
          defaultValue={!isInputControlled ? value : undefined}
          {...inputProps}
          ref={ref}
        />
      </label>
      <InputErrorMessage value={value} errorMessage={errorMessage} />
    </div>
  );
});

Input.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default Input;
