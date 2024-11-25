export type QueryStringParams = {
  page?: number;
  title?: string;
  label?: string[];
  status?: string[];
  dueDate?: string;
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
};

/**
 * Generates a query string based on the provided filters.
 *
 * @param {QueryStringParams} params - The filters for the query string.
 * @param {number} [params.page=1] - The page number.
 * @param {string} [params.title=""] - The title to filter by.
 * @param {string[]} [params.label=[]] - An array of labels to filter by.
 * @param {string[]} [params.status=[]] - An array of statuses to filter by.
 * @param {string} [params.dueDate=""] - The due date to filter by.
 * @param {string} [params.orderBy="createdAt"] - The field to order by.
 * @param {"ASC" | "DESC"} [params.orderDirection="DESC"] - The direction to order the results.
 * @returns {string} A properly formatted query string.
 */
export const createQueryString = ({
  page = 1,
  title = "",
  label = [],
  status = [],
  dueDate = "",
  orderBy = "createdAt",
  orderDirection = "DESC"
}: QueryStringParams): string => {
  const filters: Record<string, string | number> = {
    page,
    orderBy,
    orderDirection
  };

  if (title) filters.title = title;
  if (dueDate) filters.dueDate = dueDate;
  if (label.length) filters.label = label.join(",");
  if (status.length) filters.status = status.join(",");

  const queryString = Object.entries(filters)
    .filter(([, value]) => value != null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

  return queryString ? `?${queryString}` : "";
};
