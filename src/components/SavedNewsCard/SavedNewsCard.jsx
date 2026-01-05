import { useState } from "react";
import trashIcon from "../../assets/trashiconNE.svg";
import trashIconHover from "../../assets/trashiconhoverNE.svg";
import "./SavedNewsCard.css";

export default function SavedNewsCard({ article, onRemoveArticle }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="saved-news__card">
      <div className="saved-news__image-wrapper">
        <img
          src={article.image}
          alt={article.title}
          className="saved-news__image"
        />

        {/* Keyword tag */}
        <span className="saved-news__tag-label">{article.tag}</span>

        {/* Trash icon */}
        <div
          className="saved-news__trash-icon-wrapper"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={hovered ? trashIconHover : trashIcon}
            alt="Delete"
            className="saved-news__trash-icon"
            onClick={() => onRemoveArticle(article)}
          />
        </div>
      </div>

      <div className="saved-news__content">
        <h3 className="saved-news__headline">{article.title}</h3>
        <p className="saved-news__description">{article.description}</p>
      </div>
    </div>
  );
}
