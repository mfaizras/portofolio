
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsLoading(false);
      // Unlock scroll
      document.body.style.overflow = 'unset';
      if (onComplete) onComplete();
    }, 2500); // 2.5 seconds total duration

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <div className='relative flex items-center justify-center'>
                {/* Background decorators */}
                <motion.div 
                    className="absolute w-64 h-64 bg-primary/20 rounded-full blur-3xl"
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <div className="relative z-10 flex flex-col items-center gap-4">
                    <motion.div
                        className="flex items-center gap-1 overflow-hidden"
                        initial={{ opacity: 1 }}
                    >
                         {/* Animated Text Reveal */}
                        {['H', 'E', 'L', 'L', 'O','!'].map((letter, index) => (
                            <motion.span
                                key={index}
                                className="text-6xl md:text-8xl font-bold text-heading font-mono"
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.15,
                                    ease: [0.43, 0.13, 0.23, 0.96]
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </motion.div>
                    
                    {/* Loading Bar */}
                    <motion.div 
                        className="h-1 w-0 bg-primary rounded-full mt-4"
                        animate={{ width: "100%" }}
                        transition={{ 
                            duration: 2, 
                            ease: "easeInOut",
                            delay: 0.2
                        }}
                        style={{ maxWidth: '200px' }}
                    />
                    
                     <motion.p
                        className="text-text text-sm tracking-[0.2em] uppercase mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        Please Wait
                    </motion.p>
                </div>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
