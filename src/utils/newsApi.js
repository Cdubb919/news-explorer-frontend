const newsApiBaseUrl = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

const apiKey = import.meta.env.VITE_NEWS_API_KEY;

function checkResponse(res) {
  if (res.ok) return res.json();
  return res.text().then((text) => Promise.reject(text || `Error: ${res.status}`));
}

export const getNews = (query) => {
  const to = new Date().toISOString().split("T")[0];
  const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const url = `${newsApiBaseUrl}?q=${encodeURIComponent(
    query
  )}&from=${from}&to=${to}&pageSize=100&apiKey=${apiKey}`;

  return fetch(url).then(checkResponse);
};
