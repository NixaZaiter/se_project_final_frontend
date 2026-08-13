import "./blocks/Navigation.css";
const Navigation = () => {
  return (
    <div className="navi">
      <p className="navi__title">NewsExplorer</p>
      <nav>
        <button className="navi__home navi__type_btn  ">Home</button>
        <button className="navi__type_btn navi__signin">Sign in</button>
      </nav>
    </div>
  );
};

export default Navigation;
