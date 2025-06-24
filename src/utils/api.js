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