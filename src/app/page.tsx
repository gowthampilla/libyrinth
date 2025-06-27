'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function LabyrinthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.push('/demo'); // Directly navigate to demo after loading
    }, 4000);
    return () => clearTimeout(timer);
  }, [router]);

  const LabyrinthLogo = ({ size = 24 }: { size?: number }) => (
    <motion.svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className="mx-auto"
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-900 overflow-hidden font-sans">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 bg-white z-50 flex items-center justify-center flex-col"
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
              <LabyrinthLogo size={60} />
            </motion.div>
            <motion.h1
              className="text-4xl mt-4 text-black tracking-widest"
              initial={{ y: 30, opacity: 0 }}
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
            <motion.p className="mt-2 text-gray-600 text-sm tracking-wide uppercase">
              The Path Begins
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* This fallback content will only show very briefly during redirect */}
      {!isLoading && (
        <main className="relative z-10 min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <LabyrinthLogo size={80} />
            <p className="mt-4 text-gray-600">Entering the Labyrinth...</p>
          </motion.div>
        </main>
      )}
    </div>
  );
}
