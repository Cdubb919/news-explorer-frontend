import { useState } from "react";
import "./NewsCard.css";

function NewsCard({ article, loggedIn }) {
  const { title, description, urlToImage, publishedAt, source } = article;

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [hovering, setHovering] = useState(false);

  return (
    <article className="news-card">
      {urlToImage && (
        <img src={urlToImage} alt={title} className="news-card__image" />
      )}

      <div className="news-card__content">
        <div className="news-card__header">
          <div
            className={`news-card__save-icon ${!loggedIn ? "inactive" : ""}`}
            onMouseEnter={() => !loggedIn && setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            // onClick={() => loggedIn && saveArticle(article)} // future save functionality
          >
            💾
          </div>
          {!loggedIn && hovering && (
            <div className="news-card__tooltip">Sign in to save articles</div>
          )}
        </div>

        <p className="news-card__date">{formattedDate}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{description}</p>
        <p className="news-card__source">{source.name}</p>
      </div>
    </article>
  );
}

export default NewsCard;
