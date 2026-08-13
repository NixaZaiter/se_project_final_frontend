// import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./blocks/App.css";

import {
  Main,
  Footer,
  LoginModal,
  RegisterModal,
  // Preloader,
  SavedMain,
  Header,
} from "./index";

function App() {
  // const [activeModal, setActiveModal] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [currentUser, setCurrentUser] = useState({
  //   name: "",
  //   avatarURL: "",
  //   _id: "",
  // });

  return (
    <div className="page">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/saved-news" element={<SavedMain />} />
        {/* <Route path="/" element={isLoading ? <Preloader /> : <Main />} />
        <Route
          path="/saved-news"
          element={isLoading ? <Preloader /> : <SavedMain />}
        /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <LoginModal />
      <RegisterModal />
    </div>
  );
}

export default App;
