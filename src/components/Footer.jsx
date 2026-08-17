import "./blocks/Footer.css";
import github from "../assets/github.svg";
import linkedin from "../assets/LinkedIn.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {new Date().getFullYear()} Supersite, Powered by News API
      </p>
      <div className="footer__nav">
        <p className="footer__home footer__type_btn">Home</p>
        <p className="footer__tripleten footer__type_btn">TripleTen</p>
        <img
          src={github}
          alt="GitHub icon"
          className="footer__github footer__type_btn"
        />
        <img
          src={linkedin}
          alt="LinkedIn icon"
          className="footer__linkedin footer__type_btn"
        />
      </div>
    </footer>
  );
};
export default Footer;
