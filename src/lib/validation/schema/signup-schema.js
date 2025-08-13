import validateSchema, { invalidLengthMessage } from "@/lib/validate-schema";
import validator from "validator";
import ranges from "../ranges";

const signUpSchema = validateSchema({
  username: [
    {
      pattern: (value) => validator.isLength(value, ranges.username),
      message: invalidLengthMessage("Username", ranges.username),
    },
    {
      pattern: (value) => validator.isAlphanumeric(value),
      message: "Username can only contain letters and numbers.",
    },
  ],
  password: [
    {
      pattern: (value) => validator.isLength(value, ranges.password),
      message: invalidLengthMessage("Password", ranges.password),
    },
  ],
  confirm_password: [
    {
      pattern: (value) => validator.isLength(value, ranges.password),
      message: invalidLengthMessage("Password", ranges.password),
    },
    {
      pattern: (value, inputs) => value === inputs.password,
      message: "Passwords are not matching.",
    },
  ],
  author_password: [
    {
      pattern: (value) => !validator.isEmpty(value),
      message: "Authorization Pass is required.",
    },
  ],
});

export default signUpSchema;
