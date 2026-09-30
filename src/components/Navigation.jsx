import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./blocks/Navigation.css";
import logoutBtn from "../assets/logout.svg";
import logoutBtnDark from "../assets/logout-dark.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const Navigation = ({
  handleLogout,
  handleLoginClick,
  activePath,
  onHomeClick,
  onDropDownClick,
  dropDown,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const savedPath = activePath === "/saved-news";
  const [theme, setTheme] = useState({
    navi: "navi",
    title: "navi__title",
    button: "navi__btn",
  });

  useEffect(() => {
    if (savedPath && !dropDown) {
      setTheme({
        navi: "navi navi_dark",
        title: "navi__title navi__title_dark",
        button: "navi__btn navi__btn_dark",
      });
      return;
    }
    setTheme({
      navi: "navi",
      title: "navi__title",
      button: "navi__btn",
    });
  }, [setTheme, dropDown, savedPath]);
  return (
    <>
      <nav className={`${theme.navi}${dropDown ? " navi_type_dropdown" : ""}`}>
        {/*Title*/}
        <Link to="/" className="navi__link">
          <p className={theme.title} onClick={onHomeClick}>
            NewsExplorer
          </p>
        </Link>
        {/*Button Container*/}
        <div
          className={`navi__container ${dropDown ? "navi__container_type_dropdown" : ""}`}
        >
          {/*Home Menu Button*/}
          <Link to="/" className="navi__link">
            <button
              className={`${theme.button} navi__btn_type_home ${activePath === "/" ? "navi__btn_active" : ""}`}
            >
              Home
            </button>
          </Link>
          {currentUser.isLoggedIn ? (
            <>
              {/*Saved News Menu Button*/}
              <Link to={"/saved-news"} className="navi__link">
                <button
                  className={`${theme.button} navi__btn_type_saved-articles ${savedPath ? "navi__btn_active" : ""}`}
                >
                  Saved articles
                </button>
              </Link>
              {/*Logout Button*/}
              <Link to={"/"} replace className="navi__link">
                <button
                  className={`${theme.button} navi__btn_type_logout`}
                  onClick={handleLogout}
                >
                  <p className="navi__profile-name">{currentUser.name}</p>
                  <img
                    src={savedPath && !dropDown ? logoutBtnDark : logoutBtn}
                    alt="Logout icon"
                    className="navi__logout-icon"
                  />
                </button>
              </Link>
            </>
          ) : (
            <>
              {/*Signin Button*/}
              <button
                className="navi__btn navi__btn_type_signin"
                onClick={handleLoginClick}
              >
                Sign in
              </button>
            </>
          )}
        </div>
        <button
          className={`${theme.button} navi__btn_type_toggle ${dropDown ? "navi__btn_type_toggle_active" : ""}`}
          onClick={onDropDownClick}
        />
      </nav>
    </>
  );
};
