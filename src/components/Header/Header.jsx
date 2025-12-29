import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import logoutIcon from "../../assets/logout.svg";

function Header({ loggedIn, userName, onSignIn, onSignOut }) {
  const location = useLocation();
  const isSavedNews = location.pathname === "/saved-news";

  return (
    <header className={`header ${loggedIn ? "header--light" : "header--dark"}`}>
      <div className="header__container">
        <h1 className="header__logo">NewsExplorer</h1>

        <nav className="header__nav">
          <button className="header__link header__link--active">Home</button>

          {loggedIn ? (
            <>
              <button className="header__link">Saved articles</button>

              <button className="header__user" onClick={onSignOut}>
                <span className="header__username">
                  USER: {String(userName)}
                </span>

                {/* <span className="header__username">{userName}</span> */}
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
