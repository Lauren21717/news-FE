import { Routes, Route } from "react-router-dom";
import ArticlesList from "./components/ArticlesList";
import Header from "./components/Header";
import SingleArticle from "./components/SingleArticle";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />}></Route>
        <Route path="/" element={<SingleArticle />}></Route>
      </Routes>
    </div>
  );
}

export default App;
