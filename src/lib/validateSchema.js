export const invalidLengthMessage = (fieldname, range) => {
  return `${fieldname} is required to be between ${range.min} and ${range.max} characters.`;
};

const validateSchema = (schema) => {
  const isSchemaValidType = schema && typeof schema === "object";

  if (!isSchemaValidType) {
    throw new Error("Invalid Schema : Must be a non-null object");
  }

  const schemaKeys = Object.keys(schema);
  const isSchemaEmpty = schemaKeys.length <= 0;
  if (isSchemaEmpty) {
    return {};
  }

  schemaKeys.forEach((key) =>
    schema[key].forEach((constraint) => {
      const isConstraintStructureInvalid =
        !constraint.pattern || !constraint.message;

      if (isConstraintStructureInvalid) {
        throw new Error("Invalid Schema : Missing constraint fields");
      }
    }),
  );

  const validate = (formInput, constraints, inputs) => {
    const isInputMissinngInSchema = !constraints;
    if (isInputMissinngInSchema) {
      return null;
    }

    for (let constraint of constraints) {
      if (!constraint.pattern(formInput, inputs)) {
        return constraint.message;
      }
    }

    return null;
  };

  const validateInputs = (inputs) => {
    const errors = {};
    const inputNames = Object.keys(inputs);

    for (let inputName of inputNames) {
      errors[inputName] = validate(
        inputs[inputName],
        schema[inputName],
        inputs,
      );
    }

    const isFormValid = Object.values(errors).every((error) => !error);

    return { errors, isFormValid };
  };

  return {
    validateInputs,
  };
};

export default validateSchema;
