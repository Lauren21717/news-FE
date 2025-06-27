const BASE_URL = 'https://news-be-k14i.onrender.com/api'

/**
 * Fetches articles with optional filtering and sorting parameters.
 * @param {Object} [options={}] - Options for filtering and sorting articles.
 * @param {string} [options.topic] - Optional topic to filter by.
 * @param {string} [options.sort_by] - Sort articles by: 'created_at', 'comment_count', 'votes', 'title', 'author'.
 * @param {string} [options.order] - Sort order: 'asc' or 'desc'.
 * @returns {Promise<Object>} A promise that resolves to the response with articles array.
 * @throws {Error} If the network response is not ok.
 */
export const fetchArticles = (options = {}) => {
  let url = `${BASE_URL}/articles`;
  
  const params = new URLSearchParams();
  if (options.topic) params.append('topic', options.topic);
  if (options.sort_by) params.append('sort_by', options.sort_by);
  if (options.order) params.append('order', options.order);
  if (options.page) params.append('p', options.page);
  if (options.limit) params.append('limit', options.limit);
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  return fetch(url)
    .then(response => handleApiError(response, 'fetch articles'))
    .then(response => response.json());
};

/**
 * Fetches a single article by its unique ID.
 * @param {string | number} article_id - The ID of the article to fetch.
 * @returns {Promise<Object>} A promise that resolves to the article object.
 * @throws {Error} If the network response is not ok.
 */
export const fetchArticleById = (article_id) => {
  return fetch(`${BASE_URL}/articles/${article_id}`)
    .then(response => handleApiError(response, 'fetch article'))
    .then(response => response.json())
    .then(data => data.article);
};

/**
 * Fetches all comments associated with a specific article ID.
 * @param {string | number} article_id - The ID of the article whose comments are to be fetched.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of comment objects.
 * @throws {Error} If the network response is not ok.
 */
export const fetchCommentsByArticleId = (article_id) => {
  return fetch(`${BASE_URL}/articles/${article_id}/comments`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch comments: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data.comments);
};

/**
 * Updates the vote count for a specific article.
 * @param {string | number} article_id - The ID of the article to vote on.
 * @param {number} inc_votes - The number to increment the votes by (e.g., 1 for an upvote, -1 for a downvote).
 * @returns {Promise<Object>} A promise that resolves to the updated article object.
 * @throws {Error} If the network response is not ok.
 */
export const updateArticleVotes = (article_id, inc_votes) => {
  return fetch(`${BASE_URL}/articles/${article_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inc_votes: inc_votes
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to update votes: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data.article);
};

/**
 * Posts a new comment to a specific article.
 * @param {string | number} article_id - The ID of the article to comment on.
 * @param {string} username - The username of the author posting the comment.
 * @param {string} body - The content of the comment.
 * @returns {Promise<Object>} A promise that resolves to the newly created comment object.
 * @throws {Error} If the network response is not ok.
 */
export const postComment = (article_id, username, body) => {
  return fetch(`${BASE_URL}/articles/${article_id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      body: body
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to post comment: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data.comment);
}

/**
 * Deletes a comment by its unique ID.
 * @param {string | number} comment_id - The ID of the comment to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the deletion was successful.
 * @throws {Error} If the network response is not ok.
 */
export const deleteComment = (comment_id) => {
  return fetch(`${BASE_URL}/comments/${comment_id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to delete comment: ${response.status}`);
      }
      return true;
    });
};

/**
 * Fetches all available topics from the API.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of topic objects.
 * @throws {Error} If the network response is not ok.
 */
export const fetchTopics = () => {
  return fetch(`${BASE_URL}/topics`)
    .then(response => handleApiError(response, 'fetch topics'))
    .then(response => response.json())
    .then(data => data.topics);
};

/**
 * Fetches articles filtered by topic.
 * @param {string} topic - The topic slug to filter by.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of article objects.
 * @throws {Error} If the network response is not ok.
 */
export const fetchArticlesByTopic = (topic) => {
  return fetch(`${BASE_URL}/articles?topic=${topic}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch articles for topic: ${topic}`);
      }
      return response.json();
    })
    .then(data => data.articles);
};


const handleApiError = async (response, context = '') => {
  if (!response.ok) {
    let errorMessage = `Failed to ${context}`;
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.msg || errorData.message || errorMessage;
    } catch {
      switch (response.status) {
        case 404:
          errorMessage = `${context} not found`;
          break;
        case 400:
          errorMessage = `Invalid request: ${context}`;
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = `${errorMessage} (${response.status})`;
      }
    }
    
    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }
  return response;
};