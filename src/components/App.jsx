import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./blocks/App.css";

import {
  Main,
  Footer,
  LoginModal,
  RegisterModal,
  // Preloader,
  SavedNews,
  Header,
} from "./index";

export function App() {
  // const [newsData, setNewsData] = useState({
  //   status: "",
  //   totalResults: 0,
  //   articles: [
  //     {
  //       source: {
  //         id: null,
  //         name: "",
  //       },
  //       author: "",
  //       title: "",
  //       description: "",
  //       url: "",
  //       urlToImage: "",
  //     },
  //   ],
  // });
  const location = useLocation();
  const [activePath, setActivePath] = useState("/");

  const [activeModal, setActiveModal] = useState("");
  // const [selectedCard, setSelectedCard] = useState({ _id: "" });
  // const [newsItems, setNewsItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const [currentUser, setCurrentUser] = useState({
  //   name: "",
  //   avatarURL: "",
  //   _id: "",
  // });

  const handleLoginClick = () => setActiveModal("login");
  const handleRegisterClick = () => setActiveModal("signup");
  const handleCloseModal = () => setActiveModal("");

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <div className="page">
      <Header
        handleLoginClick={handleLoginClick}
        activePath={activePath}
        isLoggedInSettings={{ isLoggedIn, setIsLoggedIn }}
      />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/saved-news" element={<SavedNews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      {!isLoggedIn ? (
        <>
          <LoginModal
            isOpen={activeModal === "login"}
            handleRegisterClick={handleRegisterClick}
            onClose={handleCloseModal}
          />
          <RegisterModal
            isOpen={activeModal === "signup"}
            handleLoginClick={handleLoginClick}
            onClose={handleCloseModal}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
