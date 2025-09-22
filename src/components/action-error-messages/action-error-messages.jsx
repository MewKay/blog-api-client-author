import PropTypes from "prop-types";
import styles from "./action-error-message.module.css";
import { AlertCircle } from "lucide-react";

const ActionErrorMessages = ({ actionData }) => {
  return (
    <>
      {actionData && (
        <div className={styles.errorContainer} role="alert">
          <AlertCircle />
          <ul className={styles.errorList}>
            {Array.isArray(actionData.error) ? (
              actionData.error.map((errorMessage, index) => (
                <li key={index}>{errorMessage}</li>
              ))
            ) : (
              <li>{actionData.error}</li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

ActionErrorMessages.propTypes = {
  actionData: PropTypes.object,
};

export default ActionErrorMessages;
