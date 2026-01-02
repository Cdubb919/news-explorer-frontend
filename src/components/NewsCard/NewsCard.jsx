import { useState } from "react";
import "./NewsCard.css";

import normalBookmark from "../../assets/NormalBookmarkNEA.png";
import hoverBookmark from "../../assets/HoverbookmarkNEA.png";
import markedBookmark from "../../assets/MarkedbookmarkNEA.png";

function NewsCard({
  article,
  loggedIn,
  savedArticles,
  onSaveArticle,
  onRemoveArticle,
}) {
  const { title, description, urlToImage, publishedAt, source } = article;

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [hovered, setHovered] = useState(false);

  const isSaved = savedArticles.some(
    (item) => item.title === article.title
  );

  function handleBookmarkClick() {
    if (!loggedIn) return;

    if (isSaved) {
      onRemoveArticle(article);
    } else {
      onSaveArticle(article);
    }
  }

  function getBookmarkImage() {
    if (isSaved) return markedBookmark;
    if (hovered) return hoverBookmark;
    return normalBookmark;
  }

  return (
    <article className="news-card">
      <div className="news-card__image-wrapper">
        {urlToImage && (
          <img
            src={urlToImage}
            alt={title}
            className="news-card__image"
          />
        )}

        <div
          className={`news-card__bookmark ${
            !loggedIn ? "news-card__bookmark_disabled" : ""
          }`}
          onClick={handleBookmarkClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={getBookmarkImage()}
            alt="Bookmark"
            className="news-card__bookmark-icon"
          />
        </div>

        {!loggedIn && hovered && (
          <div className="news-card__tooltip">
            Sign in to save articles
          </div>
        )}
      </div>

      <div className="news-card__content">
        <p className="news-card__date">{formattedDate}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{description}</p>
        <p className="news-card__source">{source.name}</p>
      </div>
    </article>
  );
}

export default NewsCard;

