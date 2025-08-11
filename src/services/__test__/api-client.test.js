import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import api from "../api-client";
import APIError from "@/lib/errors/api.error";
import BadRequestError from "@/lib/errors/bad-request.error";
import AuthError from "@/lib/errors/auth.error";
import NotFoundError from "@/lib/errors/not-found.error";
import ServerError from "@/lib/errors/server.error";
import NetworkError from "@/lib/errors/network.error";
import ForbiddenError from "@/lib/errors/forbidden.error";

const fetchedData = { data: "This is some data" };
const testBody = { data: "Test body" };
const mockToken = "NotARealToken";

describe("API Client", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("On OK response", () => {
    it.each([
      {
        verb: "get",
        apiCall: () => api.get("/test"),
        expectedRequestOptions: expect.objectContaining({
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
        }),
      },
      {
        verb: "post",
        apiCall: () => api.post("/test", testBody),
        expectedRequestOptions: expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(testBody),
        }),
      },
      {
        verb: "put",
        apiCall: () => api.put("/test", testBody),
        expectedRequestOptions: expect.objectContaining({
          method: "PUT",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(testBody),
        }),
      },
      {
        verb: "delete",
        apiCall: () => api.delete("/test"),
        expectedRequestOptions: expect.objectContaining({
          method: "DELETE",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
        }),
      },
    ])(
      "calls fetch on $verb request",
      async ({ apiCall, expectedRequestOptions }) => {
        fetch.mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(fetchedData),
        });

        const result = await apiCall();

        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining("/test"),
          expectedRequestOptions,
        );

        expect(result).toBe(fetchedData);
      },
    );
  });

  describe("With authentication token", () => {
    it.each([
      {
        verb: "get",
        apiCall: () => api.get("/test", mockToken),
      },
      {
        verb: "post",
        apiCall: () => api.post("/test", testBody, mockToken),
      },
      {
        verb: "put",
        apiCall: () => api.put("/test", testBody, mockToken),
      },
      {
        verb: "delete",
        apiCall: () => api.delete("/test", mockToken),
      },
    ])(
      "calls fetch on $verb request with the proper auth header",
      async ({ apiCall }) => {
        fetch.mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(fetchedData),
        });

        await apiCall();

        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining("/test"),
          expect.objectContaining({
            headers: expect.objectContaining({
              Authorization: `Bearer ${mockToken}`,
            }),
          }),
        );
      },
    );
  });

  describe("Response failure", () => {
    it.each([
      {
        name: "Bad request",
        error: BadRequestError,
        responseStatus: 400,
      },
      {
        name: "Unauthorized",
        error: AuthError,
        responseStatus: 401,
      },
      {
        name: "Forbidden",
        error: ForbiddenError,
        responseStatus: 403,
      },
      {
        name: "Not found",
        error: NotFoundError,
        responseStatus: 404,
      },
      {
        name: "Server",
        error: ServerError,
        responseStatus: 500,
      },
      {
        name: "Unexpected",
        error: APIError,
        responseStatus: 456,
      },
    ])(
      "throws $name error on relevant status code",
      async ({ error, responseStatus }) => {
        fetch.mockResolvedValue({
          ok: false,
          json: () =>
            Promise.resolve({ error: "It have to be this way, failing." }),
          status: responseStatus,
        });

        await expect(api.get("/failed-test")).rejects.toThrowError(error);
      },
    );

    it("throws NetworkError when fetch fails", async () => {
      fetch.mockRejectedValue(new TypeError());

      await expect(api.get("/failed-test")).rejects.toThrowError(NetworkError);
    });
  });
});
