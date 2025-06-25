import { useState } from "react";
import { postComment } from "../utils/api";

const AddComment = ({ article_id, onCommentAdded }) => {
  const [commentBody, setCommentBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const currentUser = {
    username: "grumpy19",
    avatarUrl: "https://i.pravatar.cc/40?u=grumpy19",
  };

  const minLength = 10;
  const isTextValid = commentBody.trim().length >= minLength;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isTextValid || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const tempId = `temp-${Date.now()}`;
    const optimisticComment = {
      comment_id: tempId,
      author: currentUser.username,
      body: commentBody.trim(),
      votes: 0,
      created_at: new Date().toISOString(),
      isOptimistic: true,
    };

    onCommentAdded(optimisticComment, { isOptimistic: true });

    // API call
    postComment(article_id, currentUser.username, commentBody.trim())
      .then((realComment) => {
        onCommentAdded(realComment, { tempId: tempId });
        setCommentBody("");
        setIsFocused(false);
      })
      .catch((err) => {
        onCommentAdded(null, { tempId: tempId, error: true });
        setError(`Failed to post comment: ${err.message}`);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleInputChange = (e) => {
    setCommentBody(e.target.value);
    if (error) setError(null);
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-lg border border-gray-200 shadow-sm">
      <form onSubmit={handleSubmit} className="flex items-start space-x-4">
        <img
          src={currentUser.avatarUrl}
          alt="Your avatar"
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="flex-1">
          <textarea
            id="comment"
            value={commentBody}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            placeholder="Add a comment..."
            rows={isFocused ? 3 : 1}
            disabled={isSubmitting}
            className={`w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 transition-all duration-200 ${
              error
                ? "border-red-400 focus:ring-red-400"
                : "border-gray-300"
            } ${isSubmitting ? "bg-gray-100" : "bg-white"}`}
          />
          {(isFocused || error) && (
            <div className="mt-2 flex justify-between items-center">
              <span
                className={`text-xs ${
                  error ? "text-red-600" : "text-gray-500"
                }`}
              >
                {error ||
                  (isTextValid
                    ? `${commentBody.length} characters`
                    : `${minLength - commentBody.trim().length} more needed`)}
              </span>
              <button
                type="submit"
                disabled={!isTextValid || isSubmitting}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-700"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddComment;
