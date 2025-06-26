import { useState } from "react";
import { postComment } from "../utils/api";
import { validateComment, sanitizeInput } from "../utils/validation";

const AddComment = ({ article_id, onCommentAdded }) => {
  const [commentBody, setCommentBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const currentUser = {
    username: "grumpy19",
    avatarUrl: "https://i.pravatar.cc/40?u=grumpy19",
  };

  const minLength = 10;
  const isTextValid = commentBody.trim().length >= minLength;

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validateComment(commentBody);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    if (!isTextValid || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    setValidationErrors([]);

    const tempId = `temp-${Date.now()}`;
    const sanitizedBody = sanitizeInput(commentBody.trim());

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
        setError(null);
        setValidationErrors([]);
      })
      .catch((err) => {
        onCommentAdded(null, { tempId: tempId, error: true });
        let errorMessage = "Failed to post comment";
        if (err.status === 400) {
          errorMessage =
            "Invalid comment. Please check your input and try again.";
        } else if (err.status === 404) {
          errorMessage = "Article not found. Please refresh the page.";
        } else if (err.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage =
            err.message || "Something went wrong. Please try again.";
        }

        setError(errorMessage);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleInputChange = (e) => {
    setCommentBody(e.target.value);
    if (error) setError(null);
    if (validationErrors.length > 0) setValidationErrors([]);
  };

  const hasErrors = error || validationErrors.length > 0;
  const errorMessage =
    error || (validationErrors.length > 0 ? validationErrors[0] : "");

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
              error ? "border-red-400 focus:ring-red-400" : "border-gray-300"
            } ${isSubmitting ? "bg-gray-100" : "bg-white"}`}
          />

          {hasErrors && (
            <div className="mt-2 flex items-center space-x-2 text-red-600 text-sm">
              <span className="text-lg">⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {(isFocused || error) && (
            <div className="mt-2 flex justify-between items-center">
              <span
                className={`text-xs ${
                  error ? "text-red-600" : "text-gray-500"
                }`}
              >
                {hasErrors
                  ? ""
                  : isTextValid
                  ? `${commentBody.length} characters`
                  : `${
                      minLength - commentBody.trim().length
                    } more characters needed`}
              </span>
              <div className="flex space-x-2">
                {/* Retry button for errors */}
                {error && (
                  <button
                    type="button"
                    onClick={() => setError(null)}
                    className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Clear Error
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!isTextValid || isSubmitting || hasErrors}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all disabled:bg-gray-300 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Posting...</span>
                    </span>
                  ) : (
                    "Post"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddComment;
