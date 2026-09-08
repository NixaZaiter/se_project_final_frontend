import "./blocks/SearchForm.css";
export const SearchForm = () => {
  return (
    <div className="search-form">
      <h1 className="search-form__title">{"What's going on in the world?"}</h1>
      <p className="search-form__text">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form action="" className="search-form__form">
        <input
          type="text"
          name="searchbar"
          id="searchbar"
          placeholder="Enter topic"
          className="search-form__textbox"
        ></input>
        <button type="submit" className="search-form__submit-btn">
          Search
        </button>
      </form>
    </div>
  );
};
