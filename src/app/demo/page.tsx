'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ref, push } from 'firebase/database';
import { db } from '../lib/firebase'; // adjust if needed

export default function LabyrinthMysteryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const LabyrinthLogo = ({ size = 24 }: { size?: number }) => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="mx-auto"
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const submissionsRef = ref(db, 'labyrinth_invites');
      await push(submissionsRef, {
        name: data.name,
        email: data.email,
        code: data.code,
        reason: data.reason
      });

      setSubmitted(true);
    } catch (err) {
      console.error('[Firebase Error]', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden font-serif">
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
        style={{
          backgroundImage: 'radial-gradient(#00000011 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />

      <motion.div
        className="mb-10 text-center z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <LabyrinthLogo size={64} />
        <motion.h1
          className="mt-4 text-3xl md:text-4xl font-extrabold tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Invitation to the Labyrinth
        </motion.h1>
        <motion.p
          className="mt-2 text-sm text-gray-600 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          You have received this scroll because you are among the few. Speak your name and purpose—should the Gods will it, you may enter.
        </motion.p>
      </motion.div>

      {!submitted ? (
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white p-10 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-black/10 backdrop-blur-md z-10 space-y-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {[
            { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your honored name' },
            { id: 'email', label: 'Oracle Contact', type: 'email', placeholder: 'you@domain.com' },
            { id: 'code', label: 'Invitation Rune', type: 'text', placeholder: 'Secret glyph or phrase' }
          ].map(({ id, label, type, placeholder }, i) => (
            <motion.div
              key={id}
              className="flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + i * 0.3 }}
            >
              <label htmlFor={id} className="text-sm uppercase tracking-wide text-gray-600 mb-1">{label}</label>
              <input
                type={type}
                id={id}
                name={id}
                required
                placeholder={placeholder}
                className="bg-white border border-black/10 px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black/20 placeholder-gray-400"
              />
            </motion.div>
          ))}

          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2 }}
          >
            <label htmlFor="reason" className="text-sm uppercase tracking-wide text-gray-600 mb-1">Why are you worthy?</label>
            <textarea
              id="reason"
              name="reason"
              rows={4}
              required
              placeholder="Prove your devotion to the myth..."
              className="bg-white border border-black/10 px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black/20 placeholder-gray-400"
            ></textarea>
          </motion.div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full border border-black px-6 py-3 rounded-md font-semibold uppercase tracking-wide hover:bg-black hover:text-white transition-all disabled:opacity-60"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {isSubmitting ? 'Submitting...' : 'Send Your Plea'}
          </motion.button>
        </motion.form>
      ) : (
        <motion.div
          className="z-10 text-center bg-white border border-black/10 rounded-xl p-10 shadow-md max-w-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-extrabold tracking-widest uppercase mb-2">
            Submission Received
          </h2>
          <p className="text-gray-600 text-sm">
            We will get back to you soon. The scroll is in the hands of the divine.
          </p>
        </motion.div>
      )}
    </div>
  );
}
