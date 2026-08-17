import "./blocks/Navigation.css";
const Navigation = () => {
  return (
    <nav className="navi">
      <p className="navi__title">NewsExplorer</p>
      <div className="navi__btn-container">
        <button className="navi__home navi__type_btn">Home</button>
        <button className="navi__type_btn navi__signin">Sign in</button>
      </div>
    </nav>
  );
};

export default Navigation;
