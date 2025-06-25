const BASE_URL = 'https://news-be-k14i.onrender.com/api'

export const fetchArticles = () => {
  return fetch(`${BASE_URL}/articles`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      return response.json();
    });
};

export const fetchArticleById = (article_id) => {
  return fetch(`${BASE_URL}/articles/${article_id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch article: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data.article);
};

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

