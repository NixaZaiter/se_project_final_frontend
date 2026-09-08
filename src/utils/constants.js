export const apiKey = import.meta.env.VITE_NEWS_API_KEY || undefined;
export const defaultQuery = null;

export function handleServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Server responded with status ${res.status}`);
}
