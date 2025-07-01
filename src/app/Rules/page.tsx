'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';

export default function AboutGame() {
  const router = useRouter();

  return (
    <div className="min-h-screen text-white font-mono overflow-hidden relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dobqpjhd7/image/upload/v1751381281/ChatGPT_Image_Jul_1_2025_08_17_28_PM_booy7g.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Dark overlay for better readability */}
      <div className="fixed inset-0 z-0 bg-black/60" />

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl lg:max-w-4xl relative z-10">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center text-white/80 hover:text-white transition-colors text-sm md:text-base"
          >
            <FiArrowLeft className="mr-1 md:mr-2" size={16} />
            Back
          </button>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* New Logo Image */}
          <motion.div
            className="w-40 h-40 mb-6 md:mb-8" // Adjusted size for better proportion
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: 360,  // Keeping the rotation animation
              transition: {
                duration: 40,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            <img
              src="https://res.cloudinary.com/dobqpjhd7/image/upload/v1751380380/Untitled_design__32_-removebg-preview_1_en8m9t.png"
              alt="Labyrinth Logo"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </motion.div>

          <h1 className="text-2xl md:text-3xl font-light tracking-wider text-center mb-6 md:mb-8 text-white">
            ABOUT LABYRINTH
          </h1>

          <div className="w-full text-white/80 space-y-4 md:space-y-5 text-sm md:text-base leading-relaxed">
            <p className="text-center md:text-left md:px-4">
              Navigate evolving mazes that challenge your perception and problem-solving skills in this minimalist puzzle experience.
            </p>

            {/* Features Section - No Box */}
            <div className="mt-6">
              <h2 className="font-medium mb-3 md:mb-4 text-center md:text-left text-lg md:text-xl text-white">
                GAME FEATURES
              </h2>
              <ul className="space-y-2 md:space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mt-1.5 md:mt-2 mr-2 md:mr-3"></span>
                  <span>Procedurally generated mazes with increasing complexity</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mt-1.5 md:mt-2 mr-2 md:mr-3"></span>
                  <span>Hidden pathways and secret levels to discover</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mt-1.5 md:mt-2 mr-2 md:mr-3"></span>
                  <span>Time-based challenges with global leaderboards</span>
                </li>
              </ul>
            </div>

            {/* How to Play Section - No Box */}
            <div className="mt-4 md:mt-5">
              <h2 className="font-medium mb-3 md:mb-4 text-center md:text-left text-lg md:text-xl text-white">
                HOW TO PLAY
              </h2>
              <div className="space-y-2 md:space-y-3">
                <p className="flex items-start">
                  <span className="inline-block mr-2 text-white">•</span>
                  <span>Use arrow keys or touch controls to navigate</span>
                </p>
                <p className="flex items-start">
                  <span className="inline-block mr-2 text-white">•</span>
                  <span>Collect keys to unlock gates and reach the exit</span>
                </p>
                <p className="flex items-start">
                  <span className="inline-block mr-2 text-white">•</span>
                  <span>Watch for environmental clues that hint at solutions</span>
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 md:mt-10 w-full md:w-auto"
            >
              <button
                onClick={() => router.push('/demo')}
                className="w-full md:w-48 py-3 bg-white text-black hover:bg-gray-200 transition-colors text-sm md:text-base rounded-lg shadow-sm font-medium"
              >
                BEGIN JOURNEY
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}