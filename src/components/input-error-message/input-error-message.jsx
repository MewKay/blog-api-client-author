import PropTypes from "prop-types";
import styles from "./input-error-message.module.css";
import { useEffect, useState } from "react";

const messageFadeInDuration = 300;

const InputErrorMessage = ({ value, errorMessage }) => {
  const [visibleMessage, setVisibleMessage] = useState(errorMessage);

  const isInputValid = !errorMessage;
  const isErrorMessageVisible = value !== "" && errorMessage;
  const className = isErrorMessageVisible
    ? styles.errorMessage
    : `${styles.errorMessage} ${styles.hidden}`;

  useEffect(() => {
    if (isInputValid) {
      // Delay visible message removal to let it finish its animation
      setTimeout(() => {
        setVisibleMessage(null);
      }, messageFadeInDuration);
    } else {
      setVisibleMessage(errorMessage);
    }
  }, [errorMessage, isInputValid]);

  return <p className={className}>{visibleMessage}</p>;
};

InputErrorMessage.propTypes = {
  value: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default InputErrorMessage;
