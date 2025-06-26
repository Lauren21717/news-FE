import { Link } from 'react-router-dom';

const NotFound = ({ type = 'page' }) => {
  const errorDetails = {
    page: {
      emoji: '🔍',
      title: 'Page Not Found',
      message: 'Sorry, we couldn\'t find the page you were looking for.',
    },
    article: {
      emoji: '📄',
      title: 'Article Not Found',
      message: 'This article may have been moved, deleted, or never existed.',
    },
    topic: {
      emoji: '🏷️',
      title: 'Topic Not Found',
      message: 'We don\'t have any articles for this topic just yet.',
    },
  };

  const { emoji, title, message } = errorDetails[type] || errorDetails.page;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16">
      <div className="text-6xl mb-4">{emoji}</div>
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h1>
      <p className="mt-4 text-lg text-gray-500 max-w-md">{message}</p>
      <div className="mt-8 flex items-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
        >
          Go to Homepage
        </Link>
        <Link
          to="/topics"
          className="px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-all"
        >
          Explore Topics
        </Link>
      </div>
    </div>
  );
};

export default NotFound;