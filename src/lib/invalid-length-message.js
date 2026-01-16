import validator from "validator";
import ranges from "./validation/ranges";

const getCharactersCount = (string) => {
  return [...string].length;
};

const invalidLengthWithCountMessage = (field, value) => {
  if (!ranges[field]) {
    throw new Error("Provided field is not in ranges list");
  }

  const isValueValid = validator.isLength(value, ranges[field]);

  if (isValueValid) {
    return null;
  }

  return `Please enter between ${ranges[field].min} and ${ranges[field].max} characters. Your input is ${getCharactersCount(value)} characters long.`;
};

const invalidLengthMessage = (fieldname, range) => {
  return `${fieldname} is required to be between ${range.min} and ${range.max} characters.`;
};

export { invalidLengthMessage, invalidLengthWithCountMessage };
