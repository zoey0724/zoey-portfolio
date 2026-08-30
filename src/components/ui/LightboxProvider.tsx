import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LightboxContextType {
  openLightbox: (url: string) => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return context;
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <LightboxContext.Provider value={{ openLightbox: setZoomedImage }}>
      {children}
      {mounted && createPortal(
        <AnimatePresence>
          {zoomedImage && (
            <motion.div 
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomedImage(null)}
            >
              <button 
                className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all z-50"
                onClick={() => setZoomedImage(null)}
              >
                <X className="w-8 h-8 md:w-10 md:h-10" />
              </button>
              <motion.img 
                src={zoomedImage} 
                alt="原图预览" 
                className="w-full h-full object-contain max-h-[90vh] rounded-lg shadow-2xl"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </LightboxContext.Provider>
  );
}
