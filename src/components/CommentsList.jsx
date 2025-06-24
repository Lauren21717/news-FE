import { useState, useEffect } from 'react';
import { fetchCommentsByArticleId } from '../utils/api';
import CommentCard from './CommentCard';

const CommentsList = ({ article_id, commentCount }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        {comments.map((comment) => (
          <CommentCard key={comment.comment_id} comment={comment} />
        ))}
      </div>
    );
  };

  return (
  <section>
    <h2 className="text-3xl font-bold text-neutral-900 mb-8">
        Comments ({commentCount})
    </h2>
    {renderContent()}
  </section>
  );
};

export default CommentsList;
