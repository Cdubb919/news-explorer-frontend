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
    <section className="news-card-list">
      {articles.map((article, index) => (
        <NewsCard
          key={article._id || article.url || article.link || article.title || index}
          article={article}
          loggedIn={loggedIn}
          savedArticles={savedArticles}
          onSaveArticle={onSaveArticle}
          onRemoveArticle={onRemoveArticle}
          isSavedPage={isSavedPage}
          currentKeyword={currentKeyword}
        />
      ))}
    </section>
  );
}

export default NewsCardList;
