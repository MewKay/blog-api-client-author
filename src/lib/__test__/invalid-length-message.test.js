import { describe, expect, it } from "vitest";
import { invalidLengthWithCountMessage } from "../invalid-length-message";

describe("invalidLengthWithCountMessage utility", () => {
  it("returns null if value if wihtin its range", () => {
    const result = invalidLengthWithCountMessage(
      "postText",
      "Good range value",
    );

    expect(result).toBeNull();
  });

  it("return an error message if the value valid range is exceeded with the value characters count", () => {
    const value = "One";
    const result = invalidLengthWithCountMessage("username", value);

    expect(result).toContain(`${[...value].length}`);
  });

  it("throws if provided field is not valid", () => {
    const result = () =>
      invalidLengthWithCountMessage("notAField", "I won't be tested anyway");

    expect(result).toThrow();
  });

  it("throws if value is not a string", () => {
    const result1 = () => invalidLengthWithCountMessage("username", 7);
    const result2 = () =>
      invalidLengthWithCountMessage("username", { an: "object" });

    [result1, result2].forEach((result) => expect(result).toThrow());
  });
});
