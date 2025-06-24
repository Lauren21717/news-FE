import { useState, useEffect } from "react";
import { fetchArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles()
      .then((data) => {
        setArticles(data.articles);
        setTotalArticles(data.total_count);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p className="text-center py-10">Loading articles...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">
          Exploring New Articles
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-500">
          Ideas, trends, and inspiration for a brighter future
        </p>
      </div>

      {/* Articles Grid  */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>

      {articles.length > totalArticles && (
        <div className="text-center py-20">
          <button className="bg-white border border-neutral-300 text-neutral-800 font-semibold py-3 px-6 rounded-lg transition hover:bg-neutral-100">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticlesList;