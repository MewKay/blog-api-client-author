import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import authService from "../auth.service";
import api from "../api-client";
import mockAuthor from "@/testing/mocks/author";
import decodeTokenToUser from "@/lib/decodeTokenToUser";

vi.mock("@/lib/decodeTokenToUser.js", () => ({
  default: vi.fn(),
}));

const mockToken = "ThisIsSomeToken";
const mockCredentials = {
  username: mockAuthor.username,
  password: "wordpass",
};

const mockLocalStorage = (() => {
  let storage = {};

  const getItem = (key) => storage[key] || null;

  const setItem = (key, item) => {
    storage[key] = item;
  };

  const removeItem = (key) => {
    delete storage[key];
  };

  const clear = () => {
    storage = {};
  };

  return {
    getItem,
    setItem,
    removeItem,
    clear,
  };
})();
let originalLocalStorage;

describe("Auth service", () => {
  beforeAll(() => {
    originalLocalStorage = window.localStorage;
    window.localStorage = mockLocalStorage;
  });

  afterAll(() => {
    window.localStorage = originalLocalStorage;
  });

  it("stores token to localStorage on login", async () => {
    api.post = vi
      .fn()
      .mockResolvedValue({ user: mockAuthor, token: mockToken });

    await authService.login(mockCredentials);
    const tokenResult = localStorage.getItem("token");
    expect(tokenResult).toBe(mockToken);
  });

  it("stores token and first time signing guest flag to localStorage on guest sign", async () => {
    api.post = vi
      .fn()
      .mockResolvedValue({ user: mockAuthor, token: mockToken });

    await authService.signGuest();
    const tokenResult = localStorage.getItem("token");
    const signingGuestFlag = localStorage.getItem("guest_sign_before");
    expect(tokenResult).toBe(mockToken);
    expect(signingGuestFlag).toBe("false");
  });

  it("removes token from localStorage on logout", () => {
    localStorage.setItem("token", mockToken);

    authService.logout();

    const tokenResult = localStorage.getItem("token");

    expect(tokenResult).toBeNull();
  });

  it("marks first time guest flag as true on markGuestSigned", () => {
    authService.markGuestSigned();

    const firstTimeGuestFlag = localStorage.getItem("guest_sign_before");
    expect(firstTimeGuestFlag).toBe("true");
  });

  it("returns user data and token from localstorage on getAuthData", () => {
    decodeTokenToUser.mockReturnValue(mockAuthor);
    localStorage.setItem("token", mockToken);
    localStorage.setItem("guest_sign_before", "true");

    const result = authService.getAuthData();

    expect(result).toEqual({
      user: { ...mockAuthor, hasGuestSignedBefore: expect.any(Boolean) },
      token: mockToken,
    });
  });

  it("returns falsy and remove token from localStorage on invalid token on getAuthData", () => {
    decodeTokenToUser.mockReturnValue(null);

    const result = authService.getAuthData();

    const tokenResult = localStorage.getItem("token");

    expect(result).toBeFalsy();
    expect(tokenResult).toBeNull();
  });

  it("triggers a storage event on login, logout and signGuest", async () => {
    const eventListener = vi.fn();
    window.addEventListener("storage", eventListener);

    await authService.login(mockCredentials);

    expect(eventListener).toHaveBeenCalledOnce();

    authService.logout();

    expect(eventListener).toHaveBeenCalledTimes(2);

    await authService.signGuest();

    expect(eventListener).toHaveBeenCalledTimes(3);

    window.removeEventListener("storage", eventListener);
  });
});
