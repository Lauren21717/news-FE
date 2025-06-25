import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchArticleById } from "../utils/api";
import CommentsList from "./CommentsList";
import VotingButtons from "./VotingButtons";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticleById(article_id)
      .then((articleData) => {
        setArticle(articleData);
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
    return <p className="text-center py-20 text-red-500">Error: {error}</p>;
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
          commentCount={article.comment_count}
        />
      </section>
    </main>
  );
};

export default SingleArticle;
