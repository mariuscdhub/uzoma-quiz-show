import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Wheel from './components/Wheel';
import QuestionGrid from './components/QuestionGrid';
import Quiz from './components/Quiz';
import { questions } from './data/questions';
import GlareHover from './components/GlareHover';
import StarBorder from './components/StarBorder';
import ChromaGrid from './components/ChromaGrid';

type ScreenState = 'wheel' | 'selection' | 'quiz';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('wheel');
  const [winner, setWinner] = useState<string>('');
  const [playedQuestions, setPlayedQuestions] = useState<number[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});

  const handleWheelResult = (selectedWinner: string) => {
    setWinner(selectedWinner);
    setTimeout(() => {
      setScreen('selection');
    }, 2500); // Pause to celebrate the winner before transitioning
  };

  const handleQuestionSelect = (id: number) => {
    setCurrentQuestionId(id);
    setScreen('quiz');
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    if (currentQuestionId) {
      setPlayedQuestions((prev) => [...prev, currentQuestionId]);
    }
    
    if (isCorrect && winner && winner !== 'Mystère') {
      setScores(prev => ({
        ...prev,
        [winner]: (prev[winner] || 0) + 1
      }));
    }

    setScreen('wheel');
    setWinner('');
    setCurrentQuestionId(null);
  };

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <ChromaGrid 
          columns={6} 
          rows={4} 
          radius={400} 
          className="opacity-40"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-slate-950/60 pointer-events-none"></div>
      </div>

      {/* Scoreboard */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50 flex flex-col gap-2">
        {Object.entries(scores).map(([player, score]) => (
          <div key={player} className="bg-slate-900/80 backdrop-blur-md border border-brand-gold/50 px-4 py-2 rounded-full flex items-center justify-between gap-4 shadow-lg">
            <span className="text-white font-bold">{player}</span>
            <span className="bg-brand-gold text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-black">
              {score}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {screen === 'wheel' && (
          <motion.div
            key="wheel"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-brand-gold to-yellow-600 mb-12 uppercase tracking-widest drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] text-center">
              Qui veut répondre<br/><span className="text-white text-3xl md:text-5xl drop-shadow-md">à la question ?</span>
            </h1>
            <Wheel onResult={handleWheelResult} />
            
            <AnimatePresence>
              {winner && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="fixed bottom-10 z-50"
                  >
                    <GlareHover borderRadius="9999px" glareOpacity={0.4} glareSize={150}>
                      <StarBorder color="#fbbf24" speed="4s" className="rounded-full">
                        <div className="bg-slate-900 border-4 border-brand-gold px-12 py-6 rounded-full shadow-[0_0_40px_rgba(251,191,36,0.6)]">
                          <span className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest">{winner} !</span>
                        </div>
                      </StarBorder>
                    </GlareHover>
                  </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {screen === 'selection' && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-center items-center h-full"
          >
            <QuestionGrid 
              playedQuestions={playedQuestions} 
              onSelect={handleQuestionSelect}
              winner={winner}
            />
          </motion.div>
        )}

        {screen === 'quiz' && currentQuestion && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="w-full h-full flex flex-col justify-center"
          >
            <Quiz 
              question={currentQuestion} 
              onComplete={handleQuizComplete} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
