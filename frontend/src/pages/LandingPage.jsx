import React from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Book, 
  Video, 
  Brain, 
  ArrowRight,   
  CheckCircle2,
  HandMetal,
  Users,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const capabilities = [
  {
    icon: Video,
    title: "Real-time Sign Detection",
    description: "Practice sign language with instant feedback through your camera"
  },
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Personalized learning path adapts to your progress and needs"
  },
  {
    icon: MessageSquare,
    title: "Interactive Conversations",
    description: "Practice conversations with AI-powered signing avatars"
  },
  {
    icon: Globe,
    title: "Multiple Sign Languages",
    description: "Learn isn and esn sign languages"
  }
];

const examples = [
  {
    title: "Learn Basic Signs",
    items: [
      "Common greetings and phrases",
      "Numbers and alphabet",
      "Daily conversation basics"
    ]
  },
  {
    title: "Practice Conversations",
    items: [
      "Real-world scenarios",
      "Cultural context learning",
      "Expression and movement"
    ]
  },
  {
    title: "Track Progress",
    items: [
      "Skill assessment",
      "Progress tracking",
      "Achievement badges"
    ]
  }
];

const LandingPage = () => {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700 rounded-xl ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <HandMetal className="h-8 w-8 text-purple-400" />
              <span className="ml-2 text-xl font-semibold text-white">Sign Language Hub</span>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/signin') } className="text-gray-300 hover:text-white">Log in</button>
              <button onClick={() => navigate('/signup') } className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
          Master Sign Language with
          <span className="text-purple-400"> AI-Powered Learning</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
          Experience interactive sign language learning powered by advanced AI technology. 
          Practice anywhere, anytime, and get real-time feedback on your signing.
        </p>
        <button onClick={() => navigate('/signup') } className="bg-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-colors">
          Start Learning for Free
        </button>
      </div>

      {/* Capabilities Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {capabilities.map((capability, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:shadow-lg transition-shadow">
            <div className="flex items-start">
              <capability.icon className="h-6 w-6 text-purple-400" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-white">{capability.title}</h3>
                <p className="mt-2 text-gray-400">{capability.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Examples Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Examples of what you can learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {examples.map((example, index) => (
              <div key={index} className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">{example.title}</h3>
                  <ul className="space-y-3">
                    {example.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-12">
        <div className="text-center text-sm text-gray-400">
          © 2025 Sign Language Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
