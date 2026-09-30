import { handleServerResponse } from "./constants";
export const getNews = ({ searchbar: query }, apiKey) => {
  const to = new Date().toISOString().split("T")[0];
  const from = new Date(new Date() - 7 * (24 * 60 * 60 * 1000))
    .toISOString()
    .split("T")[0];
  return fetch(
    `https://newsapi.org/v2/everything?q=${query}&from=${to}&to=${from}&apiKey=${apiKey}`,
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
