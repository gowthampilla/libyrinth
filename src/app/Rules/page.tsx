'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RulesPage() {
  const rules = [
    "1. The Labyrinth is sacred ground. Enter with respect or not at all.",
    "2. Never reveal the full secrets of the OSSPTS to outsiders.",
    "3. Your journey is yours alone. Comparisons breed weakness.",
    "4. The path changes for each seeker. What worked before may not work again.",
    "5. When the stars align, the gates will open. Impatience is the first trap.",
    "6. Truth hides in patterns. Observe the cycles of moon and memory.",
    "7. Four digits bind you to this realm. Guard them but do not worship them.",
    "8. The keepers watch in silence. Prove your worth through action, not words.",
    "9. To leave is to abandon all progress. Return only when called.",
    "10. The final rule cannot be written, only discovered at journey's end."
  ];

  return (
    <div className="min-h-screen text-white font-sans flex flex-col items-center px-4 py-16 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 bg-black/80">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dobqpjhd7/image/upload/v1751379989/Jul_1_2025_07_56_01_PM_efuomf.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Back Button - Top Left */}
      <Link 
        href="/" 
        className="fixed top-4 left-4 z-50 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-sm sm:text-base backdrop-blur-sm"
      >
        Back
      </Link>

      {/* Header */}
      <motion.div
        className="mb-8 text-center z-10 w-full px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="w-32 h-32 sm:w-40 sm:h-40 mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <img
            src="https://res.cloudinary.com/dobqpjhd7/image/upload/v1751380380/Untitled_design__32_-removebg-preview_1_en8m9t.png"
            alt="Labyrinth Logo"
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </motion.div>

        <motion.h1
          className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-bold tracking-wider uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          The Sacred Rules
        </motion.h1>
      </motion.div>

      {/* Rules Content */}
      <motion.div
        className="w-full max-w-md bg-black/70 p-6 sm:p-8 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm z-10 mx-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="flex items-start"
            >
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white/20 mr-3 mt-1"></div>
              <p className="text-sm sm:text-base text-white/90">{rule}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 pt-4 border-t border-white/10 text-center"
        >
          <p className="text-xs sm:text-sm text-white/60">
            Violation of these rules may result in banishment from the Labyrinth
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}