import React, { useState } from 'react';
import { BookOpen, Brain, Users, Book, MessageSquare, Bot, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LearningHub = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const learningOptions = [
    { title: 'Flashcards', icon: BookOpen, color: 'from-purple-500 to-purple-700', description: 'Practice with interactive flashcards', navigation: '/learn/flashcard' },
    { title: 'Quiz', icon: Book, color: 'from-blue-500 to-blue-700', description: 'Test your knowledge', navigation: '/learn/quiz' },
    { title: 'Video Lessons', icon: Brain, color: 'from-green-500 to-green-700', description: 'Watch Videos', navigation: '/video-lessons' },
    { title: 'Multiplayer', icon: Users, color: 'from-orange-500 to-orange-700', description: 'Practice with other learners', navigation: '/multiplayer' },
    { title: 'ISL Dictionary', icon: MessageSquare, color: 'from-pink-500 to-pink-700', description: 'Comprehensive sign language dictionary', navigation: '/isl-dictionary' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Learning Hub
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningOptions.map((option, index) => (
            <div 
              key={index} 
              className="group relative bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative z-10">
                <option.icon className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                <p className="text-gray-400">{option.description}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => navigate(option.navigation)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  >
                    Start Learning
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-transparent to-purple-500 opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* AI Assistant Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300"
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* Chat Bar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-gray-800 shadow-xl transform ${isChatOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
        <div className="p-4 flex justify-between items-center bg-gray-900">
          <h2 className="text-lg font-bold">AI Assistant</h2>
          <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 text-gray-300">
          <p>How can I assist you today?</p>
          {/* Chat content goes here */}
        </div>
      </div>
    </div>
  );
};

export default LearningHub;
