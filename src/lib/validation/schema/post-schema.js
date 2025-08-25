import validator from "validator";
import validateSchema, { invalidLengthMessage } from "@/lib/validate-schema";
import ranges from "../ranges";

const postSchema = validateSchema({
  title: [
    {
      pattern: (value) => validator.isLength(value, ranges.postTitle),
      message: invalidLengthMessage("Title", ranges.postTitle),
    },
  ],
  text: [
    {
      pattern: (value) => validator.isLength(value, ranges.postText),
      message: invalidLengthMessage("Post content", ranges.postText),
    },
  ],
});

export default postSchema;
