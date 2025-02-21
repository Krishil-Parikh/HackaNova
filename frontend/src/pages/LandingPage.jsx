import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Flame, Book, MessageCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const performanceData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 75 },
  { month: 'Mar', score: 85 },
  { month: 'Apr', score: 78 },
  { month: 'May', score: 90 },
  { month: 'Jun', score: 88 }
];


const LandingPage = () => {

    const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full bg-[#111827] text-gray-100">
      {/* Header */}
      <nav className="bg-[#1F2937] py-4 px-6 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">
            SignLanguage Hub
          </h1>
          <div className="flex gap-4">
            <button 
                onClick={() => navigate("/learn") }
                className="px-4 py-2 bg-violet-600 rounded-lg hover:bg-violet-700 transition-all duration-300 flex items-center gap-2">
              <Book className="w-4 h-4" />
              Learn
            </button>
            <button className="px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700 transition-all duration-300 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Communicate
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* User Info and Streak Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1F2937] p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full border-2 border-violet-500 flex items-center justify-center bg-[#374151]">
                <span className="text-sm text-gray-400">User</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">John Doe</h3>
                <p className="text-gray-400 text-sm">Advanced Learner</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">4.8 Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Streak Section */}
          <div className="bg-[#1F2937] p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Current Streak</h2>
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">15</div>
              <p className="text-gray-400 text-sm">Days</p>
              <div className="flex justify-center gap-2 mt-4">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full ${
                      i < 5 ? 'bg-orange-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Graph */}
        <div className="bg-[#1F2937] p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
          <div className="h-[300px] w-full">
            <LineChart 
              width={800} 
              height={300} 
              data={performanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ fill: '#8B5CF6' }}
              />
            </LineChart>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;