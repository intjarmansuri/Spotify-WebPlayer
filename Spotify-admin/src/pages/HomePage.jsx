import { FaMusic, FaCompactDisc, FaUser, FaChartLine } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="p-5 sm:p-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaMusic className="text-green-500 text-3xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Total Songs</h2>
            <p className="text-xl font-bold text-gray-900">1,234</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaCompactDisc className="text-blue-500 text-3xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Total Albums
            </h2>
            <p className="text-xl font-bold text-gray-900">567</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaUser className="text-purple-500 text-3xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Active Users
            </h2>
            <p className="text-xl font-bold text-gray-900">8,910</p>
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaChartLine className="text-yellow-500 text-3xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Daily Streams
            </h2>
            <p className="text-xl font-bold text-gray-900">10,123</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <button className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition">
            Add Song
          </button>
          <button className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition">
            Add Album
          </button>
          <button className="bg-purple-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-purple-600 transition">
            Manage Users
          </button>
          <button className="bg-yellow-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-yellow-600 transition">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
