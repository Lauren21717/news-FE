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
  