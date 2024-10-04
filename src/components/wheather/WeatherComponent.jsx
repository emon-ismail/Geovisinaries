import React, { useState, useEffect } from 'react';

const NASA_API_URL = 'https://images-api.nasa.gov/search?q=';
const ITEMS_PER_PAGE = 12;

const NasaImageSearch = () => {
  const [query, setQuery] = useState('moon'); // default search query
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${NASA_API_URL}${query}`);
        const data = await response.json();
        setResults(data.collection.items); // The items contain the images/videos
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const newQuery = event.target.elements.search.value;
    setQuery(newQuery);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);

  // Get items for the current page
  const paginatedResults = results.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">NASA Image and Video Search</h1>

      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          name="search"
          placeholder="Search NASA images..."
          className="px-4 py-2 rounded-l-md text-gray-800"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 rounded-r-md hover:bg-blue-500"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center">{error}</p>}

      {/* Display images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedResults.length > 0 &&
          paginatedResults.map((item) => (
            <div
              key={item.data[0].nasa_id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{item.data[0].title}</h3>
              {item.links && (
                <img
                  src={item.links[0].href}
                  alt={item.data[0].title}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
              )}
              <p className="text-sm">{item.data[0].description?.substring(0, 100)}...</p>
            </div>
          ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <span className="text-xl">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NasaImageSearch;
