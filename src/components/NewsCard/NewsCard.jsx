import { useState } from "react";
import "./NewsCard.css";

import normalBookmark from "../../assets/NormalBookmarkNEA.png";
import hoverBookmark from "../../assets/HoverbookmarkNEA.png";
import markedBookmark from "../../assets/MarkedbookmarkNEA.png";

import trashIcon from "../../assets/trashiconNE.svg";
import trashIconHover from "../../assets/trashiconhoverNE.svg";

function NewsCard({
  article,
  loggedIn,
  savedArticles = [],
  onSaveArticle,
  onRemoveArticle,
  isSavedPage = false,
  currentKeyword = "", 
}) {
  const title = article.title || "";
  const description = article.description || article.text || "";
  const image = article.urlToImage || article.image || "";
  const dateRaw = article.publishedAt || article.date || "";
  const sourceName = article.source?.name || article.source || "";

  const keyword =
    article.keyword ||
    article.tag ||
    article.searchKeyword ||
    article.searchTerm ||
    "";

  const formattedDate = dateRaw
    ? new Date(dateRaw).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const [hovered, setHovered] = useState(false);

  const isSaved = savedArticles.some(
    (item) => item.title === article.title
  );

  function handleIconClick() {
    if (isSavedPage) {
      onRemoveArticle?.(article);
      return;
    }

    if (!loggedIn) return;

    if (isSaved) onRemoveArticle?.(article);
    else onSaveArticle?.(article, currentKeyword);
  }

  function getIconSrc() {
    if (isSavedPage) return hovered ? trashIconHover : trashIcon;
    if (isSaved) return markedBookmark;
    if (hovered) return hoverBookmark;
    return normalBookmark;
  }

  const tooltipText = isSavedPage
    ? "Remove from saved"
    : "Sign in to save articles";

  const showTooltip = hovered && (isSavedPage || !loggedIn);

  return (
    <article className="news-card">
      <div className="news-card__image-wrapper">
        {isSavedPage && keyword && (
          <span className="news-card__keyword">{keyword}</span>
        )}
        
        {image && <img src={image} alt={title} className="news-card__image" />}

        <button
          type="button"
          className={`news-card__bookmark ${
            !isSavedPage && !loggedIn ? "news-card__bookmark_disabled" : ""
          }`}
          onClick={handleIconClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label={isSavedPage ? "Remove from saved" : "Save article"}
        >
          <img
            src={getIconSrc()}
            alt=""
            className="news-card__bookmark-icon"
          />
        </button>

        {showTooltip && (
          <div className="news-card__tooltip">{tooltipText}</div>
        )}
      </div>

      <div className="news-card__content">
        {formattedDate && <p className="news-card__date">{formattedDate}</p>}
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{description}</p>
        <p className="news-card__source">{sourceName}</p>
      </div>
    </article>
  );
}

export default NewsCard;




