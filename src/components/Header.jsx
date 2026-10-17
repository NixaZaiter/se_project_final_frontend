import { useContext } from "react";
import "./blocks/Header.css";
import { Navigation } from "./index";
import { ActivePathContext } from "../contexts/ActivePathContext";

export const Header = ({
  handleLoginClick,
  handleLogout,
  onHomeClick,
  onDropDownClick,
  dropDown,
  onDropDownMenuClick,
}) => {
  const activePath = useContext(ActivePathContext);
  return (
    <header
      className={`header${activePath === "/saved-news" ? " header_white" : ""}`}
    >
      <Navigation
        onHomeClick={onHomeClick}
        handleLoginClick={handleLoginClick}
        handleLogout={handleLogout}
        onDropDownClick={onDropDownClick}
        dropDown={dropDown}
        onDropDownMenuClick={onDropDownMenuClick}
      />
    </header>
  );
};
