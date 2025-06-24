import { Link } from "react-router-dom";

const CommentCard = ({ comment }) => {
  const formatDate = (dateString) => {
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
    <div className="flex space-x-4">
      {/* Author Avatar */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-neutral-500">
          {comment.author.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Comment Content */}
      <div className="flex-1">
        <div className="flex items-baseline space-x-2">
          <p className="font-semibold text-neutral-900">{comment.author}</p>
          <p className="text-xs text-neutral-500">
            {formatDate(comment.created_at)}
          </p>
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

          <span className='text-neutral-500'>{comment.votes}</span>

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
