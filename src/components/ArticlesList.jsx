import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchArticles } from '../utils/api';
import ArticleCard from './ArticleCard';
import SortControls from './SortControls';

const ArticlesList = () => {
  const ARTICLES_PER_PAGE = 9;
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  // sort parameters
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort_by') || 'created_at';
  const order = searchParams.get('order') || 'desc';

  useEffect(() => {
    setIsLoading(true);
    setArticles([]);

    fetchArticles({
      sort_by: sortBy,
      order: order,
      page: 1,
      limit: ARTICLES_PER_PAGE,
    })
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
  }, [sortBy, order]);

  // function to handle loading more articles
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    
    // 10 arti for a page
    const currentPage = Math.ceil(articles.length / ARTICLES_PER_PAGE) + 1;
    fetchArticles({
      sort_by: sortBy,
      order: order,
      page: currentPage,
      limit: ARTICLES_PER_PAGE,
    })
      .then((data) => {
        setArticles(prevArticles => [...prevArticles, ...data.articles]);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  };


  if (isLoading)
    return <p className="text-center py-10">Loading articles...</p>;
  if (error)
    return <p className="text-center py-10 text-red-500">Error: {error}</p>;

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
      
      {/* Modern Sort Controls */}
      <SortControls />

      {/* Articles Grid  */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>

      {/* Show article count info */}
      <p className="text-center pt-8 text-neutral-500">
        Showing {articles.length} of {totalArticles} articles
      </p>

      {/* Load More Button */}
      {articles.length < totalArticles && (
        <div className="text-center pt-5 pb-20">
          <button 
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="bg-white border border-neutral-300 text-neutral-800 font-semibold py-3 px-6 rounded-lg transition hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingMore ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-neutral-300 border-t-neutral-800 rounded-full"></div>
                Loading...
              </span>
            ) : (
              `Load More`
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticlesList;
