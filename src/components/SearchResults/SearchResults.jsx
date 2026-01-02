import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import "./SearchResults.css";

function SearchResults({ articles, isLoading, apiError, isLoggedIn, onShowMore }) {
  return (
    <section className="search-results">
      {isLoading && <Preloader />}

      {apiError && <p className="search-results__error">{apiError}</p>}

      {!isLoading && !apiError && articles.length > 0 && (
        <>
          <h2 className="search-results__title">Search Results</h2>
          <NewsCardList articles={articles} isLoggedIn={isLoggedIn} />
          <button className="search-results__show-more" onClick={onShowMore}>
            Show More
          </button>
        </>
      )}

      {!isLoading && !apiError && articles.length === 0 && (
        <p className="search-results__no-results">
          No articles found. Try a different keyword.
        </p>
      )}
    </section>
  );
}

export default SearchResults;
