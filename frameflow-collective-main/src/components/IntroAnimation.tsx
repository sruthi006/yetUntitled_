import { useState } from "react";
import { motion } from "framer-motion";
import { Clapperboard } from "lucide-react";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [showClickPrompt, setShowClickPrompt] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background cursor-pointer"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onClick={() => {
        if (showClickPrompt) {
          onComplete();
        }
      }}
    >
      {/* Clapboard Animation - Full Screen */}
      <motion.div
        className="relative"
        initial={{ scale: 3 }}
        animate={{ scale: [3, 3, 0.4] }}
        transition={{ 
          duration: 2.5,
          times: [0, 0.4, 1],
          delay: 0.5
        }}
        onAnimationComplete={() => setShowClickPrompt(true)}
      >
        {/* Clapboard Top (the part that claps) - no yellow */}
        <motion.div
          className="absolute top-0 left-0 w-32 h-8 bg-foreground rounded-t-lg origin-bottom-left z-10"
          initial={{ rotateX: -45 }}
          animate={{ rotateX: [-45, 0] }}
          transition={{
            duration: 0.2,
            delay: 0.8,
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 flex items-center justify-center gap-1">
            <div className="w-1 h-6 bg-background" />
            <div className="w-1 h-6 bg-background" />
            <div className="w-1 h-6 bg-background" />
            <div className="w-1 h-6 bg-background" />
            <div className="w-1 h-6 bg-background" />
          </div>
        </motion.div>

        {/* Clapboard Base */}
        <Clapperboard className="h-32 w-32 text-foreground" strokeWidth={1.5} />
        
        {/* Clap Sound Effect (Visual) */}
        <motion.div
          className="absolute -top-4 -right-4 text-2xl font-bold text-foreground"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 0.3, delay: 0.9 }}
        >
          CLAP!
        </motion.div>
      </motion.div>

      {/* Taglines - appear after zoom */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.5 }}
      >
        <motion.h1
          className="font-cinzel text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-gold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.4 }}
        >
          CONNECT
        </motion.h1>
        <motion.h1
          className="font-cinzel text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-gold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.8 }}
        >
          COLLABORATE
        </motion.h1>
        <motion.h1
          className="font-cinzel text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-gold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 4.2 }}
        >
          CREATE
        </motion.h1>

        {/* Click to Enter Prompt */}
        {showClickPrompt && (
          <motion.p
            className="text-muted-foreground text-lg mt-12 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Click anywhere to enter
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default IntroAnimation;
