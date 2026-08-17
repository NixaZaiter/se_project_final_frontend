import "../blocks/SearchForm.css";
const SearchForm = () => {
  return (
    <div className="search-form">
      <p className="search-form__head">
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

export default SearchForm;
