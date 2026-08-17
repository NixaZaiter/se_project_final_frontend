import "../blocks/Header.css";

import { Navigation, SearchForm } from "./../index";

const Header = () => {
  return (
    <header className="header">
      <Navigation />
      <div className="header__container">
        <h1 className="header__title">{"What's going on in the world?"}</h1>
        <SearchForm />
      </div>
    </header>
  );
};

export default Header;
