import { useState } from "react";
import { updateArticleVotes } from "../utils/api";

// --- SVG Icons for Reactions
const LaughingIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
    <line x1="9" y1="9" x2="9.01" y2="9"></line>
    <line x1="15" y1="9" x2="15.01" y2="9"></line>
  </svg>
);

const NeutralIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="8" y1="15" x2="16" y2="15"></line>
    <line x1="9" y1="9" x2="9.01" y2="9"></line>
    <line x1="15" y1="9" x2="15.01" y2="9"></line>
  </svg>
);

const VotingButtons = ({ article, setArticle }) => {
  const [userVote, setUserVote] = useState(0);
  const [isVoting, setIsVoting] = useState(false);
  const [voteError, setVoteError] = useState(null);

  const handleVote = (increment) => {
    // Prevent double voting in the same direction
    if (
      (userVote === 1 && increment === 1) ||
      (userVote === -1 && increment === -1)
    ) {
      return;
    }

    // Prevent voting while already voting
    if (isVoting) return;

    setIsVoting(true);
    setVoteError(null);

    // Calculate the actual increment needed
    const actualIncrement = userVote === 0 ? increment : increment - userVote;

    // Store previous states for potential revert
    const previousUserVote = userVote;
    const previousVotes = article.votes;

    // Optimistic updates - update UI immediately
    setArticle((prevArticle) => ({
      ...prevArticle,
      votes: prevArticle.votes + actualIncrement,
    }));
    setUserVote(increment);

    // API call
    updateArticleVotes(article.article_id, actualIncrement)
      .catch((err) => {
        setArticle((prevArticle) => ({
          ...prevArticle,
          votes: previousVotes,
        }));
        setUserVote(previousUserVote);
        setVoteError("Failed to update vote. Please try again.");
        console.error("Vote error:", err);
      })
      .finally(() => {
        setIsVoting(false);
      });
  };

  // Base classes for the buttons
  const buttonBaseClasses =
    "flex items-center gap-3 w-32 justify-center p-3 rounded-xl border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  // Dynamic classes for the positive reaction button
  const positiveButtonClasses =
    userVote === 1
      ? "bg-green-100 border-green-500 text-green-600"
      : "bg-white border-gray-200 text-gray-500 hover:border-green-400 hover:bg-green-50";

  // Dynamic classes for the negative reaction button
  const negativeButtonClasses =
    userVote === -1
      ? "bg-blue-100 border-blue-500 text-blue-600"
      : "bg-white border-gray-200 text-gray-500 hover:border-blue-400 hover:bg-blue-50";

  return (
    <div className="w-full py-8">
      <hr className="mb-8 border-gray-100" />
      <h3 className="text-center text-lg font-semibold text-gray-800 mb-4">
        React to this article
      </h3>
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        {/* Positive Reaction Button */}
        <button
          onClick={() => handleVote(1)}
          disabled={isVoting}
          className={`${buttonBaseClasses} ${positiveButtonClasses}`}
          aria-label="React positively to this article"
        >
          <LaughingIcon className="w-6 h-6" />
          {userVote === 1 && (
            <span className="text-lg font-bold">{article.votes}</span>
          )}
        </button>

        {/* Negative Reaction Button */}
        <button
          onClick={() => handleVote(-1)}
          disabled={isVoting}
          className={`${buttonBaseClasses} ${negativeButtonClasses}`}
          aria-label="React neutrally to this article"
        >
          <NeutralIcon className="w-6 h-6" />
          {userVote === -1 && (
            <span className="text-lg font-bold">{article.votes}</span>
          )}
        </button>
      </div>

      {/* Status Messages */}
      <div className="h-8 mt-4 text-center">
        {isVoting && (
          <div className="text-sm text-gray-500 animate-pulse flex items-center justify-center gap-2">
            <div className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
            Saving reaction...
          </div>
        )}
        {voteError && (
          <div className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded border border-red-200">
            {voteError}
          </div>
        )}
      </div>
    </div>
  );
};

export default VotingButtons;
