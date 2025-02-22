import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Flashcard = () => {
  const img_path = [
    'frontend/src/pages/img/signs.jpg', 
    'frontend/src/pages/img/sign2.jpg',  
    'frontend/src/pages/img/sign3.jpg'
  ];
  
  const navigate = useNavigate();
  
  // Create cards with image paths
  const dummyCards = Array(25).fill().map((_, index) => ({
    id: index + 1,
    image: img_path[index % 3], // Cycle through the 3 images
    meaning: `Sign ${index + 1}`,
    isLocked: index !== 0
  }));
  
  const [cards, setCards] = useState(dummyCards);
  const [selectedCard, setSelectedCard] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});

  useEffect(() => {
    if (selectedCard !== null) {
      const currentIndex = cards.findIndex(card => card.id === selectedCard);
      if (currentIndex >= 0 && currentIndex < cards.length - 1) {
        const newCards = [...cards];
        newCards[currentIndex + 1].isLocked = false;
        setCards(newCards);
      }
    }
  }, [selectedCard]);

  const handleCardClick = (cardId) => {
    const card = cards.find(c => c.id === cardId);
    if (!card.isLocked) {
      setSelectedCard(cardId);
    }
  };

  const handleCloseCard = () => {
    setSelectedCard(null);
  };

  const handleFlipCard = (cardId) => {
    if (!cards.find(c => c.id === cardId).isLocked) {
      setFlippedCards({
        ...flippedCards,
        [cardId]: !flippedCards[cardId]
      });
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen p-8 text-white">
      <button
        onClick={() => navigate('/learn')}
        className="absolute top-4 left-4 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full flex items-center gap-2"
      >
        <ArrowLeft size={20} /> Back
      </button>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-purple-400 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Sign Language Flashcards
        </h1>
        
        <div className="relative">
          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                className={`relative ${selectedCard && selectedCard !== card.id ? 'opacity-30' : ''}`}
                whileHover={!card.isLocked ? { scale: 1.05 } : {}}
                whileTap={!card.isLocked ? { scale: 0.95 } : {}}
              >
                <motion.div
                  className={`bg-slate-800 rounded-xl overflow-hidden cursor-pointer h-80 perspective-1000 relative ${
                    card.isLocked ? 'cursor-not-allowed opacity-60' : ''
                  }`}
                  onClick={() => !card.isLocked && handleCardClick(card.id)}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                      flippedCards[card.id] ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front of card */}
                    <div className="absolute w-full h-full backface-hidden">
                      <div className="flex flex-col items-center justify-center h-full p-4 transition-all duration-300 bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-xl">
                        <img 
                          src={card.image} 
                          alt={card.meaning} 
                          className="w-48 h-48 object-cover mb-4 rounded-lg"
                        />
                        <motion.button
                          className="absolute top-2 right-2 bg-slate-700 p-2 rounded-full opacity-80 hover:opacity-100"
                          whileHover={{ rotate: 180 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFlipCard(card.id);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                            <path d="M21 3v5h-5"></path>
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                            <path d="M3 21v-5h5"></path>
                          </svg>
                        </motion.button>
                        {card.isLocked && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-xl">
                            <Lock size={48} className="text-slate-400" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Back of card */}
                    <div className="absolute w-full h-full backface-hidden rotate-y-180">
                      <div className="flex flex-col items-center justify-center h-full p-4 bg-gradient-to-b from-purple-900 to-pink-900 border border-purple-700 rounded-xl">
                        <h3 className="text-2xl font-bold mb-4 text-white">{card.meaning}</h3>
                        <p className="text-center text-white/80">
                          Practice this sign by mimicking the hand position shown on the front of the card.
                        </p>
                        <motion.button
                          className="absolute top-2 right-2 bg-purple-700 p-2 rounded-full opacity-80 hover:opacity-100"
                          whileHover={{ rotate: 180 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFlipCard(card.id);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                            <path d="M21 3v5h-5"></path>
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                            <path d="M3 21v-5h5"></path>
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Zoomed Card Modal */}
          <AnimatePresence>
            {selectedCard !== null && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseCard}
              >
                <motion.div
                  className="bg-slate-800 rounded-xl overflow-hidden relative max-w-md w-full"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative">
                    <img 
                      src={cards.find(c => c.id === selectedCard)?.image} 
                      alt={cards.find(c => c.id === selectedCard)?.meaning} 
                      className="w-full h-64 object-cover"
                    />
                    <motion.button
                      className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 text-white"
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCloseCard}
                    >
                      <X size={24} />
                    </motion.button>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-purple-400">
                      {cards.find(c => c.id === selectedCard)?.meaning}
                    </h2>
                    <p className="text-slate-300 mb-4">
                      This sign represents "{cards.find(c => c.id === selectedCard)?.meaning}". 
                      Practice by mimicking the hand position shown in the image.
                    </p>
                    <div className="flex justify-between">
                      <motion.button
                        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          handleCloseCard();
                          handleFlipCard(selectedCard);
                        }}
                      >
                        Flip Card
                      </motion.button>
                      <motion.button
                        className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCloseCard}
                      >
                        Next Card
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;