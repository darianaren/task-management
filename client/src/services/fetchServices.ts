import { getCookie } from "@/utils/cookies";

const cookieName = process.env.NEXT_PUBLIC_TOKEN_NAME || "userToken";

/**
 * A utility function to make HTTP requests using the Fetch API with custom configurations.
 * @function fetchService
 * @param {string} method - The HTTP method (GET, POST, PUT, PATCH, DELETE) to use for the request.
 * @returns {Function} - Returns an async function to execute the HTTP request with the specified method.
 *
 * @param {Object} options - An object containing the endpoint, body, and headers for the request.
 * @param {string} options.endpoint - The URL of the endpoint to request. This field is required.
 * @param {Record<string, any>} [options.body=null] - The data to send with the request, applicable for POST, PUT, PATCH, DELETE methods.
 * @param {Record<string, string>} [options.headers={}] - Any custom headers to include in the request. Defaults to an empty object.
 *
 * @throws {Error} Will throw an error if the endpoint is missing or if the request fails.
 *
 * @returns {Promise<T>} - A promise that resolves to the parsed JSON data from the response.
 */
const fetchService =
  <T>(method: string) =>
  async ({
    ctx,
    body,
    endpoint,
    headers = {}
  }: {
    ctx?: object;
    headers?: object;
    endpoint: string;
    body?: object | undefined;
  }): Promise<T> => {
    if (!endpoint) {
      throw new Error("Missing endpoint in the request");
    }

    const userToken = getCookie(cookieName, ctx);

    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
        ...headers
      }
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(endpoint, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error in the request");
    }

    return data;
  };

/**
 * Collection of HTTP methods with pre-configured fetchService.
 */
export const fetchServices = {
  get: fetchService("GET"),
  post: fetchService("POST"),
  put: fetchService("PUT"),
  patch: fetchService("PATCH"),
  remove: fetchService("DELETE")
};
