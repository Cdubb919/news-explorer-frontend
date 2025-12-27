import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import Home from "../Home/Home";
import SavedNews from "../SavedNews/SavedNews";

import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

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

  return (
    <>
      <Header
        loggedIn={isLoggedIn}
        userName="Elise"
        onSignIn={() => setActiveModal("login")}
        onSignOut={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={<Home onSearch={() => setHasSearched(true)} />}
        />
        <Route path="/saved-news" element={<SavedNews />} />
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
      />
    </>
  );
}

export default App;
