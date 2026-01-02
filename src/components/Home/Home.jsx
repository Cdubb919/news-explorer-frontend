import { useState } from "react";
import { getNews } from "../../utils/newsApi";
import Main from "../Main/Main";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import notFoundImg from "../../assets/not-found_v1.png";
import "./Home.css";

function Home({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [keywordSubmitted, setKeywordSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!keyword.trim()) {
      setError("Please enter a keyword");
      return;
    }

    setKeywordSubmitted(true);
    onSearch();

    setError("");
    setApiError("");
    setArticles([]);
    setVisibleCount(3);
    setIsLoading(true);

    getNews(keyword)
      .then((data) => {
        setArticles(data.articles || []);
      })
      .catch(() => {
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
              required
            />

            <button className="search-form__button" type="submit">
              Search
            </button>
          </form>

          {error && <p className="search__error">{error}</p>}
        </section>
      </Main>

      {isLoading && <Preloader />}

      {apiError && <p className="search__error">{apiError}</p>}

      {!isLoading && articles.length === 0 && keywordSubmitted && (
        <section className="search-results">
          <div className="search-results__content no-results">
            <img
              src={notFoundImg}
              alt="Nothing found"
              className="no-results__image"
            />
            <h2 className="no-results__title">Nothing found</h2>
            <p className="no-results__subtitle">
              Sorry, but nothing matched your search terms.
            </p>
          </div>
        </section>
      )}

      {!isLoading && visibleArticles.length > 0 && (
        <section className="search-results">
          <div className="search-results__content">
            <h2 className="search-results__title">Search results</h2>

            <NewsCardList articles={visibleArticles} />

            {visibleCount < articles.length && (
              <button className="show-more-button" onClick={handleShowMore}>
                Show more
              </button>
            )}
          </div>
        </section>
      )}

      <About />
    </>
  );
}

export default Home;
