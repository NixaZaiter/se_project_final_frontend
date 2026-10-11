import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useState } from "react";

import "./blocks/NewsCard.css";
import { ActivePathContext } from "../contexts/ActivePathContext";
export const NewsCard = ({ item, onBookmarkClick }) => {
  const [isBookmarked, setIsBookmarked] = useState(item.bookmarked);
  const currentUser = useContext(CurrentUserContext);
  const activePath = useContext(ActivePathContext);
  const newsDate = new Date(item.publishedAt);

  const handleBookmarkClick = () => {
    onBookmarkClick(item);
    setIsBookmarked(item.bookmarked);
  };

  const formattedDate = new Date(newsDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <li className="newscard">
      {activePath === "/saved-news" ? (
        <>
          <span className="newscard__keyword">{item.keyword}</span>
          <button
            className="newscard__bookmark newscard__bookmark_type_delete"
            onClick={handleBookmarkClick}
          >
            <span className="newscard__bookmark-popup">Remove from saved</span>
          </button>
        </>
      ) : (
        <button
          className={`newscard__bookmark ${!isBookmarked ? "newscard__bookmark_type_unsaved" : "newscard__bookmark_type_saved"}`}
          onClick={currentUser.isLoggedIn ? handleBookmarkClick : null}
        >
          {!currentUser.isLoggedIn ? (
            <span className="newscard__bookmark-popup">
              Sign in to save articles
            </span>
          ) : (
            ""
          )}
        </button>
      )}

      <img
        src={item.urlToImage}
        alt={
          item.title ? `Photo for article: "${item.title}"` : "Missing article"
        }
        className="newscard__image"
      />

      <div className="newscard__container">
        <p className="newscard__date newscard__type_text">
          {item.publishedAt ? formattedDate : "No date provided"}
        </p>
        <Link to={item.url} className="newscard__link">
          <p className="newscard__title newscard__type_text">{item.title}</p>
        </Link>
        <p className="newscard__description newscard__type_text">
          {item.description ? item.description : "No description provided"}
        </p>
        <p className="newscard__source newscard__type_text">
          {item.source.name}
        </p>
      </div>
    </li>
  );
};
