import "./blocks/Header.css";
import { Navigation, SearchForm, SavedNews } from "./index";

export const Header = ({
  handleLoginClick,
  activePath,
  isLoggedInSettings,
}) => {
  return (
    <header
      className={`header ${activePath === "/saved-news" ? "header_no-background" : ""}`}
    >
      <Navigation
        handleLoginClick={handleLoginClick}
        activePath={activePath}
        isLoggedInSettings={isLoggedInSettings}
      />
      {activePath === "/saved-news" ? <SavedNews /> : <SearchForm />}
    </header>
  );
};
