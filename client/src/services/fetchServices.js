/**
 * A utility function to make HTTP requests using the Fetch API with custom configurations.
 * @function fetchService
 * @param {string} method - The HTTP method (GET, POST, PUT, PATCH, DELETE) to use for the request.
 * @returns {Function} - Returns an async function to execute the HTTP request with the specified method.
 *
 * @param {Object} options - An object containing the endpoint, body, and headers for the request.
 * @param {string} options.endpoint - The URL of the endpoint to request. This field is required.
 * @param {Object} [options.body=null] - The data to send with the request, applicable for POST, PUT, PATCH, DELETE methods.
 * @param {Object} [options.headers={}] - Any custom headers to include in the request. Defaults to an empty object.
 *
 * @throws {Error} Will throw an error if the endpoint is missing or if the request fails.
 *
 * @returns {Promise<Object>} - A promise that resolves to the parsed JSON data from the response.
 */
const fetchService =
  (method) =>
  async ({ endpoint, body = null, headers = {} }) => {
    if (!endpoint) throw new Error("missing endpoint if the request");

    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
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

export const fetchServices = {
  get: fetchService("GET"),
  post: fetchService("POST"),
  put: fetchService("PUT"),
  patch: fetchService("PATCH"),
  remove: fetchService("DELETE")
};
