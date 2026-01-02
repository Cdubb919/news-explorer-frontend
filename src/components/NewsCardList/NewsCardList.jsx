import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({
  articles,
  loggedIn,
  savedArticles,
  onSaveArticle,
  onRemoveArticle,
}) {
  return (
    <section className="news-card-list">
      {articles.map((article, index) => (
        <NewsCard
          key={index}
          article={article}
          loggedIn={loggedIn}
          savedArticles={savedArticles}
          onSaveArticle={onSaveArticle}
          onRemoveArticle={onRemoveArticle}
        />
      ))}
    </section>
  );
}

export default NewsCardList;
