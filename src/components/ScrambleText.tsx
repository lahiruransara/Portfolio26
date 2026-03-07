import React, { useState, useEffect, useCallback } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';

export const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const totalIterations = text.length + 10; // Extra buffer for the wave to pass through
    
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            // The "reveal" threshold
            const revealThreshold = iteration - 5;
            
            // If the reveal wave has passed this letter, show original
            if (index < revealThreshold) {
              return text[index];
            }
            
            // If the scramble wave has reached this letter, show random
            if (index < iteration) {
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            }
            
            // Otherwise, show original (hasn't started scrambling yet)
            return text[index];
          })
          .join('')
      );

      iteration += 0.5; // Controls the speed of the wave

      if (iteration >= totalIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, isScrambling]);

  return (
    <span 
      className={className}
      onMouseEnter={scramble}
    >
      {displayText}
    </span>
  );
};
