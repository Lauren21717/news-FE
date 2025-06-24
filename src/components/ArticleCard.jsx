import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  // The formatDate function remains exactly the same
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30)
      return `${Math.ceil(diffDays / 7)} week${diffDays >= 14 ? "s" : ""} ago`;
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Link
      to={`/articles/${article.article_id}`}
      className="flex flex-col group overflow-hidden"
    >
      {/* --- Image --- */}
      <div className="w-full h-56 bg-neutral-200 overflow-hidden">
        <img
          src={article.article_img_url}
          alt={`Cover image for ${article.title}`}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-1 py-6">
        {/* --- Metadata: Author & Date --- */}
        <div className="text-sm text-neutral-500">
          <span>{article.author}</span>
          <span className="mx-2">|</span>
          <span>{formatDate(article.created_at)}</span>
        </div>

        {/* --- Title --- */}
        <h3 className="mt-2 text-xl font-bold text-neutral-900 leading-tight">
          {article.title}
        </h3>

        <div className="mt-3 flex items-center gap-4 text-sm text-neutral-400">
          <span className="flex items-center gap-1">
            <span>👍</span>
            {article.votes}
          </span>
          <span className="flex items-center gap-1">
            <span>💬</span>
            {article.comment_count}
          </span>
          <span className="inline-block bg-neutral-100 text-neutral-600 text-xs px-2 py-1 rounded uppercase tracking-wide">
            {article.topic}
          </span>
        </div>

        {/* --- Read More Link --- */}
        <div className="mt-4 font-semibold text-neutral-900 inline-flex items-center">
          <span className="tracking-wider">READ MORE</span>
          <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
            &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
