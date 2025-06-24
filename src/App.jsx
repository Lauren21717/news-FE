import { Routes, Route } from "react-router-dom";
import ArticlesList from "./components/ArticlesList";
import Header from "./components/Header";
import ArticleCard from "./components/ArticleCard";
import SingleArticle from './components/SingleArticle';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ArticlesList />}></Route>
          <Route path="/" element={<ArticleCard />}></Route>
          <Route path="/articles/:article_id" element={<SingleArticle />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
