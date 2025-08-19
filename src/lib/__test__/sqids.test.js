import { describe, it, expect } from "vitest";
import sqids from "../sqids";
import Sqids from "sqids";
import BadRequestError from "../errors/bad-request.error";

describe("sqids wrapper", () => {
  it("throws BadRequestError if encodedId length is different than eight", () => {
    expect(() => sqids.decode("short")).toThrow(BadRequestError);
    expect(() => sqids.decode("verylong1dthisis")).toThrow(BadRequestError);
  });

  it("throws BadRequestError if encodedId decoded to more than one number", () => {
    const encodedTestId = new Sqids({
      alphabet: import.meta.env.VITE_SQIDS_ALPHABET,
      minLength: 8,
    }).encode([1, 2, 3]);

    expect(() => sqids.decode(encodedTestId)).toThrow(BadRequestError);
  });

  it("throws BadRequestError if encodedId is not canonical", () => {
    const encodedTestId = sqids.encode(6);
    const nonCanonicalId = encodedTestId.replace(encodedTestId.charAt(-1), "0");

    expect(() => sqids.decode(nonCanonicalId)).toThrow(BadRequestError);
  });
});
