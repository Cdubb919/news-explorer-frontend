import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import logoutIcon from "../../assets/logout.svg";

function Header({ loggedIn, userName, onSignIn, onSignOut }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleSignIn() {
    closeMenu();
    onSignIn?.();
  }

  function handleSignOut() {
    closeMenu();
    onSignOut?.();
  }

  return (
    <header
      className={`header ${isHome ? "header--transparent" : "header--light"}`}
    >
      <div className="header__container">
        <NavLink to="/" className="header__logo" onClick={closeMenu}>
          NewsExplorer
        </NavLink>

        <nav className="header__nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `header__link ${isActive ? "header__link--active" : ""}`
            }
          >
            Home
          </NavLink>

          {loggedIn ? (
            <>
              <NavLink
                to="/saved-news"
                className={({ isActive }) =>
                  `header__link ${isActive ? "header__link--active" : ""}`
                }
              >
                Saved articles
              </NavLink>

              <button className="header__user" onClick={onSignOut}>
                <span className="header__username">{userName}</span>
                <img
                  src={logoutIcon}
                  alt="Log out"
                  className="header__logout-icon"
                />
              </button>
            </>
          ) : (
            <button className="header__signin" onClick={onSignIn}>
              Sign in
            </button>
          )}
        </nav>

        <button
          type="button"
          className="header__menu-button"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        />

        <div
          className={`header__mobile ${menuOpen ? "header__mobile_open" : ""}`}
        >
          <div className="header__mobile-top">
            <NavLink to="/" className="header__logo" onClick={closeMenu}>
              NewsExplorer
            </NavLink>

            <button
              type="button"
              className="header__close-button"
              aria-label="Close menu"
              onClick={closeMenu}
            />
          </div>

          <nav className="header__mobile-nav">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `header__mobile-link ${
                  isActive ? "header__mobile-link_active" : ""
                }`
              }
            >
              Home
            </NavLink>

            {loggedIn && (
              <NavLink
                to="/saved-news"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `header__mobile-link ${
                    isActive ? "header__mobile-link_active" : ""
                  }`
                }
              >
                Saved articles
              </NavLink>
            )}

            {loggedIn ? (
              <button className="header__mobile-user" onClick={handleSignOut}>
                <span className="header__username">{userName}</span>
                <img
                  src={logoutIcon}
                  alt="Log out"
                  className="header__logout-icon"
                />
              </button>
            ) : (
              <button className="header__mobile-signin" onClick={handleSignIn}>
                Sign in
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
