import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gray-50">
      <div className="w-full max-w-5xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Insta-Checker</h1>
          <div className="flex items-center space-x-4">
            <Link href="/parser" className="text-blue-500 hover:underline">
              Manual Parser
            </Link>
            <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              Connect with Instagram
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* New Followers Section */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">New Followers</h2>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-600">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <span>follower_username_1</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <span>follower_username_2</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <span>follower_username_3</span>
              </li>
            </ul>
          </div>

          {/* Unfollowers Section */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-red-600">Unfollowers</h2>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-600">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <span>unfollower_username_1</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <span>unfollower_username_2</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
