import { useSearchParams } from 'react-router-dom';

const SortControls = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentSortBy = searchParams.get('sort_by') || 'created_at';
  const currentOrder = searchParams.get('order') || 'desc';

  const sortOptions = [
    { value: 'created_at', label: 'Date' },
    { value: 'comment_count', label: 'Comments' },
    { value: 'votes', label: 'Votes' },
  ];

  const handleSortChange = (newSortBy) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort_by', newSortBy);
    
    if (newSortBy === 'votes' || newSortBy === 'comment_count') {
      newParams.set('order', 'desc');
    }
    
    setSearchParams(newParams);
  };

  const handleOrderToggle = () => {
    const newParams = new URLSearchParams(searchParams);
    const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    newParams.set('order', newOrder);
    setSearchParams(newParams);
  };

  return (
    <div className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl p-4 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Sort By Section */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-600">Sort by:</span>
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          {sortOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
                currentSortBy === option.value 
                  ? 'bg-white text-gray-800 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              aria-pressed={currentSortBy === option.value}
              aria-label={`Sort by ${option.label}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Order Toggle Section */}
      <button
        onClick={handleOrderToggle}
        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
        aria-label={`Switch to ${currentOrder === 'asc' ? 'descending' : 'ascending'} order`}
      >
        <span 
          className="text-lg transition-transform duration-200" 
          style={{ 
            transform: currentOrder === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)' 
          }}
        >
          ↓
        </span>
        {currentOrder === 'asc' ? 'Ascending' : 'Descending'}
      </button>
    </div>
  );
};

export default SortControls;