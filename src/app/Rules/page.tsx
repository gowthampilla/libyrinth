'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

type Rule = {
  title: string;
  text: string;
  glyph: string;
};

const rules: Rule[] = [
  { title: "Aegis of Zeus", text: "The will of the king shields those in his domain. Power flows from order.", glyph: "⚡" },
  { title: "Sands of Chronos", text: "Every move shifts time forward. Patience is the key to mastery.", glyph: "⏳" },
  { title: "Mantle of Hestia", text: "Corners hold the hearth. Guard your home, and it will guard you.", glyph: "🏛" },
  { title: "Trident of Poseidon", text: "Diagonals flow like tides. Ride them swiftly or be swept away.", glyph: "🌊" },
  { title: "Wings of Hermes", text: "Leap with cunning and grace. The unexpected strike wins the war.", glyph: "🪽" },
  { title: "Flame of Hephaestus", text: "Start low, build strong. Fire becomes forge in enemy lands.", glyph: "🔥" },
  { title: "Oracle of Delphi", text: "Some truths reveal only when threatened. Listen when the gods warn you.", glyph: "🌀" },
  { title: "Judgment of Themis", text: "Finality is divine. When the throne falls, the game ends in fate's hands.", glyph: "⚖️" }
];

export default function MythicRulesBoard() {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-neutral-900 text-white p-6 flex flex-col items-center font-serif">
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-widest text-white uppercase">
          Codex of the Olympians
        </h1>
        <p className="text-neutral-400 italic text-base mt-2 max-w-xl mx-auto">
          A divine ledger of sacred tactics — where each square is etched with immortal wisdom.
        </p>
      </header>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 max-w-6xl mx-auto w-full px-4">
        {Array.from({ length: 64 }).map((_, idx) => {
          const rule = rules[idx % rules.length];
          const isDark = (Math.floor(idx / 8) + idx) % 2 === 0;
          const isActive = activeIdx === idx;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.025, duration: 0.5 }}
              onClick={() => setActiveIdx(isActive ? null : idx)}
              className={`
                relative h-36 sm:h-40 rounded-xl border overflow-hidden transition duration-300 transform cursor-pointer 
                ${isActive ? 'bg-white text-black border-white scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)] z-10' : 
                isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-900 border-neutral-600'}
              `}
            >
              <div className="flex flex-col justify-center items-center h-full px-2 text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-1">{rule.glyph}</div>
                <div className="text-[13px] sm:text-[15px] font-semibold uppercase tracking-wider leading-tight">
                  {rule.title}
                </div>
              </div>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-2 left-2 right-2 bg-white text-black text-xs rounded p-2 shadow-lg font-mono"
                >
                  {rule.text}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/demo')}
        className="mt-16 bg-white text-black px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-all text-lg tracking-wider border border-black"
      >
        Begin the Quest →
      </motion.button>
    </div>
  );
}
