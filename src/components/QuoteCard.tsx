
import React, { useEffect, useRef } from 'react';
import { Quote } from '@/utils/quoteService';
import { motion } from 'framer-motion';

interface QuoteCardProps {
  quote: Quote;
  isVisible: boolean;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, isVisible }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const quoteTextVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const authorVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.6,
        delay: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div 
      ref={cardRef}
      className="quote-card max-w-2xl w-full mx-auto px-6 py-10 rounded-xl backdrop-blur-md bg-white/80 border border-gray-100 shadow-soft"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      exit="exit"
      variants={cardVariants}
    >
      <motion.blockquote 
        className="text-2xl md:text-3xl font-serif leading-relaxed text-gray-800 mb-6 text-center"
        variants={quoteTextVariants}
      >
        "{quote.text}"
      </motion.blockquote>
      
      <motion.cite 
        className="block text-right font-display text-sm md:text-base font-medium tracking-wide text-gray-600 not-italic mt-4 pr-4"
        variants={authorVariants}
      >
        — {quote.author}
      </motion.cite>
    </motion.div>
  );
};

export default QuoteCard;
