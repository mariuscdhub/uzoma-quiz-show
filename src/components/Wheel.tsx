import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlareHover from './GlareHover';
import StarBorder from './StarBorder';

const SECTIONS = ["Marius", "Uzoma", "Mystère", "Public"];
const COLORS = ["#1e3a8a", "#16a34a", "#fbbf24", "#b91c1c"];

export default function Wheel({ onResult }: { onResult: (winner: string) => void }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    const spins = 5 + Math.random() * 5; // 5 to 10 spins
    const extraAngle = Math.random() * 360; // random landing
    const newRotation = rotation + (spins * 360) + extraAngle;
    
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const finalAngle = newRotation % 360;
      const adjustedAngle = (360 - finalAngle) % 360;
      const sectionIndex = Math.floor(adjustedAngle / (360 / SECTIONS.length));
      onResult(SECTIONS[sectionIndex]);
    }, 4500);
  };

  const createSlice = (index: number) => {
    const angle = 360 / SECTIONS.length;
    const startAngle = index * angle;
    const endAngle = (index + 1) * angle;
    
    const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
    const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
    const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
    const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);

    const largeArcFlag = angle > 180 ? 1 : 0;

    return (
      <g key={index}>
        <path
          d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
          fill={COLORS[index % COLORS.length]}
          stroke="#0f172a"
          strokeWidth="1"
        />
        {/* Calculate text position in the middle of the slice */}
        <text
          x="50"
          y="20"
          fill="white"
          fontSize="6"
          fontWeight="bold"
          textAnchor="middle"
          transform={`rotate(${startAngle + angle / 2} 50 50)`}
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
        >
          {SECTIONS[index]}
        </text>
      </g>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <div className="relative w-80 h-80 md:w-[500px] md:h-[500px]">
        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]" />
        
        {/* Wheel container */}
        <motion.div
          className="w-full h-full rounded-full border-[12px] border-brand-silver-dark shadow-[0_0_50px_rgba(251,191,36,0.4)] bg-slate-900"
          animate={{ rotate: rotation }}
          transition={{ duration: 4.5, ease: [0.1, 0.7, 0.1, 1] }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
            {SECTIONS.map((_, i) => createSlice(i))}
            <circle cx="50" cy="50" r="10" fill="#fbbf24" stroke="#fff" strokeWidth="2" />
            <circle cx="50" cy="50" r="4" fill="#0f172a" />
          </svg>
        </motion.div>
      </div>

      <GlareHover borderRadius="9999px" glareOpacity={0.4} glareSize={150}>
        <StarBorder color="#fbbf24" speed="4s" className="rounded-full">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="game-button px-16 py-6 text-4xl font-black rounded-full uppercase tracking-widest text-brand-gold disabled:opacity-50 hover:scale-105 active:scale-95"
          >
            {isSpinning ? '...' : 'SPIN'}
          </button>
        </StarBorder>
      </GlareHover>
    </div>
  );
}
