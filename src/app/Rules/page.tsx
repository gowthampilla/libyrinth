'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RulesPage() {
  const rules = [
    "The Labyrinth is sacred ground. Enter with respect or not at all.",
    "Never reveal the full secrets of the OSSPTS to outsiders.",
    "Your journey is yours alone. Comparisons breed weakness.",
    "The path changes for each seeker. What worked before may not work again.",
    "When the stars align, the gates will open. Impatience is the first trap.",
    "Truth hides in patterns. Observe the cycles of moon and memory.",
    "Four digits bind you to this realm. Guard them but do not worship them.",
    "The keepers watch in silence. Prove your worth through action, not words.",
    "To leave is to abandon all progress. Return only when called.",
    "The final rule cannot be written, only discovered at journey's end."
  ];

  return (
    <div className="min-h-screen text-amber-50 font-serif flex flex-col items-center px-4 py-16 relative overflow-hidden">
      {/* Background with better blending */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"
          style={{
            backgroundImage: "url('https://i.pinimg.com/736x/f3/2c/84/f32c84cda7433bb1337668ec1645fe30.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            mixBlendMode: 'multiply'
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Back Button */}
      <Link 
        href="/" 
        className="fixed top-4 left-4 z-50 px-4 py-2 border border-amber-400/30 rounded-lg hover:bg-amber-400/10 transition-colors text-sm font-medium tracking-wider"
      >
        ← Back to Labyrinth
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
            className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
          />
        </motion.div>

        <motion.h1
          className="mt-6 text-3xl sm:text-5xl font-medium tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            fontFamily: "'EB Garamond', serif",
            textShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
            letterSpacing: '0.1em'
          }}
        >
          The Sacred Rules
        </motion.h1>
      </motion.div>

      {/* Rules Content */}
      <motion.div
        className="w-full max-w-2xl z-10 mx-4 space-y-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {rules.map((rule, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
            className="flex items-start group"
          >
            <div className="flex-shrink-0 text-2xl mr-4 mt-1 text-amber-400/80 font-medium transition-all group-hover:text-amber-300">
              {index + 1}.
            </div>
            <p 
              className="text-xl sm:text-2xl text-amber-50/90 leading-relaxed tracking-wide transition-all group-hover:text-amber-100"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                textShadow: '0 0 5px rgba(0,0,0,0.3)'
              }}
            >
              {rule}
            </p>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 pt-8 border-t border-amber-400/20 text-center"
        >
          <p 
            className="text-base sm:text-lg text-amber-400/70 italic tracking-wider"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Violation of these rules may result in banishment from the Labyrinth
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}