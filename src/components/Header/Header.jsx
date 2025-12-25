import "./Header.css";

function Header({ loggedIn, userName, onSignIn, onSignOut }) {
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
                {userName}
                <span className="header__logout-icon">↗</span>
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
