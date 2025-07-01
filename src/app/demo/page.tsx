'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, push } from 'firebase/database';
import { db } from '../lib/firebase';

export default function LabyrinthMysteryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    code: '',
    reason: ''
  });
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const questions = [
    {
      id: 'name',
      label: 'What do they call you, wanderer?',
      type: 'text',
      placeholder: 'Speak your name...'
    },
    {
      id: 'email',
      label: 'How might the oracles reach you?',
      type: 'email',
      placeholder: 'Your contact sigil...'
    },
    {
      id: 'code',
      label: 'What secret rune grants you passage?',
      type: 'text',
      placeholder: 'Whisper the glyph...'
    },
    {
      id: 'reason',
      label: 'Why should the labyrinth accept you?',
      type: 'textarea',
      placeholder: 'Prove your worth...'
    }
  ];

  // Typing animation effect
  useEffect(() => {
    setIsTypingComplete(false);
    const currentQuestion = questions[currentQuestionIndex].label;
    let i = 0;
    setTypedText('');

    const typingInterval = setInterval(() => {
      if (i < currentQuestion.length) {
        setTypedText(prev => prev + currentQuestion.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentQuestionIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isTypingComplete) {
      e.preventDefault();
      if (currentQuestionIndex < questions.length - 1) {
        handleNext();
      } else if (currentQuestionIndex === questions.length - 1) {
        handleSubmit(e);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const allAnswered = questions.every(q => formData[q.id as keyof typeof formData].trim() !== '');
    if (!allAnswered) {
      alert('Please answer all questions before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionsRef = ref(db, 'labyrinth_invites');
      await push(submissionsRef, formData);
      setSubmitted(true);
    } catch (err) {
      console.error('[Firebase Error]', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden font-serif">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dobqpjhd7/image/upload/v1751379989/Jul_1_2025_07_56_01_PM_efuomf.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <motion.div
        className="mb-6 text-center z-10" // Reduced margin-bottom
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Logo Container - Made smaller and more elegant */}
        <motion.div
          className="w-40 h-40 mx-auto" // Reduced from w-64 h-64
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration: 0.8,
              ease: "easeOut"
            }
          }}
        >
          <img
            src="https://res.cloudinary.com/dobqpjhd7/image/upload/v1751380380/Untitled_design__32_-removebg-preview_1_en8m9t.png"
            alt="Labyrinth Logo"
            className="w-full h-full object-contain drop-shadow-lg" // Added subtle shadow
          />
        </motion.div>
        
        {/* Title with improved spacing and animation */}
        <motion.h1
          className="mt-6 text-2xl md:text-3xl font-bold tracking-wider uppercase" // Slightly smaller text
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              delay: 0.3,
              duration: 0.8,
              ease: "easeOut"
            }
          }}
        >
          The Labyrinth Awaits
        </motion.h1>
      </motion.div>

      {!submitted ? (
        <motion.div
          className="w-full max-w-md bg-black bg-opacity-70 p-8 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm z-10 space-y-6" // Slightly more compact
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              delay: 0.8, 
              duration: 0.6,
              ease: "easeOut"
            }
          }}
        >
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col space-y-5" // Tighter spacing
              >
                <div>
                  <label 
                    htmlFor={questions[currentQuestionIndex].id} 
                    className="text-base font-medium mb-2 h-10 flex items-center" // Smaller text and height
                  >
                    {typedText}
                    {!isTypingComplete ? (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="ml-1"
                      >
                        |
                      </motion.span>
                    ) : null}
                  </label>
                  
                  {questions[currentQuestionIndex].type === 'textarea' ? (
                    <textarea
                      id={questions[currentQuestionIndex].id}
                      name={questions[currentQuestionIndex].id}
                      rows={3} // Smaller textarea
                      required
                      value={formData[questions[currentQuestionIndex].id as keyof typeof formData]}
                      onChange={handleInputChange}
                      placeholder={questions[currentQuestionIndex].placeholder}
                      className="w-full bg-black/40 border border-white/20 px-3 py-2 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-white/30 placeholder-white/50 text-sm" // Refined styling
                      disabled={!isTypingComplete}
                      autoFocus
                    />
                  ) : (
                    <input
                      type={questions[currentQuestionIndex].type}
                      id={questions[currentQuestionIndex].id}
                      name={questions[currentQuestionIndex].id}
                      required
                      value={formData[questions[currentQuestionIndex].id as keyof typeof formData]}
                      onChange={handleInputChange}
                      placeholder={questions[currentQuestionIndex].placeholder}
                      className="w-full bg-black/40 border border-white/20 px-3 py-2 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-white/30 placeholder-white/50 text-sm" // Consistent styling
                      disabled={!isTypingComplete}
                      autoFocus
                    />
                  )}
                </div>

                <div className="flex justify-between gap-3">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0 || !isTypingComplete}
                    className="px-3 py-1.5 border border-white/20 rounded-md disabled:opacity-50 transition-all hover:bg-white/10 text-sm flex-1" // More compact buttons
                  >
                    Previous
                  </button>

                  {currentQuestionIndex < questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!isTypingComplete || !formData[questions[currentQuestionIndex].id as keyof typeof formData]}
                      className="px-3 py-1.5 bg-white text-black rounded-md disabled:opacity-60 transition-all hover:bg-white/90 text-sm flex-1" // More compact buttons
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !isTypingComplete}
                      className="px-3 py-1.5 bg-white text-black rounded-md disabled:opacity-60 transition-all hover:bg-white/90 text-sm flex-1" // More compact buttons
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </form>
        </motion.div>
      ) : (
        <motion.div
          className="z-10 text-center bg-black/70 border border-white/10 rounded-xl p-8 shadow-md max-w-md backdrop-blur-sm" // More compact
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-bold tracking-wider uppercase mb-2"> {/* Smaller heading */}
            Your Path is Recorded
          </h2>
          <p className="text-white/80 text-xs"> {/* Smaller text */}
            The labyrinth whispers of your approach. Await our sign when the stars align.
          </p>
        </motion.div>
      )}
    </div>
  );
}