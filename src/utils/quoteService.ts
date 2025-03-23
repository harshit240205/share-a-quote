// A collection of inspiring quotes
const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs"
  },
  {
    text: "Good design is as little design as possible.",
    author: "Dieter Rams"
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    text: "Less, but better – because it concentrates on the essential aspects, and the products are not burdened with non-essentials.",
    author: "Dieter Rams"
  },
  {
    text: "Details matter, it's worth waiting to get it right.",
    author: "Steve Jobs"
  },
  {
    text: "Good design is obvious. Great design is transparent.",
    author: "Joe Sparano"
  },
  {
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs"
  },
  {
    text: "Quality is not an act, it is a habit.",
    author: "Aristotle"
  },
  {
    text: "The details are not the details. They make the design.",
    author: "Charles Eames"
  },
  {
    text: "Good designers copy, great designers steal.",
    author: "Pablo Picasso"
  },
  {
    text: "Have the courage to follow your heart and intuition. They somehow know what you truly want to become.",
    author: "Steve Jobs"
  },
  {
    text: "Make it simple, but significant.",
    author: "Don Draper"
  },
  {
    text: "The function of design is letting design function.",
    author: "Micha Commeren"
  },
  {
    text: "The most powerful person in the world is the storyteller.",
    author: "Steve Jobs"
  },
  {
    text: "Good design is aesthetic.",
    author: "Dieter Rams"
  },
  {
    text: "Stay hungry, stay foolish.",
    author: "Steve Jobs"
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay"
  },
  {
    text: "Design is intelligence made visible.",
    author: "Alina Wheeler"
  }
];

// Utility functions for handling quotes
export interface Quote {
  text: string;
  author: string;
}

// Get a random quote from the collection
export const getRandomQuote = (): Quote => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

// Keep a history of shown quotes to enable navigation
let quoteHistory: Quote[] = [];
let currentIndex = -1;

// Get the next quote and add it to history
export const getNextQuote = (): Quote => {
  const newQuote = getRandomQuote();
  
  // If we're not at the end of the history, trim it
  if (currentIndex < quoteHistory.length - 1) {
    quoteHistory = quoteHistory.slice(0, currentIndex + 1);
  }
  
  quoteHistory.push(newQuote);
  currentIndex = quoteHistory.length - 1;
  
  return newQuote;
};

// Navigate through quote history
export const getPreviousQuote = (): Quote | null => {
  if (currentIndex <= 0) return null;
  
  currentIndex--;
  return quoteHistory[currentIndex];
};

export const canGoBack = (): boolean => {
  return currentIndex > 0;
};

// Format quote for sharing
export const formatQuoteForSharing = (quote: Quote): string => {
  return `"${quote.text}" — ${quote.author}`;
};

// Social media sharing functions
export const shareOnTwitter = (quote: Quote): void => {
  const text = encodeURIComponent(`"${quote.text}" — ${quote.author}`);
  window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
};

export const shareOnFacebook = (quote: Quote): void => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
};

export const copyToClipboard = async (quote: Quote): Promise<boolean> => {
  const text = `"${quote.text}" — ${quote.author}`;
  
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};
