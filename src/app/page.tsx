'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function LabyrinthPage() {
  const [showLogo, setShowLogo] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
      router.push('/Thetrail');
    }, 3000); // Show logo for 4 seconds then navigate

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Full-screen background image */}
      <div 
        className="fixed inset-0"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dobqpjhd7/image/upload/v1751378881/ChatGPT_Image_Jul_1_2025_07_37_52_PM_qi51wr.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1
        }}
      />

      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative"
            style={{
              width: 'min(60vw, 300px)',
              height: 'min(60vw, 300px)'
            }}
          >
            <img
              src="https://res.cloudinary.com/dobqpjhd7/image/upload/v1751377346/photo_6278223030123612362_y-removebg-preview_zlheaj.png"
              alt="OSSPTS Logo"
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}