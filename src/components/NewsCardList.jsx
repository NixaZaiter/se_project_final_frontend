import { NewsCard, Preloader } from "./index";
// import { NEWS_API_RESPONSE } from "../utils/newsItems";
import notFoundIcon from "../assets/not-found_v1.svg";

import "./blocks/NewsCardList.css";
import { useEffect, useState } from "react";

export const NewsCardList = ({ activePath, newsData, isLoading }) => {
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
  useEffect(() => {
    const newsDataLength = async () => {
      try {
        const response = await newsData.articles.length;
        return response;
      } catch (err) {
        console.error(err);
      }
    };

    if (newsDataLength < maxLimit) {
      setMaxLimit(newsDataLength);
    }
  }, [newsData, maxLimit]);
  return (
    <section className="newslist">
      {isLoading.loading ? (
        <Preloader />
      ) : (
        <section className="newslist__cards">
          {newsData.totalResults <= 0 ? (
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
                {newsData.articles
                  .map((mappedArticle) => {
                    ({
                      ...mappedArticle,
                      frontendId: crypto.randomUUID(),
                    });
                    return (
                      <NewsCard
                        key={mappedArticle.frontendId}
                        item={mappedArticle}
                        activePath={activePath}
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
