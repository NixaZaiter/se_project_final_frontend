import "./blocks/Main.css";
import { About, NewsCardList } from "./index";
export const Main = ({ isLoggedIn }) => {
  const searchSubmitted = true;
  return (
    <main className="main">
      {searchSubmitted ? <NewsCardList isLoggedIn={isLoggedIn} /> : <></>}
      <About />
    </main>
  );
};
