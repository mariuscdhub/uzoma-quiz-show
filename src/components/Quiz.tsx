import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, Answer } from '../data/questions';


interface Props {
  question: Question;
  onComplete: (isCorrect: boolean) => void;
}

export default function Quiz({ question, onComplete }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(true);
  const [showPenalty, setShowPenalty] = useState(false);

  useEffect(() => {
    if (!timerActive || selectedAnswer) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAnswerClick('TIMEOUT'); // Treat timeout as no answer
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, selectedAnswer]);

  const handleAnswerClick = (answerId: string) => {
    if (selectedAnswer) return; // Prevent multiple clicks
    setSelectedAnswer(answerId);
    setTimerActive(false);
    
    // Reveal correct answer after a short dramatic pause
    setTimeout(() => {
      setIsRevealed(true);
    }, 1500);
  };

  const getButtonClass = (ans: Answer) => {
    if (!selectedAnswer) return 'game-button text-white hover:text-brand-gold';
    
    if (isRevealed) {
      if (ans.isCorrect) return 'game-button correct text-white';
      if (selectedAnswer === ans.id && !ans.isCorrect) return 'game-button incorrect text-white';
      return 'game-button opacity-50 text-slate-300'; // Dim others
    }

    // Pending reveal state
    if (selectedAnswer === ans.id) return 'bg-brand-gold text-slate-900 border-white shadow-[0_0_20px_rgba(251,191,36,0.8)] scale-105';
    return 'game-button opacity-50 text-slate-300';
  };

  const handleNextClick = () => {
    const selectedAns = question.answers.find(a => a.id === selectedAnswer);
    const isCorrect = selectedAns ? selectedAns.isCorrect : false;

    if (!isCorrect && !showPenalty) {
      setShowPenalty(true);
      return;
    }

    onComplete(isCorrect);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 flex flex-col min-h-[80vh] justify-start py-8 relative">
      
      {/* Timer UI */}
      <div className="w-full max-w-2xl mx-auto mb-4">
        <div className="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden border border-slate-700">
          <motion.div 
            className="h-full bg-brand-gold"
            initial={{ width: '100%' }}
            animate={{ width: `${(timeLeft / 60) * 100}%` }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </div>
        <div className={`text-center mt-2 font-black text-3xl ${timeLeft <= 10 ? 'text-brand-red animate-pulse' : 'text-brand-gold'}`}>
          {timeLeft}
        </div>
      </div>

      {question.isMystery && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-red text-white px-8 py-2 rounded-full font-black text-2xl uppercase tracking-widest shadow-[0_0_30px_rgba(239,68,68,0.8)] z-50 whitespace-nowrap"
        >
          🚨 Mystery Question 🚨
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
            <div className="bg-slate-900 border-4 border-slate-700/50 shadow-[0_0_20px_rgba(255,255,255,0.1)] question-box p-6 md:p-8 text-center rounded-2xl w-full h-full">
              <span className="text-brand-gold font-bold tracking-widest uppercase mb-4 block">Question {question.id} : {question.title}</span>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-md py-4">
                {question.text}
              </h2>
            </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {question.answers.map((ans, idx) => (
              <motion.button
                key={ans.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                onClick={() => handleAnswerClick(ans.id)}
                disabled={!!selectedAnswer}
                className={`
                  w-full text-left p-5 md:p-8 rounded-full text-xl md:text-2xl font-bold
                  flex items-center space-x-4 md:space-x-6 transition-all duration-300
                  ${getButtonClass(ans)}
                  ${selectedAnswer === ans.id ? 'scale-105' : ''}
                `}
              >
                <span className="text-brand-gold font-black" translate="no">{ans.id}:</span>
                <span className="flex-1">{ans.text}</span>
              </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {isRevealed && !showPenalty && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex justify-center mt-16"
          >
                <button
                  onClick={handleNextClick}
                  className="game-button correct px-12 py-4 rounded-full text-2xl font-black uppercase tracking-widest text-white hover:scale-105"
                >
                  Next ➔
                </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPenalty && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <div className="max-w-2xl w-full">
                  <div className="bg-slate-900 border-4 border-brand-red p-10 md:p-16 rounded-3xl text-center shadow-[0_0_50px_rgba(239,68,68,0.5)]">
                    <h2 className="text-5xl md:text-7xl font-black text-brand-red mb-6 uppercase tracking-widest">
                      PENALTY!
                    </h2>
                    <p className="text-xl md:text-3xl text-white font-bold mb-10 leading-relaxed">
                      {question.penalty || "You must perform a penalty!"}
                    </p>
                    <button
                      onClick={handleNextClick}
                      className="game-button incorrect px-12 py-4 rounded-full text-2xl font-black uppercase tracking-widest text-white hover:scale-105"
                    >
                      Next Question ➔
                    </button>
                  </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
