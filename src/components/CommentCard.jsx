import { useState } from "react";
import { deleteComment } from "../utils/api";

const CommentCard = ({
  comment,
  onCommentDeleted,
  currentUser = "grumpy19",
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

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

  const handleDelete = () => {
    // Confirm deletion
    if (
      !window.confirm(
        "Are you sure you want to delete this comment? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    // Optimistic deletion - hide comment immediately
    if (onCommentDeleted) {
      onCommentDeleted(comment.comment_id, true);
    }

    // API call
    deleteComment(comment.comment_id)
      .then(() => {
        if (onCommentDeleted) {
          onCommentDeleted(comment.comment_id, false);
        }
      })
      .catch((err) => {
        if (onCommentDeleted) {
          onCommentDeleted(comment.comment_id, false, true);
        }
        setDeleteError("Failed to delete comment. Please try again.");
        console.error("Delete error:", err);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const isUserComment = comment.author === currentUser;
  const canDelete =
    isUserComment &&
    !comment.isOptimistic &&
    !comment.comment_id?.toString().startsWith("temp-");

  return (
    <div
      className={`flex space-x-4 transition-opacity duration-500 ${
        comment.isOptimistic ? "opacity-60" : "opacity-100"
      } ${isDeleting ? "opacity-50" : ""}`}
    >
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
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline space-x-2">
            <p className="font-semibold text-neutral-900">{comment.author}</p>
            <p className="text-xs text-neutral-500">
              {formatDate(comment.created_at)}
            </p>
            {comment.isOptimistic && (
              <span className="text-xs text-blue-600 animate-pulse">
                Posting...
              </span>
            )}
            {isUserComment && !comment.isOptimistic && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                You
              </span>
            )}
          </div>

          {/* Delete Button - Only show for user's own comments */}
          {canDelete && (
            <div className="flex flex-col items-end">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`text-xs px-2 py-1 rounded transition-all ${
                  isDeleting
                    ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                    : "text-neutral-400 hover:text-red-600 hover:bg-red-50"
                }`}
                title="Delete comment"
              >
                {isDeleting ? (
                  <span className="flex items-center gap-1">
                    <div className="animate-spin w-3 h-3 border border-neutral-400 border-t-transparent rounded-full"></div>
                    Deleting...
                  </span>
                ) : (
                  "X"
                )}
              </button>

              {deleteError && (
                <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded border border-red-200 mt-1 whitespace-nowrap">
                  {deleteError}
                </span>
              )}
            </div>
          )}
        </div>

        <p className="mt-1 text-neutral-700 leading-relaxed">{comment.body}</p>

        {/* Comment Votes Section */}
        <div className="mt-3 flex items-center space-x-4 text-sm">
          <button
            className="text-neutral-500 hover:text-green-600 transition-colors p-1"
            aria-label="Upvote comment"
            disabled={isDeleting}
          >
            👍
          </button>

          <span className="text-neutral-500">{comment.votes}</span>

          <button
            className="text-neutral-500 hover:text-red-600 transition-colors p-1"
            aria-label="Downvote comment"
            disabled={isDeleting}
          >
            👎
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
