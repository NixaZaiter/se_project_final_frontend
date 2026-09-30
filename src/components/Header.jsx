import "./blocks/Header.css";
import { Navigation } from "./index";

export const Header = ({
  handleLoginClick,
  activePath,
  handleLogout,
  onHomeClick,
  onDropDownClick,
  dropDown,
}) => {
  return (
    <header
      className={`header${activePath === "/saved-news" ? " header_white" : ""}`}
    >
      <Navigation
        onHomeClick={onHomeClick}
        handleLoginClick={handleLoginClick}
        activePath={activePath}
        handleLogout={handleLogout}
        onDropDownClick={onDropDownClick}
        dropDown={dropDown}
      />
    </header>
  );
};
