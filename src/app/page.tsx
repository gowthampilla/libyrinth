'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function LabyrinthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowOptions(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  interface LabyrinthLogoProps {
    size?: number;
    className?: string;
  }

  const LabyrinthLogo = ({ size = 24, className = '' }: LabyrinthLogoProps) => (
    <motion.svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={`mx-auto ${className}`}
      animate={{ rotate: 360 }}
      transition={{ 
        duration: 30,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M50 5a45 45 0 0 1 0 90M50 15a35 35 0 0 0 0 70M50 25a25 25 0 0 1 0 50M50 35a15 15 0 0 0 0 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M50 50L50 5M65 20L50 50M80 35L50 50M80 65L50 50M65 80L50 50M35 80L50 50M20 65L50 50M20 35L50 50M35 20L50 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="50" cy="50" r="3" fill="currentColor" />
    </motion.svg>
  );

  const handleOptionSelect = (path: string) => {
    setShowOptions(false);
    setTimeout(() => {
      router.push(path);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-900 overflow-hidden font-sans">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 bg-white z-50 flex items-center justify-center flex-col px-4"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: {
                  duration: 2,
                  ease: [0.22, 1, 0.36, 1]
                }
              }}
            >
              <LabyrinthLogo size={60} className="md:size-[120px]" />
            </motion.div>
            <motion.h1
              className="text-3xl md:text-5xl mt-4 text-black tracking-widest text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                transition: {
                  delay: 1,
                  duration: 2,
                  ease: [0.22, 1, 0.36, 1]
                }
              }}
            >
              LABYRINTH
            </motion.h1>
            <motion.p className="mt-2 text-gray-600 text-xs md:text-base tracking-wide uppercase">
              The Path Begins
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {showOptions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 bg-white z-40 flex items-center justify-center flex-col px-4"
        >
          <div className="flex flex-col items-center justify-center w-full px-4">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <LabyrinthLogo size={80} className="md:size-[160px]" />
            </motion.div>
            <motion.h1 className="text-3xl md:text-5xl mt-6 text-black tracking-widest text-center">
              LABYRINTH
            </motion.h1>
            <motion.p className="mt-3 text-gray-600 mb-8 text-center text-base md:text-lg">
              Choose your path
            </motion.p>
            
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-xs md:max-w-md md:gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOptionSelect('/demo')}
                className="px-6 py-3 md:px-8 md:py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors text-base md:text-lg w-full"
              >
                Enter the Labyrinth
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOptionSelect('/Rules')}
                className="px-6 py-3 md:px-8 md:py-4 bg-white text-black border border-black md:border-2 rounded-full font-medium hover:bg-gray-100 transition-colors text-base md:text-lg w-full"
              >
                Learn the Rules
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {!isLoading && !showOptions && (
        <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <LabyrinthLogo size={80} className="md:size-[160px]" />
            <p className="mt-4 text-gray-600 text-base md:text-lg">Entering the Labyrinth...</p>
          </motion.div>
        </main>
      )}
    </div>
  );
}