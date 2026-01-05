import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import Home from "../Home/Home";
import SavedNews from "../SavedNews/SavedNews";
import "./App.css";

import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SuccessModal from "../SuccessModal/SuccessModal";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [userName, setUserName] = useState("Elise");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("userName");
    const storedArticles = localStorage.getItem("savedArticles");

    if (token) {
      setIsLoggedIn(true);
      if (storedUser) setUserName(storedUser);
      if (storedArticles) setSavedArticles(JSON.parse(storedArticles));
    }
  }, []);

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
  }

  function handleRegisterSuccess() {
    closeModal();
    setActiveModal("success");
  }

 function handleSaveArticle(article, keyword) {
  setSavedArticles((prev) => {
    const alreadySaved = prev.some(
      (item) => item.title === article.title
    );

    if (alreadySaved) return prev;

    const articleWithKeyword = {
      ...article,
      keyword: keyword || article.keyword || article.tag || article.searchKeyword || article.searchTerm || "",
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
      <Routes>
        <Route
          path="/"
          element={
            <div className="hero-layout">
              <Header
                loggedIn={isLoggedIn}
                userName={userName}
                onSignIn={() => setActiveModal("login")}
                onSignOut={handleLogout}
              />

              <Home
                onSearch={() => setHasSearched(true)}
                loggedIn={isLoggedIn}
                onSaveArticle={handleSaveArticle}
                savedArticles={savedArticles}
              />
            </div>
          }
        />

        <Route
          path="/saved-news"
          element={
            <>
              <Header
                loggedIn={isLoggedIn}
                userName={userName}
                isHome={true}
                onSignIn={() => setActiveModal("login")}
                onSignOut={handleLogout}
              />

              <SavedNews
                loggedIn={isLoggedIn}
                userName={userName}
                savedArticles={savedArticles}
                onRemoveArticle={handleRemoveArticle}
              />
            </>
          }
        />
      </Routes>

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
