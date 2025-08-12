import validator from "validator";
import ranges from "./validationRanges";
import validateSchema, { invalidLengthMessage } from "@/lib/validateSchema";

const loginSchema = validateSchema({
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
});

export default loginSchema;
