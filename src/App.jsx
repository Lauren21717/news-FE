import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ArticlesList from './components/ArticlesList';
import SingleArticle from './components/SingleArticle';
import TopicsList from './components/TopicsList'; 
import TopicArticles from './components/TopicArticles';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/topics" element={<TopicsList />} />
          <Route path="/topics/:topic" element={<TopicArticles />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
