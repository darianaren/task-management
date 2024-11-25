/**
 * Fetches data from the given URL using a dynamic import of the fetchServices module.
 *
 * @template T - The expected type of the response data.
 *
 * @param {string} url - The endpoint URL to fetch data from.
 *
 * @returns {Promise<T>} A promise that resolves with the fetched data of type `T`.
 */
export const fetcher = async <T>(url: string): Promise<T> => {
  const fetService = (await import("../services/fetchServices")).fetchServices;

  return fetService.get<T>({ endpoint: url });
};
