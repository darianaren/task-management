/**
 * Retrieve an item from local storage by key.
 *
 * @param {string} key - The key to retrieve the item.
 * @param {T} initialValue - The initial value if the key does not exist.
 *
 * @returns {{ value: T; expired: boolean } | undefined} The retrieved item from local storage with additional metadata (e.g., expiration status), or undefined if not in a browser environment.
 */
export const getItem = <T>(
  key: string,
  initialValue: T
): { value: T; expired: boolean } | undefined => {
  if (typeof window === "undefined") return undefined;

  const item = localStorage.getItem(key);

  const parsedItem = item ? JSON.parse(item) : initialValue;

  const expired = parsedItem?.timestamp
    ? new Date().getTime() > parsedItem.timestamp
    : false;

  return { value: parsedItem, expired };
};

/**
 * Set an item in local storage with optional service life (expiration).
 *
 * @param {string} key - The key under which to store the item.
 * @param {T} data - The data to store in local storage.
 * @param {number} [serviceLife] - The optional service life (in milliseconds) for the item.
 */
export const setItem = <T>(
  key: string,
  data: T,
  serviceLife?: number
): void => {
  const timestamp = serviceLife
    ? new Date().getTime() + serviceLife
    : undefined;

  localStorage.setItem(key, JSON.stringify({ ...data, timestamp }));
};

/**
 * Remove an item from local storage by key.
 *
 * @param {string} key - The key of the item to remove from local storage.
 */
export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};
