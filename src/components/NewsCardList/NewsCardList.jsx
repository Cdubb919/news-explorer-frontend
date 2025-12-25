import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({ articles }) {
  return (
    <section className="results">
      {articles.map((article, index) => (
        <NewsCard
          key={index}
          article={article}
          // You can pass props here for save icon / login state later
          // loggedIn={loggedIn}
        />
      ))}
    </section>
  );
}

export default NewsCardList;
