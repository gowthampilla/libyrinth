'use client';

import { motion } from 'framer-motion';

export default function ApkDownloadPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8">
      <motion.h1
        className="text-3xl sm:text-5xl font-extrabold mb-6 text-cyan-400 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Download the App
      </motion.h1>

      <motion.p
        className="text-center text-sm text-gray-300 max-w-md mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Click the button below to download the latest version of our app and begin your journey.
      </motion.p>

      <motion.a
        href="/app-release.apk" // 👈 ensure your .apk is in /public
        download
        className="bg-cyan-400 text-black font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-cyan-300 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Download Now
      </motion.a>
    </div>
  );
}
