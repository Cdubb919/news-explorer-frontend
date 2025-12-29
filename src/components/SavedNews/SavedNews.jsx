import React from "react";
import "./SavedNews.css";

function SavedNews({ loggedIn, userName, savedArticles }) {
  if (!loggedIn) return null; 

  return (
    <section className="saved-news">
      <div className="saved-news__header">
        <h2 className="saved-news__title">Saved articles</h2>
        <p className="saved-news__subtitle">
          {userName}, you have {savedArticles.length} saved articles
        </p>
      </div>

      <div className="saved-news__grid">
        {savedArticles.map((article, index) => (
          <div key={index} className="saved-news__card">
            <img
              src={article.image}
              alt={article.title}
              className="saved-news__image"
            />
            <div className="saved-news__content">
              <span className="saved-news__tag">{article.tag}</span>
              <h3 className="saved-news__headline">{article.title}</h3>
              <p className="saved-news__description">{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SavedNews;

