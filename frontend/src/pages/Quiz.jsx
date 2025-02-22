import React, { useState } from 'react';
import { CheckCircle, ChevronRight } from 'lucide-react';

const questions = [
  { 
    question: "What does the sign for 'Hello' look like?", 
    options: ["Wave hand", "Tap forehead", "Cross arms", "Point up"], 
    correctAnswer: "Wave hand" 
  },
  { 
    question: "Which handshape is used for signing 'Thank You'?", 
    options: ["Flat hand", "Fist", "V-shape", "Pointing finger"], 
    correctAnswer: "Flat hand" 
  },
  { 
    question: "In ASL, how do you sign 'I love you'?", 
    options: ["Cross arms over chest", "Thumb, index, and pinky extended", "Point to heart", "Wave both hands"], 
    correctAnswer: "Thumb, index, and pinky extended" 
  },
  { 
    question: "What does the 'OK' sign represent in ASL?", 
    options: ["Good", "Yes", "OK", "Stop"], 
    correctAnswer: "OK" 
  },
  { 
    question: "Which letter is formed by making a fist with the thumb sticking out on the side?", 
    options: ["A", "B", "C", "D"], 
    correctAnswer: "A" 
  },
  { 
    question: "Which sign language is primarily used in the United States?", 
    options: ["BSL", "ISL", "ASL", "LSF"], 
    correctAnswer: "ASL" 
  },
  { 
    question: "How do you sign 'Please' in ASL?", 
    options: ["Touch chin and move outward", "Rub chest in a circular motion", "Point to heart", "Shake head"], 
    correctAnswer: "Rub chest in a circular motion" 
  },
  { 
    question: "Which handshape is used for signing 'Yes' in ASL?", 
    options: ["Flat palm", "Fist moving up and down", "Pointing finger", "Open hand"], 
    correctAnswer: "Fist moving up and down" 
  },
  { 
    question: "What is the sign for 'No' in ASL?", 
    options: ["Thumbs up", "Open and close fingers like a talking mouth", "Cross arms", "Wave hands"], 
    correctAnswer: "Open and close fingers like a talking mouth" 
  },
  { 
    question: "What is fingerspelling?", 
    options: ["Using hand signs for each letter", "Using gestures for whole words", "Signing with both hands", "Mouthing words"], 
    correctAnswer: "Using hand signs for each letter" 
  },
  { 
    question: "How do you sign 'Friend' in ASL?", 
    options: ["Interlocking index fingers", "Hands crossed", "Touching fingertips", "Pointing to the heart"], 
    correctAnswer: "Interlocking index fingers" 
  },
  { 
    question: "Which of the following is a common facial expression in ASL for asking a question?", 
    options: ["Raised eyebrows", "Smiling", "Looking away", "Nodding"], 
    correctAnswer: "Raised eyebrows" 
  },
  { 
    question: "What is the purpose of facial expressions in sign language?", 
    options: ["Decoration", "Conveying grammar and tone", "Indicating hand movement", "Emphasizing words"], 
    correctAnswer: "Conveying grammar and tone" 
  },
  { 
    question: "How do you sign 'Hungry' in ASL?", 
    options: ["Rub stomach", "Move hand down chest", "Point to mouth", "Shake hands"], 
    correctAnswer: "Move hand down chest" 
  },
  { 
    question: "Which of these is a two-handed sign?", 
    options: ["Cat", "Dog", "Book", "Hello"], 
    correctAnswer: "Book" 
  },
  { 
    question: "What does the sign for 'School' look like?", 
    options: ["Clapping hands together", "Pointing up", "Tapping forehead", "Shaking hands"], 
    correctAnswer: "Clapping hands together" 
  },
  { 
    question: "How do you sign 'Mother' in ASL?", 
    options: ["Thumb on chin, fingers spread", "Thumb on forehead, fingers spread", "Fist under chin", "Point to nose"], 
    correctAnswer: "Thumb on chin, fingers spread" 
  },
  { 
    question: "What is the handshape for the letter 'C' in ASL?", 
    options: ["Fist", "Open hand", "Curved hand like a C", "Thumb and index finger forming a circle"], 
    correctAnswer: "Curved hand like a C" 
  },
  { 
    question: "Which sign involves tapping your chin with your fingertips and moving outward?", 
    options: ["Thank You", "Sorry", "Goodbye", "Friend"], 
    correctAnswer: "Thank You" 
  },
  { 
    question: "What is the most important aspect of communicating in sign language?", 
    options: ["Handshape only", "Facial expressions and body language", "Speaking while signing", "Speed of signing"], 
    correctAnswer: "Facial expressions and body language" 
  }
];


const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const handleAnswerClick = (answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    if (answer === questions[currentIndex].correctAnswer) {
      setScore(score + 10);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentIndex((prev) => prev + 1);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between mb-8">
          <div className="text-lg">Score: <span className="text-violet-400">{score}</span></div>
          <div className="text-lg">Streak: <span className="text-orange-400">{streak}</span></div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Question {currentIndex + 1}/20</h2>
          <p className="text-lg mb-6">{questions[currentIndex]?.question}</p>
          <div className="space-y-3">
            {questions[currentIndex]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  selectedAnswer && option === questions[currentIndex].correctAnswer
                    ? 'bg-green-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
