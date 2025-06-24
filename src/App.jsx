import { Routes, Route } from "react-router-dom";
import ArticlesList from "./components/ArticlesList";
import Header from "./components/Header";
import ArticleCard from "./components/ArticleCard";
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ArticlesList />}></Route>
          <Route path="/" element={<ArticleCard />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
