'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, push } from 'firebase/database';
import { db } from '../lib/firebase';

interface FormData {
  name: string;
  email: string;
  phoneLastFour: string;
  acceptRules: boolean;
}

export default function LabyrinthMysteryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phoneLastFour: '',
    acceptRules: false
  });
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const questions = [
    {
      id: 'name',
      label: 'What is your full name, seeker?',
      type: 'text',
      placeholder: 'Enter your complete name...'
    },
    {
      id: 'email',
      label: 'What is your email address?',
      type: 'email',
      placeholder: 'Enter your email...'
    },
    {
      id: 'phoneLastFour',
      label: 'What are the last 4 digits of your phone number?',
      type: 'text',
      placeholder: 'Last 4 digits only...',
      maxLength: 4
    },
    {
      id: 'acceptRules',
      label: 'Do you accept all terms and conditions?',
      type: 'checkbox',
      text: 'I accept all rules and conditions of participation'
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
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isTypingComplete && currentQuestionIndex !== questions.length - 1) {
      e.preventDefault();
      if (currentQuestionIndex < questions.length - 1) {
        handleNext();
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
    
    const allAnswered = questions.every(q => {
      if (q.id === 'acceptRules') {
        return formData.acceptRules === true;
      } else {
        const value = formData[q.id as keyof Omit<FormData, 'acceptRules'>];
        return typeof value === 'string' && value.trim() !== '';
      }
    });
    
    if (!allAnswered) {
      alert('Please complete all questions and accept the terms');
      return;
    }

    // Validate phone last four digits
    if (!/^\d{4}$/.test(formData.phoneLastFour)) {
      alert('Please enter exactly 4 digits for your phone number');
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionsRef = ref(db, 'labyrinth_registrations');
      await push(submissionsRef, formData);
      setSubmitted(true);
    } catch (err) {
      console.error('[Firebase Error]', err);
      alert('An error occurred. Please try again.');
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
        className="mb-10 text-center z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Logo Image */}
        <motion.div
          className="w-64 h-64 mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://res.cloudinary.com/dobqpjhd7/image/upload/v1751380380/Untitled_design__32_-removebg-preview_1_en8m9t.png"
            alt="Labyrinth Logo"
            className="w-full h-full object-contain"
          />
        </motion.div>
        
        <motion.h1
          className="mt-4 text-3xl md:text-4xl font-extrabold tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          The Labyrinth Awaits
        </motion.h1>
      </motion.div>

      {!submitted ? (
        <motion.div
          className="w-full max-w-xl bg-black bg-opacity-70 p-10 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-md z-10 space-y-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col space-y-6"
              >
                <div>
                  <label 
                    htmlFor={questions[currentQuestionIndex].id} 
                    className="text-lg font-medium mb-2 h-12 flex items-center"
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
                  
                  {questions[currentQuestionIndex].type === 'checkbox' ? (
                    <div className="flex items-center mt-4">
                      <input
                        type="checkbox"
                        id={questions[currentQuestionIndex].id}
                        name={questions[currentQuestionIndex].id}
                        required
                        checked={formData.acceptRules}
                        onChange={handleInputChange}
                        className="w-5 h-5 mr-3 rounded bg-black/30 border border-white/20 focus:ring-white/20"
                        disabled={!isTypingComplete}
                      />
                      <label htmlFor={questions[currentQuestionIndex].id} className="text-sm opacity-80">
                        {questions[currentQuestionIndex].text}
                      </label>
                    </div>
                  ) : (
                    <input
                      type={questions[currentQuestionIndex].type}
                      id={questions[currentQuestionIndex].id}
                      name={questions[currentQuestionIndex].id}
                      required={questions[currentQuestionIndex].id !== 'acceptRules'}
                      value={formData[questions[currentQuestionIndex].id as keyof Omit<FormData, 'acceptRules'>]}
                      onChange={handleInputChange}
                      placeholder={questions[currentQuestionIndex].placeholder}
                      maxLength={questions[currentQuestionIndex].maxLength}
                      className="w-full bg-black/30 border border-white/20 px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20 placeholder-white/50"
                      disabled={!isTypingComplete}
                      autoFocus
                    />
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0 || !isTypingComplete}
                    className="px-4 py-2 border border-white/20 rounded-md disabled:opacity-50 transition-colors hover:bg-white/10"
                  >
                    Previous
                  </button>

                  {currentQuestionIndex < questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!isTypingComplete || 
                        (questions[currentQuestionIndex].id !== 'acceptRules' && 
                         !formData[questions[currentQuestionIndex].id as keyof Omit<FormData, 'acceptRules'>])}
                      className="px-4 py-2 bg-white text-black rounded-md disabled:opacity-60 transition-colors hover:bg-white/90"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !isTypingComplete || !formData.acceptRules}
                      className="px-4 py-2 bg-white text-black rounded-md disabled:opacity-60 transition-colors hover:bg-white/90"
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
          className="z-10 text-center bg-black/70 border border-white/10 rounded-xl p-10 shadow-md max-w-xl backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-extrabold tracking-widest uppercase mb-2">
            Your Path is Recorded
          </h2>
          <p className="text-white/80 mb-4">
            The labyrinth whispers of your approach. Await our sign when the stars align.
          </p>
          <p className="text-sm text-white/60">
            We've sent confirmation to {formData.email}
          </p>
        </motion.div>
      )}
    </div>
  );
}