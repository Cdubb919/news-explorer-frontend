import { useState } from "react";
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

  function closeModal() {
    setActiveModal(null);
  }

  function handleLogin() {
    setIsLoggedIn(true);
    closeModal();
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  function handleRegisterSuccess() {
    closeModal();
    setActiveModal("success");
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
                userName="Elise"
                onSignIn={() => setActiveModal("login")}
                onSignOut={handleLogout}
              />

              <Home onSearch={() => setHasSearched(true)} />
            </div>
          }
        />

        <Route
          path="/saved-news"
          element={
            <>
              <Header
                loggedIn={isLoggedIn}
                userName="Elise"
                isHome={true}
                onSignIn={() => setActiveModal("login")}
                onSignOut={handleLogout}
              />

              <SavedNews
                loggedIn={isLoggedIn}
                userName="Elise"
                savedArticles={[]}
              />
            </>
          }
        />
      </Routes>

      {hasSearched && <Footer />}

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
