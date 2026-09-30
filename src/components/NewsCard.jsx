import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useState } from "react";
import { saveArticle } from "../utils/api";

import "./blocks/NewsCard.css";
export const NewsCard = ({ item, activePath }) => {
  const [isBookmarked, setIsBookmarked] = useState(item.bookmarked);
  const currentUser = useContext(CurrentUserContext);
  const newsDate = new Date(item.publishedAt);
  const handleBookmarkClick = () => {
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    saveArticle(item);
  };
  // const handleDeleteClick = () => {
  //   const nextState = !isBookmarked;
  //   setIsBookmarked(nextState);
  //   deleteArticle(item);
  // };
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
            // onClick={handleDeleteClick}
          >
            <button className="newscard__bookmark-popup">
              Remove from saved
            </button>
          </button>
        </>
      ) : (
        <button
          className={`newscard__bookmark ${!isBookmarked ? "newscard__bookmark_type_unsaved" : "newscard__bookmark_type_saved"}`}
          onClick={currentUser.isLoggedIn ? handleBookmarkClick : null}
        >
          {!currentUser.isLoggedIn ? (
            <button className="newscard__bookmark-popup">
              Sign in to save articles
            </button>
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
