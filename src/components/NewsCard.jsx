import "./blocks/NewsCard.css";
export const NewsCard = ({ item }) => {
  const newsDate = new Date(item.publishedAt);

  const formattedDate = new Date(newsDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <li className="newscard">
      <button className="newscard__bookmark">
        <div className="newscard__bookmark-icon" />
      </button>
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
        <p className="newscard__title newscard__type_text">{item.title}</p>
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
