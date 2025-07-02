'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, push } from 'firebase/database';
import { db } from '../lib/firebase';
import Link from 'next/link';

type FormData = {
  name: string;
  email: string;
  address: string;
  phoneLast4: string;
  reason: string;
  acceptRules: boolean;
};

type Question = {
  id: keyof FormData;
  type: string;
  placeholder: string;
  required?: boolean;
};

const questions: Question[] = [
  { id: 'name', type: 'text', placeholder: 'State your name, warrior...', required: true },
  { id: 'email', type: 'email', placeholder: 'Any mail..? Your contact sigil...', required: true },
  { id: 'address', type: 'text', placeholder: 'Where does your presence reside? Write your current realm...', required: true },
  { id: 'phoneLast4', type: 'text', placeholder: 'Reveal the last 4 digits of your rune stone (phone number)...', required: true },
  { id: 'reason', type: 'textarea', placeholder: 'Why should the OSSPTS accept you? Prove your worth...', required: true },
  { id: 'acceptRules', type: 'checkbox', placeholder: 'Do you accept the sacred rules of the Labyrinth?', required: true },
];

const initialFormData: FormData = {
  name: '',
  email: '',
  address: '',
  phoneLast4: '',
  reason: '',
  acceptRules: false,
};

export default function LabyrinthMysteryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateCurrentField = (): boolean => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion.required) return true;

    const value = formData[currentQuestion.id];
    return currentQuestion.type === 'checkbox' ? value === true : String(value).trim() !== '';
  };

  const handleNext = () => {
    if (!validateCurrentField()) return;
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allAnswered = questions.every((q) => {
      const value = formData[q.id];
      return q.required ? (q.type === 'checkbox' ? value === true : String(value).trim() !== '') : true;
    });

    if (!allAnswered) {
      alert('Please complete all required fields to proceed.');
      return;
    }

    setIsSubmitting(true);
    try {
      const submissionsRef = ref(db, 'labyrinth_invites');
      await push(submissionsRef, formData);
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInputField = (question: Question) => {
    const commonProps = {
      name: question.id,
      onChange: handleInputChange,
      placeholder: question.placeholder,
      required: question.required,
      autoFocus: true,
      className: 'w-full px-4 py-3 rounded-lg text-amber-50 focus:outline-none focus:ring-1 focus:ring-amber-400/30 placeholder-amber-200/50 text-lg tracking-wide',
    };

    switch (question.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            value={formData[question.id] as string}
            rows={4}
            className={`${commonProps.className} bg-transparent border border-amber-400/30 backdrop-blur-sm`}
          />
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name={question.id}
              checked={formData[question.id] as boolean}
              onChange={handleInputChange}
              className="h-5 w-5 rounded border-amber-400/50 bg-transparent focus:ring-amber-400"
              required={question.required}
            />
            <label className="text-lg text-amber-50/90 tracking-wide">{question.placeholder}</label>
          </div>
        );
      default:
        return (
          <input
            type={question.type}
            {...commonProps}
            value={formData[question.id] as string}
            className={`${commonProps.className} bg-transparent border-b border-amber-400/30`}
          />
        );
    }
  };

  return (
    <div className="min-h-screen text-amber-50 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://i.pinimg.com/736x/9d/b7/3d/9db73dec4edf4c5d26150216f4bea61c.jpg')",
            filter: 'brightness(0.7) contrast(1.2)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Rules Button */}
      <Link 
        href="/Rules" 
        className="fixed top-4 right-4 z-50 px-4 py-2 border border-amber-400/30 rounded-lg hover:bg-amber-400/10 transition-colors text-sm tracking-wider"
      >
        Rules
      </Link>

      {/* Header */}
      <motion.div
        className="mb-8 text-center z-10 w-full px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="mt-4 sm:mt-6 text-3xl sm:text-4xl font-medium tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            fontFamily: "'EB Garamond', serif",
            textShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
            letterSpacing: '0.1em'
          }}
        >
          The Labyrinth Awaits
        </motion.h1>
      </motion.div>

      {/* Form Content */}
      {!submitted ? (
        <motion.div
          className="w-full max-w-md z-10 mx-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 flex flex-col items-center"
              >
                {/* Input Field - Centered */}
                <div className="w-full max-w-xs">{renderInputField(questions[currentQuestionIndex])}</div>

                {/* Navigation Buttons */}
                <div className="flex justify-between gap-4 w-full max-w-xs">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 border border-amber-400/30 rounded-lg disabled:opacity-50 hover:bg-amber-400/10 transition-colors flex-1 text-sm tracking-wider"
                  >
                    Previous
                  </button>

                  {currentQuestionIndex < questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!validateCurrentField()}
                      className="px-4 py-2 bg-amber-400 text-black rounded-lg disabled:opacity-50 hover:bg-amber-300 transition-colors flex-1 text-sm tracking-wider"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !validateCurrentField()}
                      className="px-4 py-2 bg-amber-400 text-black rounded-lg disabled:opacity-50 hover:bg-amber-300 transition-colors flex-1 text-sm tracking-wider"
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
          className="z-10 text-center max-w-md mx-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-xl sm:text-2xl font-medium tracking-wider uppercase mb-3"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Your Path is Recorded
          </h2>
          <p className="text-amber-50/80 text-lg tracking-wide">
            The labyrinth whispers of your approach. Await our sign when the
            stars align.
          </p>
        </motion.div>
      )}
    </div>
  );
}