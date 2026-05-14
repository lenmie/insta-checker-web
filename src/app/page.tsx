import Link from 'next/link';
import { ArrowRight, Users, UserMinus, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-12 bg-[#0a0a0a] text-gray-100 font-sans selection:bg-pink-500 selection:text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-pink-600/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl z-10">
        <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-orange-400 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Insta-Checker
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <Link 
              href="/parser" 
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group"
            >
              Manual Parser
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-6 py-2.5 font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-full hover:from-pink-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] transition-all transform hover:scale-105 shadow-lg shadow-pink-500/25">
              Connect Instagram
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">
            Track your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500">audience</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Find out who unfollowed you, who you're not following back, and get powerful insights into your Instagram growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* New Followers Section */}
          <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl hover:bg-white/[0.07] transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-2xl">
                <Users className="text-blue-400 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">New Followers</h2>
            </div>
            <ul className="space-y-4">
              {[1, 2, 3].map((i) => (
                <li key={i} className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full border border-gray-600 shadow-inner flex items-center justify-center">
                    <span className="text-xs text-gray-400">img</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-200">follower_username_{i}</span>
                    <span className="text-sm text-gray-500">Followed you recently</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Unfollowers Section */}
          <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl hover:bg-white/[0.07] transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-500/20 rounded-2xl">
                <UserMinus className="text-red-400 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Unfollowers</h2>
            </div>
            <ul className="space-y-4">
              {[1, 2].map((i) => (
                <li key={i} className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full border border-gray-600 shadow-inner flex items-center justify-center">
                    <span className="text-xs text-gray-400">img</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-200">unfollower_username_{i}</span>
                    <span className="text-sm text-red-400">Unfollowed you</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
