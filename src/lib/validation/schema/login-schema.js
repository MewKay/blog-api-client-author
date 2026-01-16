import validator from "validator";
import validateSchema from "@/lib/validate-schema";
import { invalidLengthMessage } from "@/lib/invalid-length-message";
import ranges from "../ranges";

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
