import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchArticleById } from "../utils/api";
import CommentsList from "./CommentsList";
import VotingButtons from "./VotingButtons";
import NotFound from './NotFound';

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    if (!/^\d+$/.test(article_id)) {
      setError({ status: 400, message: 'Invalid article ID format' });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetchArticleById(article_id)
      .then((articleData) => {
        setArticle(articleData);
        setCommentCount(articleData.comment_count);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [article_id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <p className="text-center py-20">Loading article...</p>;
  }

  if (error) {
    if (error.status === 404) {
      return <NotFound type="article" />;
    }
    
    if (error.status === 400) {
      return <NotFound type="article" />;
    }
    
    // Network or other errors
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4">😵</div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">An Error Occurred</h2>
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
    <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <nav className="mb-8">
        <Link
          to="/"
          className="text-neutral-500 hover:text-neutral-900 font-medium transition-colors group inline-flex items-center"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">
            &larr;
          </span>
          <span className="ml-2">Back to all articles</span>
        </Link>
      </nav>

      <article>
        {/* --- Article Header --- */}
        <header className="text-center mb-12">
          {/* Topic Tag */}
          <p className="text-brand font-semibold uppercase tracking-wider">
            {article.topic}
          </p>
          {/* Title */}
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold text-neutral-900 leading-tight">
            {article.title}
          </h1>
          {/* Author Metadata */}
          <div className="mt-6 flex justify-center items-center space-x-4 text-sm">
            <img
              src="https://i.pravatar.cc/40"
              alt={article.author}
              className="w-10 h-10 rounded-full bg-neutral-200"
            />
            <div className="text-left">
              <p className="font-semibold text-neutral-800">{article.author}</p>
              <p className="text-neutral-500">
                {formatDate(article.created_at)}
              </p>
            </div>
          </div>
        </header>

        {/* --- Featured Image --- */}
        <div className="w-full aspect-video bg-neutral-200 rounded-lg overflow-hidden mb-12">
          <img
            src={article.article_img_url}
            alt={`Cover image for ${article.title}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* --- Article Body --- */}
        <div className="prose prose-lg lg:prose-xl max-w-none text-neutral-800 prose-h2:text-neutral-900">
          <p>{article.body}</p>
        </div>

        {/* Voting Section - Your New Component */}
        <div className="mt-12">
          <VotingButtons article={article} setArticle={setArticle} />
        </div>
      </article>

      {/* --- Comments Section --- */}
      <section className="mt-16 pt-12 border-t border-neutral-200">
        <CommentsList
          article_id={article_id}
          commentCount={commentCount}
          onCommentCountChange={setCommentCount}
        />
      </section>
    </main>
  );
};

export default SingleArticle;
