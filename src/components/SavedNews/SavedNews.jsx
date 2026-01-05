import "./SavedNews.css";
import NewsCardList from "../NewsCardList/NewsCardList";

function SavedNews({ loggedIn, userName, savedArticles = [], onRemoveArticle }) {
  if (!loggedIn) return null;

  const keywords = Array.from(
    new Set(
      savedArticles
        .map(
          (a) =>
            a.keyword ||
            a.tag ||
            a.searchKeyword ||
            a.searchTerm ||
            a.category ||
            ""
        )
        .filter(Boolean)
        .map((k) => String(k).trim())
    )
  );

  let keywordsText = "";
  if (keywords.length === 1) keywordsText = keywords[0];
  else if (keywords.length === 2) keywordsText = `${keywords[0]}, ${keywords[1]}`;
  else if (keywords.length > 2)
    keywordsText = `${keywords[0]}, ${keywords[1]}, and ${keywords.length - 2} other${
      keywords.length - 2 === 1 ? "" : "s"
    }`;

  return (
    <section className="saved-news">
      <div className="saved-news__header">
        <p className="saved-news__label">Saved articles</p>
        <h2 className="saved-news__title">
          {userName}, you have {savedArticles.length} saved articles
        </h2>
        {keywordsText && (
          <p className="saved-news__keywords">
            By keywords:{" "}
            <span className="saved-news__keywords-bold">{keywordsText}</span>
          </p>
        )}
      </div>

      <NewsCardList
        articles={savedArticles}
        loggedIn={loggedIn}
        savedArticles={savedArticles}
        onRemoveArticle={onRemoveArticle}
        isSavedPage={true}
      />
    </section>
  );
}

export default SavedNews;



