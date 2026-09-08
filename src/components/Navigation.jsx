import { Link } from "react-router-dom";
import "./blocks/Navigation.css";
import logoutBtn from "../assets/logout.svg";
import logoutBtnDark from "../assets/logout-dark.svg";

export const Navigation = ({
  isLoggedInSettings: { isLoggedIn, setIsLoggedIn } = {},
  profileName = "Test Name",
  handleLoginClick,
  activePath,
}) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const savedPath = activePath === "/saved-news";
  const currentBtn = savedPath
    ? "navi__btn_type_current navi__btn_type_current--dark"
    : "navi__btn_type_current";
  const lightDarkTitle = savedPath
    ? "navi__title navi__title--dark"
    : "navi__title";
  const lightDarkBtn = savedPath ? "navi__btn navi__btn--dark" : "navi__btn";
  return (
    <nav className={`navi ${savedPath ? "navi--dark" : ""}`}>
      <Link to="/" className="navi__link">
        <p className={lightDarkTitle}>NewsExplorer</p>
      </Link>
      <div className="navi__btn-container">
        <Link to="/" className="navi__link">
          <button
            className={`${lightDarkBtn} navi__btn_type_home ${activePath === "/" ? currentBtn : ""}`}
          >
            Home
          </button>
        </Link>
        {isLoggedIn ? (
          <>
            <Link to={"/saved-news"} className="navi__link">
              <button
                className={`${lightDarkBtn} navi__btn_type_saved-articles ${savedPath ? currentBtn : ""}`}
              >
                Saved articles
              </button>
            </Link>
            <Link to={"/"} replace className="navi__link">
              <button
                className={`${lightDarkBtn} navi__btn_type_logout`}
                onClick={handleLogout}
              >
                <p className="navi__profile-name">{profileName}</p>
                <img
                  src={savedPath ? logoutBtnDark : logoutBtn}
                  alt="Logout icon"
                  className="navi__logout-icon"
                />
              </button>
            </Link>
          </>
        ) : (
          <button
            className="navi__btn navi__btn_type_signin"
            onClick={handleLoginClick}
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
};
