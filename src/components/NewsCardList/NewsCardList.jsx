import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({
  articles = [],
  loggedIn,
  savedArticles = [],
  onSaveArticle,
  onRemoveArticle,
  isSavedPage = false,
  currentKeyword = "",
}) {
  return (
    <ul className="news-card-list">
      {articles.map((article, index) => (
        <li
          className="news-card-list__item"
          key={
            article._id ||
            article.url ||
            article.link ||
            article.title ||
            index
          }
        >
          <NewsCard
            article={article}
            loggedIn={loggedIn}
            savedArticles={savedArticles}
            onSaveArticle={onSaveArticle}
            onRemoveArticle={onRemoveArticle}
            isSavedPage={isSavedPage}
            currentKeyword={currentKeyword}
          />
        </li>
      ))}
    </ul>
  );
}

export default NewsCardList;

