import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArticles } from '../utils/api';
import  ArticleCard  from './ArticleCard'; 

const TopicArticles = () => {
  const { topic } = useParams(); 
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles({ topic: topic })
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [topic]);

  if (isLoading) {
    return <div className="text-center py-20 font-semibold">Loading {topic} articles...</div>;
  }

  if (error) {
    return <div className="text-center py-20 font-semibold text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 font-sans">
      <nav className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <span className="text-gray-400">/</span>
          <Link to="/topics" className="hover:text-gray-900">Topics</Link>
          <span className="text-gray-400">/</span>
          <span className="font-semibold text-gray-800 capitalize">{topic}</span>
        </div>
      </nav>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight capitalize">
          {topic} Articles
        </h1>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No articles found for this topic yet.</p>
      )}
    </div>
  );
};

export default TopicArticles;

