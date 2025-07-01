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
  {
    id: 'name',
    type: 'text',
    placeholder: 'State your name, warrior...',
    required: true,
  },
  {
    id: 'email',
    type: 'email',
    placeholder: 'Any mail..? Your contact sigil...',
    required: true,
  },
  {
    id: 'address',
    type: 'text',
    placeholder: 'Where does your presence reside? Write your current realm...',
    required: true,
  },
  {
    id: 'phoneLast4',
    type: 'text',
    placeholder: 'Reveal the last 4 digits of your rune stone (phone number)...',
    required: true,
  },
  {
    id: 'reason',
    type: 'textarea',
    placeholder: 'Why should the OSSPTS accept you? Prove your worth...',
    required: true,
  },
  {
    id: 'acceptRules',
    type: 'checkbox',
    placeholder: 'Do you accept the sacred rules of the Labyrinth?',
    required: true,
  },
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;
    const value =
      type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateCurrentField = (): boolean => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion.required) return true;

    const value = formData[currentQuestion.id];
    if (currentQuestion.type === 'checkbox') {
      return value === true;
    }
    return String(value).trim() !== '';
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
      if (!q.required) return true;
      const value = formData[q.id];
      if (q.type === 'checkbox') return value === true;
      return String(value).trim() !== '';
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
      className: 'w-full bg-black/40 border border-white/20 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-white/30 placeholder-white/50 text-sm sm:text-base',
    };

    switch (question.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            value={formData[question.id] as string}
            rows={4}
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
              className="h-5 w-5 rounded border-white/20 bg-black/40 focus:ring-white"
              required={question.required}
            />
            <label className="text-sm sm:text-base">{question.placeholder}</label>
          </div>
        );
      default:
        return (
          <input
            type={question.type}
            {...commonProps}
            value={formData[question.id] as string}
          />
        );
    }
  };

  return (
    <div className="min-h-screen text-white font-sans flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
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

      {/* Rules Button - Top Right */}
      <Link 
        href="/Rules" 
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-sm sm:text-base backdrop-blur-sm"
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
          The Labyrinth Awaits
        </motion.h1>
      </motion.div>

      {/* Form Content */}
      {!submitted ? (
        <motion.div
          className="w-full max-w-md bg-black/70 p-6 sm:p-8 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm z-10 mx-4"
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
                className="space-y-6"
              >
                {/* Input Field */}
                <div>{renderInputField(questions[currentQuestionIndex])}</div>

                {/* Navigation Buttons */}
                <div className="flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 border border-white/20 rounded-lg disabled:opacity-50 hover:bg-white/10 transition-colors flex-1 text-sm sm:text-base"
                  >
                    Previous
                  </button>

                  {currentQuestionIndex < questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!validateCurrentField()}
                      className="px-4 py-2 bg-white text-black rounded-lg disabled:opacity-50 hover:bg-white/90 transition-colors flex-1 text-sm sm:text-base"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !validateCurrentField()}
                      className="px-4 py-2 bg-white text-black rounded-lg disabled:opacity-50 hover:bg-white/90 transition-colors flex-1 text-sm sm:text-base"
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
          className="z-10 text-center bg-black/70 border border-white/10 rounded-xl p-6 sm:p-8 shadow-md max-w-md backdrop-blur-sm mx-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold tracking-wider uppercase mb-3">
            Your Path is Recorded
          </h2>
          <p className="text-white/80 text-sm sm:text-base">
            The labyrinth whispers of your approach. Await our sign when the
            stars align.
          </p>
        </motion.div>
      )}
    </div>
  );
}