import { NewsCard, Preloader } from "./index";
// import { NEWS_API_RESPONSE } from "../utils/newsItems";
import notFoundIcon from "../assets/not-found_v1.svg";

import "./blocks/NewsCardList.css";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ActivePathContext } from "../contexts/ActivePathContext";

export const NewsCardList = ({ newsData, isLoading, onBookmarkClick }) => {
  const activePath = useContext(ActivePathContext);
  const currentUser = useContext(CurrentUserContext);
  const [activeArray, setActiveArray] = useState(newsData.articles);
  let [cardLimit, setCardLimit] = useState(3);
  const [maxLimit, setMaxLimit] = useState(100);
  const showMore = () => {
    cardLimit = cardLimit + 3;

    if (cardLimit >= 100) {
      setCardLimit(100);
      return;
    }
    setCardLimit(cardLimit);
  };
  console.log(activeArray.length);

  const newsArticlesLength = newsData.articles.length;

  useEffect(() => {
    if (maxLimit < 100 && maxLimit < newsArticlesLength) {
      setMaxLimit(100);
      return;
    }
    if (newsArticlesLength < maxLimit) {
      setMaxLimit(newsArticlesLength);
      return;
    }
  }, [newsArticlesLength, maxLimit, cardLimit]);

  useEffect(() => {
    const savedArticles = currentUser.articles;
    const searchedArticles = newsData.articles;
    if (activePath !== "/saved-news") setActiveArray(savedArticles);
    setActiveArray(searchedArticles);
  }, [newsData.articles, currentUser.articles, activePath, setActiveArray]);

  return (
    <section className="newslist">
      {isLoading.loading ? (
        <Preloader />
      ) : (
        <section className="newslist__cards">
          {newsArticlesLength <= 0 ? (
            <div className="newslist__empty">
              <img
                src={notFoundIcon}
                alt="Nothing found icon"
                className="newslist__not-found-icon"
              />
              {activePath !== "/saved-news" ? (
                <>
                  <p className="newslist__not-found-title">Nothing found</p>
                  <p className="newslist__not-found-text">
                    Sorry, but nothing matched your search terms.
                  </p>
                </>
              ) : (
                <>
                  <p className="newslist__not-found-title">Nothing saved</p>
                  <p className="newslist__not-found-text">
                    Sorry, but nothing has been saved yet.
                  </p>
                </>
              )}
            </div>
          ) : (
            <>
              <h2 className="newslist__result-title">Search results</h2>
              <ul className="newslist__card-list">
                {activeArray
                  .map((mappedArticle) => {
                    return (
                      <NewsCard
                        key={mappedArticle.url}
                        item={mappedArticle}
                        onBookmarkClick={onBookmarkClick}
                      />
                    );
                  })
                  .slice(0, cardLimit)}
              </ul>
              {cardLimit < maxLimit ? (
                <button onClick={showMore} className="newslist__show-more">
                  Show more
                </button>
              ) : (
                ""
              )}
            </>
          )}
        </section>
      )}
    </section>
  );
};
