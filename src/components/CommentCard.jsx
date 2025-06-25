import { Link } from "react-router-dom";

const CommentCard = ({ comment }) => {
  const formatDate = (dateString) => {
    if (comment.isOptimistic) return "Just now";

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "Less than an hour ago";
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className={`flex space-x-4 transition-opacity duration-500 ${
      comment.isOptimistic ? 'opacity-60' : 'opacity-100'
    }`}>
      {/* Author Avatar */}
      <div className="flex-shrink-0">
        <img
          src={`https://i.pravatar.cc/40?u=${comment.author}`}
          alt={comment.author}
          className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"
        />
      </div>

      {/* Comment Content */}
      <div className="flex-1">
        <div className="flex items-baseline space-x-2">
          <p className="font-semibold text-neutral-900">{comment.author}</p>
          <p className="text-xs text-neutral-500">
            {formatDate(comment.created_at)}
          </p>
          {comment.isOptimistic && (
            <span className="text-xs text-green-600 animate-pulse">
              Posting...
            </span>
          )}
        </div>
        <p className="mt-1 text-neutral-700 leading-relaxed">{comment.body}</p>

        {/* Comment Votes Section */}
        <div className="mt-3 flex items-center space-x-4 text-sm">
          <button
            className="text-neutral-500 hover:text-green-600 transition-colors p-1"
            aria-label="Upvote comment"
          >
            👍
          </button>

          <span className="text-neutral-500">{comment.votes}</span>

          <button
            className="text-neutral-500 hover:text-red-600 transition-colors p-1"
            aria-label="Downvote comment"
          >
            👎
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
