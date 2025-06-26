import React, { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { fetchArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";
import SortControls from "./SortControls";
import NotFound from './NotFound';

const TopicArticles = () => {
  const { topic } = useParams();
  const [searchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    fetchArticles({
      topic: topic,
      sort_by: sortBy,
      order: order,
    })
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [topic, sortBy, order]);

  if (isLoading) {
    return (
      <div className="text-center py-20 font-semibold">
        Loading {topic} articles...
      </div>
    );
  }

  if (error) {
    if (error.status === 404) {
      return <NotFound type="topic" />;
    }
    
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4">😵</div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">Unable to Load Articles</h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 font-sans">
      {/* Breadcrumb Navigation */}
      <nav className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-900">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link to="/topics" className="hover:text-gray-900">
            Topics
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-semibold text-gray-800 capitalize">
            {topic}
          </span>
        </div>
      </nav>

      {/* Topic Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight capitalize">
          {topic} Articles
        </h1>
      </div>

      {/* Sort Controls */}
      <SortControls />

      {/* Articles Count */}
      <div className="mb-8">
        <p className="text-gray-600">
          {articles.length} article{articles.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Articles or Empty State */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No articles found for this topic yet.
        </p>
      )}
    </div>
  );
};

export default TopicArticles;
