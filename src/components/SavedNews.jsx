import "./blocks/SavedNews.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";
import { NewsCardList } from "./index";
export const SavedNews = ({ activePath, isLoading, onBookmarkClick }) => {
  const [keywords, setKeywords] = useState([]);
  const currentUser = useContext(CurrentUserContext);
  const savedArticles = currentUser.articles;
  const truncateKeywords = (maxWords) => {
    const totalWords = keywords.length;
    if (totalWords == 0) return "";
    if (totalWords <= maxWords) {
      return (
        <>
          By keywords: <strong>{keywords.join(", ")}</strong>
        </>
      );
    }
    const keptWords = keywords.slice(0, maxWords);
    const extraWords = totalWords - maxWords;
    const truncatedText = (
      <>
        By keywords:{" "}
        <strong>
          {keptWords.join(", ") +
            " and " +
            extraWords +
            " other" +
            (extraWords === 1 ? "" : "s")}
        </strong>
      </>
    );
    return truncatedText;
  };
  useEffect(() => {
    const newKeywords = savedArticles.map((article) => article.keyword);
    setKeywords(Array.from(new Set([...newKeywords])));
  }, [savedArticles, onBookmarkClick]);
  return (
    <main className="main">
      <section className="saved-news">
        <div className="saved-news__container">
          <p className="saved-news__text">Saved articles</p>
          <h2 className="saved-news__heading">
            {savedArticles.length === 0
              ? `You haven't saved any articles, ${currentUser.name}`
              : `${currentUser.name}, you have ${savedArticles.length} saved ${savedArticles.length > 1 ? "articles" : "article"}`}
          </h2>
          {keywords.length > 0 && (
            <p className="saved-news__keywords">{truncateKeywords(3)}</p>
          )}
        </div>
        <NewsCardList
          activePath={activePath}
          newsData={currentUser}
          isLoading={isLoading}
          onBookmarkClick={onBookmarkClick}
        />
      </section>
    </main>
  );
};
