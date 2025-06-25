import { useState, useEffect } from "react";
import { fetchCommentsByArticleId } from "../utils/api";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";

const CommentsList = ({ article_id, commentCount, onCommentCountChange }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hiddenComments, setHiddenComments] = useState(new Set());

  const currentUser = "grumpy19";

  useEffect(() => {
    fetchCommentsByArticleId(article_id)
      .then((commentsData) => {
        setComments(commentsData);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [article_id]);

  // Handle comment addition with optimistic rendering
  const handleCommentAdded = (comment, { isOptimistic, tempId, error }) => {
    if (error) {
      setComments((prev) => prev.filter((c) => c.comment_id !== tempId));
      if (onCommentCountChange) {
        onCommentCountChange((prev) => prev - 1);
      }
      return;
    }

    if (isOptimistic) {
      setComments((prev) => [comment, ...prev]);
      if (onCommentCountChange) {
        onCommentCountChange((prev) => prev + 1);
      }
    } else {
      setComments((prev) =>
        prev.map((c) => (c.comment_id === tempId ? comment : c))
      );
    }
  };

  // Handle comment deletion
  const handleCommentDeleted = (
    commentId,
    isOptimistic = false,
    shouldRestore = false
  ) => {
    if (shouldRestore) {
      setHiddenComments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
      return;
    }

    if (isOptimistic) {
      setHiddenComments((prev) => new Set([...prev, commentId]));
      if (onCommentCountChange) {
        onCommentCountChange((prev) => prev - 1);
      }
    } else {
      setComments((prevComments) =>
        prevComments.filter((c) => c.comment_id !== commentId)
      );
      setHiddenComments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
    }
  };

  const visibleComments = comments.filter(
    (comment) => !hiddenComments.has(comment.comment_id)
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <p className="text-center py-8 text-neutral-500">Loading comments...</p>
      );
    }

    if (error) {
      return <p className="text-center py-8 text-red-500">Error: {error}</p>;
    }

    if (comments.length === 0) {
      return (
        <div className="text-center py-12 border-2 border-dashed border-neutral-200 rounded-lg">
          <p className="text-neutral-500 italic">
            No comments yet. Be the first to share your thoughts!
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {visibleComments.map((comment) => (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            onCommentDeleted={handleCommentDeleted}
            currentUser={currentUser}
          />
        ))}
      </div>
    );
  };

  return (
    <section>
      <h2 className="text-3xl font-bold text-neutral-900 mb-8">
        Comments ({commentCount || visibleComments.length})
      </h2>

      {/* Add Comment Form */}
      <div className="mb-8">
        <AddComment
          article_id={article_id}
          onCommentAdded={handleCommentAdded}
        />
      </div>

      {/* Comment List */}
      {renderContent()}
    </section>
  );
};

export default CommentsList;
