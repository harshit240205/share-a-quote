
import React, { useState, useEffect } from 'react';
import { 
  getNextQuote, 
  getPreviousQuote, 
  canGoBack, 
  Quote 
} from '@/utils/quoteService';
import QuoteCard from '@/components/QuoteCard';
import ShareMenu from '@/components/ShareMenu';
import { Button } from '@/components/ui/button';
import { 
  RefreshCw, 
  ArrowLeft, 
  Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [canNavigateBack, setCanNavigateBack] = useState(false);
  const [useAi, setUseAi] = useState(false);
  const { toast } = useToast();

  // Initialize with a quote
  useEffect(() => {
    generateQuote();
  }, []);

  const generateQuote = async () => {
    setIsLoading(true);
    setIsVisible(false);
    
    try {
      // Short delay for animation
      setTimeout(async () => {
        const newQuote = await getNextQuote(useAi);
        setQuote(newQuote);
        setIsVisible(true);
        setIsLoading(false);
        setCanNavigateBack(canGoBack());
        
        if (useAi && newQuote.isAiGenerated) {
          toast({
            title: "AI Generated",
            description: "This quote was created using AI",
          });
        }
      }, 600);
    } catch (error) {
      console.error("Error generating quote:", error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to generate quote",
        variant: "destructive"
      });
    }
  };

  const navigateBack = () => {
    if (!canNavigateBack) return;
    
    setIsLoading(true);
    setIsVisible(false);
    
    setTimeout(() => {
      const previousQuote = getPreviousQuote();
      if (previousQuote) {
        setQuote(previousQuote);
      }
      setIsVisible(true);
      setIsLoading(false);
      setCanNavigateBack(canGoBack());
    }, 600);
  };

  const toggleAiMode = () => {
    setUseAi(!useAi);
    
    toast({
      title: useAi ? "Standard Mode" : "AI Mode",
      description: useAi 
        ? "Switched to curated quotes" 
        : "Switched to AI-generated quotes",
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-purple-100/20 blur-3xl"></div>
      </div>
      
      {/* Header */}
      <motion.div 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-3xl md:text-4xl font-display font-medium text-gray-800 tracking-tight">
          Daily Inspiration
        </h1>
        <p className="text-gray-500 mt-2 max-w-md">
          Discover {useAi ? "AI-generated" : "thoughtful"} quotes to inspire your day
        </p>
      </motion.div>
      
      {/* Quote Card */}
      <div className="w-full max-w-3xl mx-auto relative mb-8">
        <AnimatePresence mode="wait">
          {quote && (
            <QuoteCard 
              key={quote.text} 
              quote={quote} 
              isVisible={isVisible} 
            />
          )}
        </AnimatePresence>
      </div>
      
      {/* Mode Toggle */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Button
          variant="outline"
          size="sm"
          className={`rounded-full px-4 py-2 ${
            useAi 
              ? 'bg-purple-50 text-purple-600 border-purple-200' 
              : 'bg-gray-50 text-gray-600 border-gray-200'
          } transition-all duration-300`}
          onClick={toggleAiMode}
        >
          <Sparkles className={`h-4 w-4 mr-2 ${useAi ? 'text-purple-500' : 'text-gray-400'}`} />
          {useAi ? 'AI Mode' : 'Standard Mode'}
        </Button>
      </motion.div>
      
      {/* Control Buttons */}
      <motion.div 
        className="flex items-center justify-center gap-4 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full w-10 h-10 border ${
            canNavigateBack 
              ? 'border-gray-200 bg-white/70 hover:bg-white' 
              : 'border-gray-100 bg-gray-50/50 text-gray-300'
          } backdrop-blur-sm transition-all duration-300`}
          onClick={navigateBack}
          disabled={!canNavigateBack || isLoading}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            className={`rounded-full px-6 py-6 h-12 ${
              useAi 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'bg-gray-800 hover:bg-gray-900'
            } text-white shadow-button transition-all duration-300`}
            onClick={generateQuote}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            New {useAi ? 'AI ' : ''}Quote
          </Button>
        </motion.div>
        
        {quote && <ShareMenu quote={quote} />}
      </motion.div>
      
      {/* Footer */}
      <motion.div 
        className="mt-auto pt-10 text-center text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <p>Elegant Design • {useAi ? 'AI-Generated' : 'Timeless'} Quotes</p>
      </motion.div>
    </div>
  );
};

export default Index;
