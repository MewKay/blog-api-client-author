/**
 * @jest-environment node
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SignJWT } from "jose";
import mockAuthor from "@/testing/mocks/author";
import decodeTokenToUser from "../decodeTokenToUser";

const secret = new TextEncoder().encode("thisissecret");
const { hasGuestSignedBefore, ...userPayload } = mockAuthor; // eslint-disable-line no-unused-vars

const createToken = async (payload, expirationTime) => {
  const jwt = new SignJWT(payload);

  const token = await jwt
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expirationTime)
    .sign(secret);

  return token;
};

describe("decodeTokenToUser utility", () => {
  beforeEach(() => {
    vi.setSystemTime(new Date(2015, 5, 1));
  });

  it("returns null if token expired", async () => {
    const token = await createToken(userPayload, new Date(2015, 4, 1));

    expect(decodeTokenToUser(token)).toBeNull();
  });

  it("returns null if token invalid", async () => {
    const result = decodeTokenToUser(null);

    expect(result).toBeNull();
  });

  it("returns valid user data", async () => {
    const token = await createToken(userPayload, new Date(2015, 5, 10));
    const result = decodeTokenToUser(token);

    expect(result).toEqual(userPayload);
  });
});
