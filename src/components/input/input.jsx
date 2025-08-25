import PropTypes from "prop-types";
import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { children, value, setValue, errorMessage, ...inputProps },
  ref,
) {
  const isValueNotEmpty = value !== "";

  return (
    <div>
      <label>
        {children}
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          {...inputProps}
          ref={ref}
        />
      </label>
      <p>{isValueNotEmpty && errorMessage}</p>
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
