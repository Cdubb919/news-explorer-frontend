import { useState } from "react";
import { getNews } from "../../utils/newsApi";
import Main from "../Main/Main";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import "./Home.css";

function Home() {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  function handleSubmit(e) {
    e.preventDefault();

    if (!keyword.trim()) {
      setError("Please enter a keyword");
      return;
    }

    setError("");
    setApiError("");
    setArticles([]);
    setVisibleCount(3);
    setIsLoading(true);

    getNews(keyword)
      .then((data) => {
        setArticles(data.articles || []);
      })
      .catch((err) => {
        console.error("News API error:", err);
        setApiError(
          "Sorry, something went wrong during the request. Please try again later."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleShowMore() {
    setVisibleCount((prev) => prev + 3);
  }

  const visibleArticles = articles.slice(0, visibleCount);

   return (
    <>
      <Main>
        <section className="hero">
          <div className="hero__content">
            <h1 className="hero__title">What's going on in the world?</h1>

            <p className="hero__subtitle">
              Find the latest news on any topic and save them in your personal
              account.
            </p>
          </div>

          <form className="search-form" onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              className="search-form__input"
              placeholder="Enter topic"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <button
              className="search-form__button"
              type="submit"
              disabled={!keyword.trim()}
            >
              Search
            </button>
          </form>

          {error && <p className="search__error">{error}</p>}
        </section>

        {isLoading && <Preloader />}

        {apiError && <p className="search__error">{apiError}</p>}

        {!isLoading && articles.length === 0 && !error && !apiError && (
          <p className="search__error">Nothing Found</p>
        )}

        {!isLoading && visibleArticles.length > 0 && (
          <>
            <NewsCardList articles={visibleArticles} />
            {visibleCount < articles.length && (
              <button className="show-more-button" onClick={handleShowMore}>
                Show more
              </button>
            )}
          </>
        )}
      </Main>

      <About />
    </>
  );
}

export default Home;
