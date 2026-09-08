import { Link } from "react-router-dom";
import "./blocks/Footer.css";
import github from "../assets/github.svg";
import linkedin from "../assets/LinkedIn.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {new Date().getFullYear()} Supersite, Powered by News API
      </p>
      <div className="footer__nav">
        <div className="footer__container footer__container_type_text">
          <Link className="footer__link" to="/">
            <p className="footer__home footer__type_btn">Home</p>
          </Link>
          <Link className="footer__link" to={"https://tripleten.com/"}>
            <p className="footer__tripleten footer__type_btn">TripleTen</p>
          </Link>
        </div>
        <div className="footer__container footer__container_type_icon">
          <Link className="footer__link" to={"https://github.com/NixaZaiter"}>
            <img
              src={github}
              alt="GitHub icon"
              className="footer__github footer__type_btn"
            />
          </Link>
          <Link
            className="footer__link"
            to={"https://www.linkedin.com/in/ian-mathew-johnson/"}
          >
            <img
              src={linkedin}
              alt="LinkedIn icon"
              className="footer__linkedin footer__type_btn"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};
