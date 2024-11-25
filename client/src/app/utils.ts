import { ORDER_BY_OPTIONS_VALUE, STATUS_OPTIONS_VALUE } from "./constants";

export type QueryStringParams = {
  page?: number;
  title?: string;
  label?: string[];
  dueDate?: string;
  status?: Array<"Pendiente" | "En progreso" | "Completada">;
  orderBy?:
    | "Más antiguo"
    | "Más reciente"
    | "Entrega más cercana"
    | "Entrega más lejana";
};

type FiltersProps = {
  page?: number;
  title?: string;
  label?: string;
  status?: string;
  dueDate?: string;
  orderDirection?: "ASC" | "DESC";
  orderBy?: "createdAt" | "dueDate";
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
 * @param {string} [params.orderBy="Más reciente"] - The field to order by.
 * @returns {string} A properly formatted query string.
 */
export const createQueryString = ({
  page = 1,
  title = "",
  label = [],
  status = [],
  dueDate = "",
  orderBy = "Más reciente"
}: QueryStringParams): string => {
  const parsedOrderBy =
    ORDER_BY_OPTIONS_VALUE[orderBy] || ORDER_BY_OPTIONS_VALUE.default;

  const filters: FiltersProps = {
    page,
    orderBy: parsedOrderBy.orderBy as "createdAt" | "dueDate",
    orderDirection: parsedOrderBy.orderDirection as "ASC" | "DESC"
  };

  if (title) filters.title = title;
  if (dueDate) filters.dueDate = dueDate;
  if (label.length) filters.label = label.join(",");
  if (status.length)
    filters.status = status
      .map((value) => STATUS_OPTIONS_VALUE[value])
      .join(",");

  const queryString = Object.entries(filters)
    .filter(([, value]) => value != null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

  return queryString ? `?${queryString}` : "";
};
