import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import logoutIcon from "../../assets/logout.svg";

function Header({ loggedIn, userName, onSignIn, onSignOut }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header
      className={`header ${
        isHome ? "header--transparent" : "header--light"
      }`}
    >
      <div className="header__container">
        <h1 className="header__logo">NewsExplorer</h1>

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
      </div>
    </header>
  );
}

export default Header;

