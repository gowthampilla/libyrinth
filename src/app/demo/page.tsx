'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LabyrinthMysteryPage() {
  const [isHovered, setIsHovered] = useState(false);

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
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <header className="py-4 px-5 border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 mr-2">
              <LabyrinthLogo size={32} />
            </div>
            <h1 className="text-xl font-medium">Labyrinth</h1>
          </div>
          <button className="text-sm font-medium bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 whitespace-nowrap">
            Download
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center py-20">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="block text-gray-900">Awaken the</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-700">
                Gods of Olympus
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-md mx-auto md:mx-0 font-light leading-relaxed">
              A mythological journey through divine riddles, heroic quests, and ancient power. Labyrinth is your portal to the Greek world reborn.
            </p>
            <div className="flex flex-col xs:flex-row gap-4 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-black text-white px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 text-base shadow-lg hover:shadow-xl transition-shadow"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                <span>Download Now</span>
                <motion.span
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  →
                </motion.span>
              </motion.button>
              <button className="border-2 border-black px-6 py-3 rounded-full font-medium hover:bg-gray-50 text-base transition-colors">
                Gods Guide
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-red-700 rounded-3xl -z-10 rotate-2 opacity-20 blur-lg" />
            <div className="bg-white p-1 rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="h-8 bg-gray-100 flex items-center px-4 space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-gray-400" />
                ))}
              </div>
              <div className="p-4">
                <img
                  src="https://res.cloudinary.com/dfirczlir/image/upload/v1751025159/Untitled_design_30_yvudan.png"
                  alt="Labyrinth App Preview"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
              <div className="h-8 bg-gray-100" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-5 border-t border-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 mr-2">
                <LabyrinthLogo size={32} />
              </div>
              <h2 className="text-xl font-medium text-white">Labyrinth</h2>
            </div>
            <p className="text-gray-400 font-light">
              Journey through the myths of ancient Greece. Discover divine wisdom and heroic tales.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'instagram', 'github'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.018 15.622 5 12c.018-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-amber-500">Explore</h3>
            <ul className="space-y-2">
              {['Olympians', 'Heroes', 'Myths', 'Oracle'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-amber-500">Resources</h3>
            <ul className="space-y-2">
              {['Documentation', 'Guides', 'API', 'Community'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-amber-500">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Mount Olympus, Greece</li>
              <li className="text-gray-400">oracle@labyrinth.com</li>
              <li className="text-gray-400">+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Labyrinth. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}