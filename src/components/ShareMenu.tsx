
import React, { useState } from 'react';
import { Quote, shareOnTwitter, shareOnFacebook, copyToClipboard } from '@/utils/quoteService';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast'; // Fixed: using useToast hook properly
import { Share, Twitter, Facebook, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShareMenuProps {
  quote: Quote;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ quote }) => {
  const [copying, setCopying] = useState(false);
  const { toast } = useToast(); // Get toast from the hook

  const handleCopy = async () => {
    setCopying(true);
    const success = await copyToClipboard(quote);
    
    if (success) {
      toast({
        title: "Success",
        description: "Quote copied to clipboard"
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to copy quote",
        variant: "destructive"
      });
    }
    
    setTimeout(() => setCopying(false), 1500);
  };

  const shareButtonVariants = {
    initial: { opacity: 0, y: 5 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    hover: { 
      y: -2,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    tap: { 
      scale: 0.97,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="rounded-full w-10 h-10 border border-gray-200 bg-white/70 backdrop-blur-sm hover:bg-white transition-all duration-300"
        >
          <Share className="h-4 w-4 text-gray-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="center" 
        sideOffset={10} 
        className="w-52 p-4 bg-white/90 backdrop-blur-md border border-gray-100 shadow-soft rounded-xl grid gap-2"
      >
        <div className="text-sm font-medium text-center text-gray-600 mb-2">Share this quote</div>
        <div className="flex justify-center gap-2">
          <motion.div
            custom={0}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            variants={shareButtonVariants}
          >
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full w-10 h-10 border border-[#1DA1F2]/20 bg-white hover:bg-[#1DA1F2]/10 transition-colors duration-300"
              onClick={() => shareOnTwitter(quote)}
            >
              <Twitter className="h-4 w-4 text-[#1DA1F2]" />
            </Button>
          </motion.div>
          
          <motion.div
            custom={1}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            variants={shareButtonVariants}
          >
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full w-10 h-10 border border-[#4267B2]/20 bg-white hover:bg-[#4267B2]/10 transition-colors duration-300"
              onClick={() => shareOnFacebook(quote)}
            >
              <Facebook className="h-4 w-4 text-[#4267B2]" />
            </Button>
          </motion.div>
          
          <motion.div
            custom={2}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            variants={shareButtonVariants}
          >
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full w-10 h-10 border border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-300"
              onClick={handleCopy}
              disabled={copying}
            >
              {copying ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-gray-600" />
              )}
            </Button>
          </motion.div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShareMenu;
