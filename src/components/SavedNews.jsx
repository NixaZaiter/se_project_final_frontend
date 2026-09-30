import "./blocks/SavedNews.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";
import { NewsCardList } from "./index";
export const SavedNews = ({ activePath, isLoading }) => {
  const [keywords, setKeywords] = useState([]);
  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    const newKeywords = currentUser.articles.map((article) => article.keyword);
    setKeywords((prev) => Array.from(new Set([...prev, ...newKeywords])));
  }, [currentUser]);
  return (
    <main className="main">
      <section className="saved-news">
        <div className="saved-news__container">
          <p className="saved-news__text">Saved articles</p>
          <h2 className="saved-news__heading">
            {currentUser.articles.length === 0
              ? `You haven't saved any articles, ${currentUser.name}`
              : `${currentUser.name}, you have ${currentUser.articles.length} saved ${currentUser.articles.length > 1 ? "articles" : "article"}`}
          </h2>
          {keywords.length > 0 && (
            <p className="saved-news__keywords">
              <>
                By keywords: <strong>{keywords.join(", ")}</strong>
              </>
            </p>
          )}
        </div>
        <NewsCardList
          activePath={activePath}
          newsData={currentUser}
          isLoading={isLoading}
        />
      </section>
    </main>
  );
};
