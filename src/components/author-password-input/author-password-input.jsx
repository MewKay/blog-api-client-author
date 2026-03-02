import Input from "../input/input";
import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./author-password-input.module.css";

const WRITER_PASS_LINK = import.meta.env.VITE_AUTHOR_PASS_LINK;

const AuthorPasswordInput = ({ value, setValue, errorMessage }) => {
  const [isAuthPassFocused, setIsAuthPassFocused] = useState(false);

  const handleAuthPassFocus = () => {
    setIsAuthPassFocused(true);
  };

  const handleAuthPassBlur = () => {
    setIsAuthPassFocused(false);
  };

  const authorPasswordLabelClassName = isAuthPassFocused
    ? `${styles.label} ${styles.focused}`
    : styles.label;
  const authorPasswordLinkClassName = isAuthPassFocused
    ? styles.link
    : `${styles.link} ${styles.hidden}`;

  return (
    <Input
      type="password"
      name="author_password"
      value={value}
      setValue={setValue}
      errorMessage={errorMessage}
      onFocus={handleAuthPassFocus}
      onBlur={handleAuthPassBlur}
      required
    >
      <p className={authorPasswordLabelClassName}>Authorization Pass</p>
      <p className={authorPasswordLinkClassName}>
        This field requires the writer password. Retrieve it{" "}
        <a href={WRITER_PASS_LINK} target="_blank" rel="noopener noreferrer">
          here
        </a>
        .
      </p>
    </Input>
  );
};

AuthorPasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default AuthorPasswordInput;
