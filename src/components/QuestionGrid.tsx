import React from 'react';
import { motion } from 'framer-motion';
import GlareHover from './GlareHover';
import StarBorder from './StarBorder';

interface Props {
  playedQuestions: number[];
  onSelect: (id: number) => void;
  winner: string;
}

export default function QuestionGrid({ playedQuestions, onSelect, winner }: Props) {
  const allQuestions = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center justify-center space-y-12 w-full max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-widest drop-shadow-lg">
          C'est au tour de
        </h2>
        <div className="text-5xl md:text-7xl font-black text-brand-gold drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
          {winner} !
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-6 md:gap-8 w-full">
        {allQuestions.map((q) => {
          const isPlayed = playedQuestions.includes(q);
          return (
            <GlareHover 
              key={q} 
              borderRadius="1rem" 
              glareOpacity={0.3} 
              glareSize={150}
              className={isPlayed ? 'pointer-events-none' : ''}
            >
              <StarBorder color="#fbbf24" speed="5s" className="rounded-2xl w-full h-full">
                <motion.button
                  whileHover={!isPlayed ? { scale: 1.05 } : {}}
                  whileTap={!isPlayed ? { scale: 0.95 } : {}}
                  disabled={isPlayed}
                  onClick={() => onSelect(q)}
                  className={`
                    aspect-square w-full h-full flex items-center justify-center text-4xl md:text-6xl font-black rounded-2xl
                    transition-all duration-300
                    ${isPlayed 
                      ? 'bg-slate-800/50 text-slate-600 border-2 border-slate-700/50 cursor-not-allowed' 
                      : 'game-button text-white hover:text-brand-gold'
                    }
                  `}
                >
                  {q}
                </motion.button>
              </StarBorder>
            </GlareHover>
          );
        })}
      </div>
    </div>
  );
}
