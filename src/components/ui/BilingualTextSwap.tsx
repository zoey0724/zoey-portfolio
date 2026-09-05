'use client';

import { useEffect, useRef } from "react";
import { motion, useAnimate, stagger } from "framer-motion";
import { debounce } from "lodash";

interface CharData {
  char: string;
  highlight?: boolean;
}

interface BilingualTextSwapProps {
  text1: CharData[];
  text2: CharData[];
  className?: string;
}

export function BilingualTextSwap({ text1, text2, className }: BilingualTextSwapProps) {
  const [scope, animate] = useAnimate();
  const isEnglishRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const hasAutoExecutedRef = useRef(false);

  const triggerSwap = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const transition: any = {
      type: "spring",
      duration: 0.7,
      bounce: 0.2, // Slightly bounce for the "React Bits" feel
    };
    
    const mergeTransition = {
      ...transition,
      delay: stagger(0.025, { from: "first" }), // Fast stagger for silky smooth feel
    };

    if (!isEnglishRef.current) {
      // Chinese -> English
      animate(".letter-1", { y: "-100%", opacity: 0 }, mergeTransition);
      animate(".letter-2", { y: "100%", opacity: 0 }, { duration: 0 }).then(() => {
        animate(".letter-2", { y: "0%", opacity: 1 }, mergeTransition).then(() => {
          isEnglishRef.current = true;
          isAnimatingRef.current = false;
        });
      });
    } else {
      // English -> Chinese
      animate(".letter-2", { y: "100%", opacity: 0 }, mergeTransition);
      animate(".letter-1", { y: "-100%", opacity: 0 }, { duration: 0 }).then(() => {
        animate(".letter-1", { y: "0%", opacity: 1 }, mergeTransition).then(() => {
          isEnglishRef.current = false;
          isAnimatingRef.current = false;
        });
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAutoExecutedRef.current) {
        hasAutoExecutedRef.current = true;
        triggerSwap();
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleHover = debounce(() => {
    hasAutoExecutedRef.current = true;
    triggerSwap();
  }, 100, { leading: true, trailing: false });

  return (
    <div 
      ref={scope} 
      className={`inline-grid w-fit cursor-default select-none ${className || ''}`} 
      style={{ gridTemplateAreas: '"stack"' }}
      onMouseEnter={handleHover}
    >
        <div style={{ gridArea: "stack" }} className="flex justify-start items-start">
          {text1.map((item, i) => (
            <motion.span 
              key={`t1-${i}`}
              className={`letter-1 relative inline-block whitespace-pre pb-4 pr-2 -mr-2 ${item.highlight ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent" : ""}`}
              initial={{ y: "0%", opacity: 1 }}
            >
              {item.char}
            </motion.span>
          ))}
        </div>
        <div style={{ gridArea: "stack" }} className="flex justify-start items-start -mt-[0.12em]">
          {text2.map((item, i) => (
            <motion.span 
              key={`t2-${i}`}
              className={`letter-2 relative inline-block whitespace-pre pb-4 pr-2 -mr-2 ${item.highlight ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent" : ""}`}
              initial={{ y: "100%", opacity: 0 }}
            >
              {item.char}
            </motion.span>
          ))}
        </div>
      </div>
  );
}
