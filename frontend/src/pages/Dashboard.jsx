import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, Layout, Video, Eye, Wallet, Gift, Flame, MessageSquare, MessageCircle } from 'lucide-react';

const Dashboard = () => {
  const performanceData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 75 },
    { month: 'Mar', score: 85 },
    { month: 'Apr', score: 88 },
    { month: 'May', score: 80 },
    { month: 'Jun', score: 85 },
    { month: 'Jul', score: 95 },
    { month: 'Aug', score: 92 }
  ];

  return (
    <div className="min-h-screen bg-[#1a1d24]">
      {/* Top Navigation Bar */}
      <nav className="bg-[#1e2229] px-4 py-2 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-purple-600"></div>
            <span className="text-white font-semibold">Sign Language Hub</span>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => href='/dash'} className="px-4 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Learn</span>
            </button>
            <button className="px-4 py-1.5 bg-gray-700 text-white rounded hover:bg-gray-600 flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Communicate</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-56 bg-[#1e2229] p-3 min-h-screen">
          <nav className="space-y-1">
            <a href="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded bg-purple-600 text-white">
              <Layout className="w-4 h-4" />
              <span>Dashboard</span>
            </a>
            <a href="/learn/flashcard" className="flex items-center space-x-3 px-3 py-2 rounded text-gray-400 hover:bg-[#2a2f38] hover:text-white">
              <BookOpen className="w-4 h-4" />
              <span>FlashCard</span>
            </a>
            <a href="/learn/quiz" className="flex items-center space-x-3 px-3 py-2 rounded text-gray-400 hover:bg-[#2a2f38] hover:text-white">
              <BookOpen className="w-4 h-4" />
              <span>Quiz</span>
            </a>
            <a href="/learn/video" className="flex items-center space-x-3 px-3 py-2 rounded text-gray-400 hover:bg-[#2a2f38] hover:text-white">
              <Video className="w-4 h-4" />
              <span>Video Lessons</span>
            </a>
            <a href="/learn/dic" className="flex items-center space-x-3 px-3 py-2 rounded text-gray-400 hover:bg-[#2a2f38] hover:text-white">
              <Eye className="w-4 h-4" />
              <span>ISL Dictionary</span>
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="space-y-4">
            {/* Performance Chart */}
            <div className="bg-[#1e2229] rounded p-4">
              <h2 className="text-white text-lg font-semibold mb-4">Performance Overview</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2f38" />
                    <XAxis dataKey="month" stroke="#6b7280" tick={{ fill: '#6b7280' }} />
                    <YAxis stroke="#6b7280" tick={{ fill: '#6b7280' }} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e2229',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* My Wallet */}
              <div className="bg-[#1e2229] p-4 rounded">
                <h3 className="text-gray-400 text-sm mb-2">My Wallet</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl text-white font-semibold">3 Badges</p>
                    <a href="#" className="text-purple-500 text-sm hover:text-purple-400">View Collection →</a>
                  </div>
                  <Wallet className="w-6 h-6 text-purple-500" />
                </div>
              </div>

              {/* My Contributions */}
              <div className="bg-[#1e2229] p-4 rounded">
                <h3 className="text-gray-400 text-sm mb-2">My Contributions</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl text-white font-semibold">2</p>
                  </div>
                  <Gift className="w-6 h-6 text-green-500" />
                </div>
              </div>

              {/* Current Streak */}
              <div className="bg-[#1e2229] p-4 rounded">
                <h3 className="text-gray-400 text-sm mb-2">Current Streak</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl text-white font-semibold">15 Days</p>
                    <span className="text-orange-500 text-sm">Personal Best!</span>
                  </div>
                  <Flame className="w-6 h-6 text-orange-500" />
                </div>
              </div>

              {/* My Feedbacks */}
              <div className="bg-[#1e2229] p-4 rounded">
                <h3 className="text-gray-400 text-sm mb-2">My Feedbacks</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl text-white font-semibold">24</p>
                    <a href="#" className="text-blue-500 text-sm hover:text-blue-400">View All →</a>
                  </div>
                  <MessageSquare className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;