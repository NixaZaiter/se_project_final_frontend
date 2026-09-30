import "./blocks/Main.css";
import { About, NewsCardList, SearchForm } from "./index";
export const Main = ({ onSearchNews, newsData, isLoading, resetKey }) => {
  return (
    <main className="main">
      <SearchForm onSearchNews={onSearchNews} key={resetKey} />
      {isLoading.searchSubmitted ? (
        <NewsCardList newsData={newsData} isLoading={isLoading} />
      ) : (
        <></>
      )}
      <About />
    </main>
  );
};
