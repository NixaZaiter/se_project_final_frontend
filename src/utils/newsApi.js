import { handleServerResponse } from "./constants";
export const getNews = (query, apiKey) => {
  return fetch(
    `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`,
  ).then((res) => {
    return handleServerResponse(res);
  });
};
export const getSortedNews = (
  {
    from = null,
    to = null,
    sortBy = "publishedAt",
    fromDate = null,
    toDate = null,
  },
  query,
  apiKey,
) => {
  if (from) from = `&from=${fromDate}`;
  if (to) to = `&to=${toDate}`;
  const sorting = (sortBy) => {
    if (sortBy !== "publishedAt") return `&sortBy=${sortBy}`;
    else return null;
  };
  if (sortBy !== "publishedAt") sortBy = `&sortBy=${sortBy}`;
  return fetch(
    `https://newsapi.org/v2/everything?q=${query}${from}${to}${sorting}&apiKey=${apiKey}`,
  ).then((res) => {
    return handleServerResponse(res);
  });
};
