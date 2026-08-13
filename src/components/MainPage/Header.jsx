import { Navigation, SearchForm } from "./../index";

const Header = () => {
  return (
    <div className="header">
      <Navigation />
      <h1 className="header__title">What's going on in the world?</h1>
      <SearchForm />
    </div>
  );
};

export default Header;
