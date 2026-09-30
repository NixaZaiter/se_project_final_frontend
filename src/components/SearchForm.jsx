import { useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import "./blocks/SearchForm.css";
import { validateSearch } from "../utils/validators";
export const SearchForm = ({ onSearchNews }) => {
  const defaultValues = {
    searchbar: "",
  };
  const { values, handleChange } = useForm(defaultValues);

  const [errors, setErrors] = useState({
    searchbar: "",
  });

  const [touched, setTouched] = useState({ searchbar: false });

  const handleFieldChange = (evt) => {
    const { name } = evt.target;
    handleChange(evt);
    setTouched((prev) => ({ ...prev, [name]: true }));
  };
  useEffect(() => {
    setErrors(validateSearch(values));
  }, [values]);

  const isValid = !errors.searchbar && values.searchbar.trim();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const nextErrors = validateSearch(values);
    setErrors(nextErrors);
    if (!Object.values(nextErrors).every((e) => !e)) {
      setTouched({ searchbar: true });
      return;
    }

    onSearchNews(values)
      .then(() => {
        setTouched({ searchbar: false });
      })
      .catch(console.error);
  };

  return (
    <section className="search-form">
      <h1 className="search-form__title">{"What's going on in the world?"}</h1>
      <p className="search-form__text">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form onSubmit={handleSubmit} action="" className="search-form__form">
        <div className="search-form__searchbar-container">
          <input
            type="text"
            name="searchbar"
            id="searchbar"
            placeholder="Enter topic"
            className={`search-form__textbox ${errors.searchbar && touched.searchbar ? "search-form__textbox_type_error" : ""}`}
            onChange={handleFieldChange}
            value={values.searchbar}
          ></input>
          <button
            type="submit"
            className={`search-form__submit-btn  ${!isValid ? "search-form__submit-btn_disabled" : ""}`}
            disabled={!isValid}
            onSubmit={handleSubmit}
          >
            Search
          </button>
        </div>
        <span
          style={{
            visibility:
              errors.searchbar && touched.searchbar ? "visible" : "hidden",
          }}
          className="search-form__error"
        >
          {errors.searchbar && touched.searchbar ? `${errors.searchbar}` : ""}
        </span>
      </form>
    </section>
  );
};
