import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  cards: React.ReactNode[];
}

export default function Stack({
  randomRotation = true,
  sensitivity = 180,
  sendToBackOnClick = true,
  cards
}: StackProps) {
  const [items, setItems] = useState(
    cards.map((card, index) => ({
      id: index,
      content: card,
      rotation: randomRotation ? Math.random() * 10 - 5 : 0
    }))
  );

  const moveToBack = () => {
    setItems((prev) => {
      const newItems = [...prev];
      const top = newItems.pop();
      if (top) {
        newItems.unshift({
          ...top,
          // Assign a new rotation when moved to back to keep it dynamic
          rotation: randomRotation ? Math.random() * 10 - 5 : 0
        });
      }
      return newItems;
    });
  };

  const handleDragEnd = (_event: any, info: any) => {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      moveToBack();
    }
  };

  const handleClick = () => {
    if (sendToBackOnClick) {
      moveToBack();
    }
  };

  return (
    <div className="relative w-full h-full perspective-1000">
      <AnimatePresence>
        {items.map((item, index) => {
          const isTop = index === items.length - 1;
          const isActive = index >= items.length - 4; // Only show top 4 cards for performance/visuals
          
          if (!isActive) return null;

          return (
            <motion.div
              key={item.id}
              className={`absolute inset-0 origin-bottom rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-2 border-white bg-white ${isTop ? 'cursor-grab active:cursor-grabbing' : ''}`}
              drag={isTop ? true : false}
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={isTop ? handleDragEnd : undefined}
              onClick={isTop ? handleClick : undefined}
              animate={{
                zIndex: index,
                scale: 1 - (items.length - 1 - index) * 0.04,
                y: (items.length - 1 - index) * -12,
                rotate: isTop ? 0 : item.rotation,
                opacity: 1
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
            >
              <div className="w-full h-full pointer-events-none">
                {item.content}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
