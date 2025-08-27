import { describe, expect, it } from "vitest";
import actionServiceHandler from "../actionServiceHandler";
import BadRequestError from "../errors/bad-request.error";
import AuthError from "../errors/auth.error";
import ForbiddenError from "../errors/forbidden.error";

describe("actionServiceHandler utility", () => {
  it("should execute callback if no error occured", async () => {
    const bar = "Everything went fine!";
    const foo = () => bar;

    const result = await actionServiceHandler(foo);

    expect(result).toBe(bar);
  });

  const response = { error: "Catch Me!" };
  it.each([
    {
      errorName: "BadRequestError",
      error: new BadRequestError("Please", response),
    },
    {
      errorName: "AuthError",
      error: new AuthError(response),
    },
    {
      errorName: "ForbiddenError",
      error: new ForbiddenError(response),
    },
  ])(
    "should catch $errorName occuring in the callback and return its response object",
    async ({ error }) => {
      const foo = () => {
        throw error;
      };

      const result = await actionServiceHandler(foo);

      expect(result).toEqual(response);
    },
  );

  it("should rethrow error otherwise", async () => {
    const message = "I was unexpected!";
    const foo = () => {
      throw new Error(message);
    };

    await expect(actionServiceHandler(foo)).rejects.toThrow(message);
  });
});
