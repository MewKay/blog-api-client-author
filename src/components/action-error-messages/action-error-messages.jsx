import PropTypes from "prop-types";

const ActionErrorMessages = ({ actionData }) => {
  return (
    <>
      {actionData && (
        <ul>
          {Array.isArray(actionData.error) ? (
            actionData.error.map((errorMessage, index) => (
              <li key={index}>{errorMessage}</li>
            ))
          ) : (
            <li>{actionData.error}</li>
          )}
        </ul>
      )}
    </>
  );
};

ActionErrorMessages.propTypes = {
  actionData: PropTypes.object,
};

export default ActionErrorMessages;
