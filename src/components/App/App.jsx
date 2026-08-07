import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import Home from "../Home/Home";
import SavedNews from "../SavedNews/SavedNews";
import Main from "../Main/Main";

import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SuccessModal from "../SuccessModal/SuccessModal";

function App() {
  const initialToken = localStorage.getItem("token");
  const initialUserName = localStorage.getItem("userName") || "";
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
  const [userName, setUserName] = useState(initialUserName);

  function closeModal() {
    setActiveModal(null);
  }

  function handleLogin(userData) {
  const token = "dummy-token";

  const emailName = userData?.email
    ? userData.email.split("@")[0]
    : "User";

  const formattedUserName =
    emailName.charAt(0).toUpperCase() + emailName.slice(1);

  localStorage.setItem("token", token);
  localStorage.setItem("userName", formattedUserName);

  setUserName(formattedUserName);
  setIsLoggedIn(true);
  closeModal();
}

  function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("savedArticles");

  setIsLoggedIn(false);
  setUserName("");
  setSavedArticles([]);
}

  function handleRegisterSuccess() {
    closeModal();
    setActiveModal("success");
  }

  function handleSaveArticle(article, keyword) {
    const normalizedArticle = {
      ...article,
      url: article.url || article.link || article.title || "",
      keyword:
        keyword ||
        article.keyword ||
        article.tag ||
        article.searchKeyword ||
        article.searchTerm ||
        "",
    };

    setSavedArticles((prev) => {
      if (prev.some((item) => item.url === normalizedArticle.url)) return prev;

      const updated = [...prev, normalizedArticle];
      localStorage.setItem("savedArticles", JSON.stringify(updated));
      return updated;
    });
  }

  function handleRemoveArticle(article) {
    const uniqueUrl = article.url || article.link || article.title || "";

    setSavedArticles((prev) => {
      const updated = prev.filter((item) => item.url !== uniqueUrl);
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
                onRemoveArticle={handleRemoveArticle}
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
