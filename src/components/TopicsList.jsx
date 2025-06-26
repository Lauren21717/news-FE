import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopics } from '../utils/api'; 

const TopicsList = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopics()
      .then(setTopics)
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="text-center py-20 font-semibold">Loading Topics...</div>;
  }

  if (error) {
    return <div className="text-center py-20 font-semibold text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 font-sans">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Explore by Topic
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Find the content that interests you most.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            to={`/topics/${topic.slug}`}
            className="px-5 py-2 bg-white border border-gray-300 rounded-full text-gray-800 font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all text-sm"
          >
            <span className="capitalize">{topic.slug}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopicsList;
