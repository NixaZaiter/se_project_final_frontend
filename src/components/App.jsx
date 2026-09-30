import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./blocks/App.css";

import {
  Main,
  Footer,
  LoginModal,
  RegisterModal,
  SavedNews,
  Header,
} from "./index";

import { apiKey } from "../utils/constants";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { getNews } from "../utils/newsApi";
import { authorizeUser, checkToken } from "../utils/auth";

export function App() {
  const location = useLocation();

  //States
  let [resetKey, setResetKey] = useState(0);
  const [dropDown, setDropDown] = useState(false);
  const [activePath, setActivePath] = useState("/");
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState({
    searchSubmitted: false,
    loading: false,
  });
  const [currentUser, setCurrentUser] = useState({
    name: "",
    _id: "",
    isLoggedIn: false,
  });
  const [newsData, setNewsData] = useState({
    status: "",
    totalResults: 0,
    articles: [
      {
        source: {
          id: null,
          name: "",
        },
        author: "",
        title: "",
        description: "",
        url: "",
        urlToImage: "",
        bookmarked: false,
      },
    ],
  });

  // Modal setters
  const handleLoginClick = () => setActiveModal("login");
  const handleRegisterClick = () => setActiveModal("signup");
  const handleCloseModal = () => setActiveModal("");
  const onHomeClick = () => {
    setIsLoading({ searchSubmitted: false, loading: false });
    resetKey = resetKey + 1;
    setResetKey(resetKey);
    resetKey = 0;
  };
  const onDropDownClick = () => {
    setDropDown(!dropDown);
    if (activeModal !== "") {
      handleCloseModal();
    }
  };

  // Logout logic
  const handleLogout = () => {
    setCurrentUser((prev) => ({
      ...prev,
      name: "",
      _id: "",
      isLoggedIn: false,
    }));
  };

  // Login logic
  const handleLogin = async (data) => {
    try {
      const token = await authorizeUser(data);
      const user = await checkToken(token);
      console.log();
      setCurrentUser({
        ...user,
        name: user.name,
        _id: user._id,
        isLoggedIn: true,
      });
      handleCloseModal();
    } catch (err) {
      console.error("Login Error in console:", err.message);
      return null;
    }
  };

  // News search logic
  const onSearchNews = async (data) => {
    if (data.searchbar === "") {
      const BadRequestError = new Error("Please enter a key word");
      BadRequestError.name = "BadRequestError";
      BadRequestError.status = 400;
      throw BadRequestError;
    }
    setIsLoading({ searchSubmitted: true, loading: true });
    try {
      const response = await getNews(data, apiKey);
      const articleWithIds = response.articles.map((article) => ({
        ...article,
        frontendId: crypto.randomUUID(),
        bookmarked: false,
        keyword: data.searchbar,
      }));
      setNewsData({ ...response, articles: articleWithIds });
      setIsLoading({ searchSubmitted: true, loading: false });
    } catch (err) {
      console.error(
        "Sorry, something went wrong during the request. Please try again later.",
        err,
      );
    }
  };

  //Active path init
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  // Escape to close modal
  useEffect(() => {
    if (!activeModal) return;

    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {
        <div className={`page${activePath === "/" ? " page_background" : ""}`}>
          <Header
            className="page__header"
            handleLoginClick={handleLoginClick}
            activePath={activePath}
            onHomeClick={onHomeClick}
            handleLogout={handleLogout}
            onDropDownClick={onDropDownClick}
            dropDown={dropDown}
            handleCloseModal={handleCloseModal}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main //SearchForm, NewsCardList (with API data), About
                  isLoading={isLoading}
                  onSearchNews={onSearchNews}
                  resetKey={resetKey}
                  newsData={newsData}
                />
              }
            />
            {currentUser.isLoggedIn === false ? (
              ""
            ) : (
              <Route
                path="/saved-news"
                element={
                  <SavedNews //NewsCardList (with bookmarked data)
                    activePath={activePath}
                    newsData={newsData} // NEED TO CHANGE TO SAVEDNEWSDATA WITH LIKE/BOOKMARK LOGIC
                    isLoading={isLoading}
                  />
                }
              />
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Footer />

          <LoginModal
            isOpen={activeModal === "login"}
            handleLogin={handleLogin}
            handleRegisterClick={handleRegisterClick}
            onClose={handleCloseModal}
          />
          <RegisterModal
            isOpen={activeModal === "signup"}
            handleLoginClick={handleLoginClick}
            onClose={handleCloseModal}
          />
        </div>
      }
    </CurrentUserContext.Provider>
  );
}
