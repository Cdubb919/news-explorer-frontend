import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import Home from "../Home/Home";
import SavedNews from "../SavedNews/SavedNews";
import Main from "../Main/Main";

import "./App.css";

import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SuccessModal from "../SuccessModal/SuccessModal";

function App() {
  const initialToken = localStorage.getItem("token");
  const initialUserName = localStorage.getItem("userName") || "Elise";
  const initialSavedArticles = (() => {
    try {
      const raw = localStorage.getItem("savedArticles");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  })();

  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(initialToken));
  const [activeModal, setActiveModal] = useState(null);
  const [savedArticles, setSavedArticles] = useState(initialSavedArticles);
  const [userName] = useState(initialUserName);

  function closeModal() {
    setActiveModal(null);
  }

  function handleLogin() {
    const token = "dummy-token";
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);

    setIsLoggedIn(true);
    closeModal();
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("savedArticles");

    setIsLoggedIn(false);
    setSavedArticles([]); 
  }

  function handleRegisterSuccess() {
    closeModal();
    setActiveModal("success");
  }

  function handleSaveArticle(article, keyword) {
    setSavedArticles((prev) => {
      const alreadySaved = prev.some((item) => item.title === article.title);
      if (alreadySaved) return prev;

      const articleWithKeyword = {
        ...article,
        keyword:
          keyword ||
          article.keyword ||
          article.tag ||
          article.searchKeyword ||
          article.searchTerm ||
          "",
      };

      const updated = [...prev, articleWithKeyword];
      localStorage.setItem("savedArticles", JSON.stringify(updated));
      return updated;
    });
  }

  function handleRemoveArticle(article) {
    setSavedArticles((prev) => {
      const updated = prev.filter((item) => item.title !== article.title);
      localStorage.setItem("savedArticles", JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <>
      <Header
        loggedIn={isLoggedIn}
        userName={userName}
        onSignIn={() => setActiveModal("login")}
        onSignOut={handleLogout}
      />

      <Main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                loggedIn={isLoggedIn}
                savedArticles={savedArticles}
                onSaveArticle={handleSaveArticle}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <SavedNews
                loggedIn={isLoggedIn}
                userName={userName}
                savedArticles={savedArticles}
                onRemoveArticle={handleRemoveArticle}
              />
            }
          />
        </Routes>
      </Main>

      <Footer />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeModal}
        onLogin={handleLogin}
        onSwitchToRegister={() => setActiveModal("register")}
      />

      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={closeModal}
        onSwitchToLogin={() => setActiveModal("login")}
        onRegisterSuccess={handleRegisterSuccess}
      />

      <SuccessModal
        isOpen={activeModal === "success"}
        onClose={closeModal}
        onSignIn={() => setActiveModal("login")}
      />
    </>
  );
}

export default App;

