import { describe, expect, it } from "vitest";
import validateSchema, { invalidLengthMessage } from "../validateSchema";
import validator from "validator";

const usernameRange = { min: 5, max: 10 };
const schema = {
  username: [
    {
      pattern: (value) => validator.isLength(value, usernameRange),
      message: invalidLengthMessage("Username", usernameRange),
    },
    {
      pattern: (value) => validator.isAlpha(value),
      message: "Only letters",
    },
  ],
  email: [
    {
      pattern: (value) => validator.isEmail(value),
      message: "Invalid email",
    },
  ],
};

describe("validateSchema", () => {
  it("returns list of invalid inputs with their associated message", () => {
    const testSchema = validateSchema(schema);

    let result = testSchema.validateInputs({
      username: "12Jame",
      email: "not an email",
    });

    expect(result.errors.username).toBe("Only letters");
    expect(result.errors.email).toBe("Invalid email");

    result = testSchema.validateInputs({
      username: "Kim",
      email: "kim@mail.net",
    });

    expect(result.errors.username).toBe(
      invalidLengthMessage("Username", usernameRange),
    );
    expect(result.errors.email).toBeFalsy();

    result = testSchema.validateInputs({
      username: "James",
      email: "jim@mail.net",
    });

    expect(result.errors.username).toBeFalsy();
    expect(result.errors.email).toBeFalsy();
  });

  it("returns boolean depend if inputs are all valid or at least one is invalid", () => {
    const testSchema = validateSchema(schema);

    let result = testSchema.validateInputs({
      username: "/NotNickname",
      email: "unknown@nowhere.no",
    });

    expect(result.isFormValid).toBeFalsy();

    result = testSchema.validateInputs({
      username: "Nickname",
      email: "unknown@nowhere.no",
    });

    expect(result.isFormValid).toBeTruthy();
  });

  describe("Error handling", () => {
    it("throws on invalid schema", () => {
      const schemas = [undefined, null, "yup", 23];

      schemas.forEach((schema) => {
        expect(() => validateSchema(schema)).toThrow();
      });
    });

    it("returns empty object on empty schema", () => {
      const schema = {};

      expect(validateSchema(schema)).toEqual({});
    });

    it("throws on missing constraint fields", () => {
      const schema = {
        username: [
          {
            nope: 0,
            ["0"]: "nope",
          },
        ],
      };

      expect(() => validateSchema(schema)).toThrow();
    });

    it("validate form by default for inputs missing in schema", () => {
      const testSchema = validateSchema(schema);
      const result = testSchema.validateInputs({
        lastName: "Jones",
        password: "bipboop",
      });

      expect(result.errors).toEqual({
        lastName: null,
        password: null,
      });
      expect(result.isFormValid).toBeTruthy();
    });
  });
});
