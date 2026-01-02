import { NavLink } from "react-router-dom";
import "./Footer.css";

import githubIcon from "../../assets/github.svg";
import linkedinIcon from "../../assets/LinkedIn.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © 2024 Supersite, Powered by News API
        </p>

        <div className="footer__right">
          <nav className="footer__nav">
            <NavLink to="/" className="footer__link">
              Home
            </NavLink>

            <a
              href="https://tripleten.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              TripleTen
            </a>
          </nav>

          <div className="footer__social">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="GitHub" />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
