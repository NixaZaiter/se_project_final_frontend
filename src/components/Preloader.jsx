import "./blocks/Preloader.css";
export const Preloader = () => {
  return (
    <div className="preloader">
      <div className="preloader__circle-preloader" />
      <p className="preloader__text">Searching for news...</p>
    </div>
  );
};
