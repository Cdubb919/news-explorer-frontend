import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({ articles }) {
  return (
    <section className="news-card-list">
      {articles.map((article, index) => (
        <NewsCard
          key={index}
          article={article}
        />
      ))}
    </section>
  );
}

export default NewsCardList;
