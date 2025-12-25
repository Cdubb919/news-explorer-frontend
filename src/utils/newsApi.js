console.log("newsApi.js LOADED");

const newsApiBaseUrl =
    process.env.NODE_ENV === "production"
        ? "https://nomoreparties.co/news/v2/everything"
        : "https://newsapi.org/v2/everything";

const apiKey = import.meta.env.VITE_NEWS_API_KEY;

export const getNews = (query) => {
    console.log("getNews called with:", query);

    const to = new Date().toISOString().split("T")[0];
    const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

    const url = `${newsApiBaseUrl}?q=${encodeURIComponent(
        query
    )}&from=${from}&to=${to}&pageSize=100&apiKey=${apiKey}`;

    return fetch(url).then((res) => {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    });
};


