import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, ChevronRight, Loader2 } from 'lucide-react';

// Static gesture data
const gestureBank = [
  { id: 1, gesture: "Hello", description: "Wave your hand with palm facing forward" },
  { id: 2, gesture: "Thank You", description: "Touch your chin with your fingertips and move your hand forward" },
  { id: 3, gesture: "Please", description: "Rub your chest in a circular motion with your palm" },
  // ... add more gestures up to 25
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isGestureTask, setIsGestureTask] = useState(false);
  const [currentGesture, setCurrentGesture] = useState(null);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/get_quiz');
      const data = await response.json();
      
      // Parse the quiz text into a structured format
      const quizLines = data.quiz.split('\n').filter(line => line.trim());
      const questionObj = {
        question: quizLines[0].replace('Question 1: ', ''),
        options: quizLines.slice(1, 5).map(opt => opt.trim()),
        correctAnswer: quizLines[5].replace('Correct Answer: ', '')
      };
      
      setCurrentQuestion(questionObj);
      setScore(data.score);
      setStreak(data.highest_streak);
    } catch (err) {
      setError('Failed to fetch quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async (answer) => {
    if (isGestureTask) {
      // Handle gesture submission
      try {
        const response = await fetch('http://localhost:5000/check_gesture');
        const data = await response.json();
        setShowResult(true);
        if (data.gesture_detected) {
          setScore(prev => prev + 10);
          setStreak(prev => prev + 1);
        } else {
          setStreak(0);
        }
      } catch (err) {
        setError('Failed to check gesture. Please try again.');
      }
    } else {
      // Handle MCQ submission
      try {
        const response = await fetch('http://localhost:5000/submit_answer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            answer: answer,
            correct_answer: currentQuestion.correctAnswer
          }),
        });
        const data = await response.json();
        setSelectedAnswer(answer);
        setShowResult(true);
        setScore(data.score);
        setStreak(data.highest_streak);
      } catch (err) {
        setError('Failed to submit answer. Please try again.');
      }
    }
  };

  const nextQuestion = () => {
    if (isGestureTask) {
      // Switch back to MCQ
      setIsGestureTask(false);
      fetchQuiz();
    } else {
      // Switch to gesture task
      setIsGestureTask(true);
      setCurrentGesture(gestureBank[Math.floor(Math.random() * gestureBank.length)]);
    }
    setShowResult(false);
    setSelectedAnswer(null);
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="flex items-center gap-2 p-4 text-red-300 bg-red-900/30 rounded-lg border border-red-800">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Score and Streak */}
        <div className="flex justify-between mb-8">
          <div className="text-lg">Score: <span className="text-violet-400">{score}</span></div>
          <div className="text-lg">Streak: <span className="text-orange-400">{streak}</span></div>
        </div>

        {/* Question Container */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          {isGestureTask ? (
            <div>
              <h2 className="text-xl font-bold mb-4">Gesture Task</h2>
              <p className="text-lg mb-4">Show the sign for: <span className="text-violet-400">{currentGesture?.gesture}</span></p>
              <p className="text-gray-400 mb-6">{currentGesture?.description}</p>
              <button
                onClick={() => submitAnswer('gesture')}
                className="w-full bg-violet-600 hover:bg-violet-700 py-3 rounded-lg transition-colors"
              >
                Start Gesture Detection
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-4">Question</h2>
              <p className="text-lg mb-6">{currentQuestion?.question}</p>
              <div className="space-y-3">
                {currentQuestion?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => submitAnswer(option)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      showResult && option === currentQuestion.correctAnswer
                        ? 'bg-green-600'
                        : showResult && option === selectedAnswer
                        ? 'bg-red-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Result and Next Button */}
        {showResult && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {selectedAnswer === currentQuestion?.correctAnswer ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <AlertCircle className="text-red-500" />
              )}
              <span className="text-lg">
                {selectedAnswer === currentQuestion?.correctAnswer ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <button
              onClick={nextQuestion}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded-lg transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;