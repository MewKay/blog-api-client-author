import APIError from "@/lib/errors/api.error";
import AuthError from "@/lib/errors/auth.error";
import BadRequestError from "@/lib/errors/bad-request.error";
import ForbiddenError from "@/lib/errors/forbidden.error";
import NetworkError from "@/lib/errors/network.error";
import NotFoundError from "@/lib/errors/not-found.error";
import ServerError from "@/lib/errors/server.error";

const BASE_URL = import.meta.env.VITE_APP_API_URL;

const request = async function fetchDataFromAPIWithHeaders(
  endpoint,
  options = {},
  authToken = undefined,
) {
  const apiUrl = `${BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const config = {
    headers,
    mode: "cors",
    ...options,
  };

  try {
    const response = await fetch(apiUrl, config);

    if (!response.ok) {
      const data = await response.json();

      switch (response.status) {
        case 400:
          throw new BadRequestError("Client error", data);
        case 401:
          throw new AuthError(data);
        case 403:
          throw new ForbiddenError(data);
        case 404:
          throw new NotFoundError(data);
        case 500:
          throw new ServerError(data);
        default:
          throw new APIError("Unexpected error", response.status, data);
      }
    }

    return response.json();
  } catch (error) {
    if (error.name === "TypeError" && !error.response) {
      throw new NetworkError("Failed to connect to server");
    }

    throw error;
  }
};

const api = {
  get: (endpoint, authToken = undefined) => request(endpoint, {}, authToken),
  post: (endpoint, body, authToken = undefined) =>
    request(
      endpoint,
      { method: "POST", body: JSON.stringify(body) },
      authToken,
    ),
  put: (endpoint, body, authToken = undefined) =>
    request(endpoint, { method: "PUT", body: JSON.stringify(body) }, authToken),
  delete: (endpoint, authToken = undefined) =>
    request(endpoint, { method: "DELETE" }, authToken),
};

export default api;
