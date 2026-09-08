import { NewsCard, Preloader } from "./index";
import { NEWS_API_RESPONSE } from "../utils/newsItems";
import notFoundIcon from "../assets/not-found_v1.svg";

import "./blocks/NewsCardList.css";
import { useState } from "react";

export const NewsCardList = ({ isLoggedIn }) => {
  const loadingResults = false;

  let [cardLimit, setCardLimit] = useState(1);

  const showMore = () => {
    cardLimit = cardLimit + 1;
    setCardLimit(cardLimit);
  };

  const searchFilter = (data, query) => {
    if (data === null || data === undefined) return null;
    if (Array.isArray(data)) {
      return data.some((item) => searchFilter(item, query));
    }
    if (typeof data === "object") {
      return Object.values(data).some((value) => searchFilter(value, query));
    }
    return data.toString().toLowerCase().includes(query);
  };

  console.log(searchFilter(NEWS_API_RESPONSE.articles, "apple"));

  return (
    <div className="newslist">
      {loadingResults ? (
        <Preloader />
      ) : (
        <section className="newslist__cards">
          {NEWS_API_RESPONSE.totalResults !== 0 ? (
            <>
              <h2 className="newslist__result-title">Search results</h2>
              <ul
                className="newslist__card-list"
                style={{ "--number": cardLimit }}
              >
                {NEWS_API_RESPONSE.articles
                  // .filter((item) => item.weather === weatherData.type)
                  .map((filteredItem) => {
                    //returns array
                    return (
                      <NewsCard
                        key={filteredItem._id}
                        item={filteredItem}
                        // onCardClick={handleCardClick}
                        // onCardLike={onCardLike}
                      />
                    );
                  })}
              </ul>
              <button onClick={showMore} className="newslist__show-more">
                Show more
              </button>
            </>
          ) : (
            <div className="newslist__empty">
              <img
                src={notFoundIcon}
                alt="Nothing found icon"
                className="newslist__not-found-icon"
              />
              <p className="newslist__not-found-title">Nothing found</p>
              <p className="newslist__not-found-text">
                Sorry, but nothing matched your search terms.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
