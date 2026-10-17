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
import { ActivePathContext } from "../contexts/ActivePathContext";
import { getNews } from "../utils/newsApi";
import { authorizeUser, checkToken } from "../utils/auth";
import { deleteArticle, saveArticle } from "../utils/api";

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
    articles: [],
  });
  const [newsData, setNewsData] = useState({
    status: "",
    totalResults: 0,
    articles: [],
  });

  // Modal setters
  const handleLoginClick = () => setActiveModal("login");
  const handleRegisterClick = () => setActiveModal("signup");
  const handleCloseModal = () => setActiveModal("");

  // Click Logic
  const onHomeClick = () => {
    setIsLoading({ searchSubmitted: false, loading: false });
    resetKey = resetKey + 1;
    setResetKey(resetKey);
    resetKey = 0;
    setNewsData({
      status: "",
      totalResults: 0,
      articles: [],
    });
    handleCloseModal();
    setDropDown(false);
  };

  const onBookmarkClick = (item) => {
    if (currentUser.articles.find((article) => article.url === item.url)) {
      item.bookmarked = false;
      deleteArticle(item)
        .then((data) => {
          setCurrentUser((prev) => ({
            ...prev,
            articles: prev.articles.filter((item) => item.url !== data.url),
          }));
        })
        .catch(console.error);
      return;
    }
    item.bookmarked = true;
    saveArticle(item)
      .then((data) => {
        setCurrentUser((prev) => ({
          ...prev,
          articles: [...prev.articles, item],
        }));
        return data;
      })
      .catch(console.error);
  };

  const onDropDownClick = () => {
    setDropDown(!dropDown);
    if (activeModal !== "") {
      handleCloseModal();
    }
  };
  const onDropDownMenuClick = () => {
    setDropDown(false);
  };

  // Logout logic
  const handleLogout = () => {
    setCurrentUser((prev) => ({
      ...prev,
      name: "",
      _id: "",
      isLoggedIn: false,
    }));
    setDropDown(false);
    handleCloseModal();
  };

  // Login logic
  const handleLogin = async (data) => {
    try {
      const token = await authorizeUser(data);
      const user = await checkToken(token);
      setCurrentUser({
        ...user,
        name: user.name,
        _id: user._id,
        isLoggedIn: true,
      });
      setDropDown(false);
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
      const articlesWithBookmarks = await response.articles.map((article) => ({
        ...article,
        bookmarked: false,
        keyword: data.searchbar,
      }));
      setNewsData({ ...response, articles: articlesWithBookmarks });
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
      <ActivePathContext.Provider value={activePath}>
        {
          <div
            className={`page${activePath === "/" ? " page_background" : ""}`}
          >
            <Header
              className="page__header"
              handleLoginClick={handleLoginClick}
              onHomeClick={onHomeClick}
              handleLogout={handleLogout}
              onDropDownClick={onDropDownClick}
              dropDown={dropDown}
              handleCloseModal={handleCloseModal}
              onDropDownMenuClick={onDropDownMenuClick}
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
                    onBookmarkClick={onBookmarkClick}
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
                      isLoading={isLoading}
                      onBookmarkClick={onBookmarkClick}
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
      </ActivePathContext.Provider>
    </CurrentUserContext.Provider>
  );
}
