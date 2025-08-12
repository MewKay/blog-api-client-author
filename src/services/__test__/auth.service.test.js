import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import authService from "../auth.service";
import api from "../api-client";
import mockAuthor from "@/testing/mocks/author";

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

  it("stores user and token to localStorage on login", async () => {
    api.post = vi
      .fn()
      .mockResolvedValue({ user: mockAuthor, token: mockToken });

    await authService.login(mockCredentials);

    const userResult = JSON.parse(localStorage.getItem("user"));
    const tokenResult = localStorage.getItem("token");

    expect(userResult).toEqual(mockAuthor);
    expect(tokenResult).toBe(mockToken);
  });

  it("removes user and token from localStorage on logout", () => {
    localStorage.setItem("user", JSON.stringify(mockAuthor));
    localStorage.setItem("token", mockToken);

    authService.logout();

    const userResult = localStorage.getItem("user");
    const tokenResult = localStorage.getItem("token");

    expect(userResult).toBeNull();
    expect(tokenResult).toBeNull();
  });

  it("returns user data from localstorage on getUser", () => {
    localStorage.setItem("user", JSON.stringify(mockAuthor));

    const result = authService.getUser();

    expect(result).toEqual(mockAuthor);
  });

  it("triggers a storage event on login and logout", async () => {
    let updateCount = 0;
    const eventListener = () => updateCount++;
    window.addEventListener("storage", eventListener);

    await authService.login(mockCredentials);

    expect(updateCount).toBe(1);

    authService.logout();

    expect(updateCount).toBe(2);

    window.removeEventListener("storage", eventListener);
  });
});
