import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Lanyard from './Lanyard';
import frontImage from '../../assets/lanyard/my-front.svg';
import backImage from '../../assets/lanyard/my-back.svg';
import { useTexture } from '@react-three/drei';

// 预加载贴图
useTexture.preload(frontImage);
useTexture.preload(backImage);

interface ContactBadgeProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactBadge({ isOpen, onClose }: ContactBadgeProps) {
  // Remove scroll lock so it feels like part of the same layer
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-24 right-8 md:right-12 z-[110] p-3 rounded-full bg-white/80 hover:bg-white text-foreground/70 hover:text-primary transition-all backdrop-blur-xl border border-black/10 pointer-events-auto shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.2)] group"
          >
            <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>

          {/* Lanyard 3D Scene */}
          <div className="w-full h-full pointer-events-none">
            {/* 我们在 Lanyard 组件内部已经实现了自适应右上角的悬挂点偏移，这里摄像机保持居中即可 */}
            <Lanyard
              position={[0, 0, 16]}
              gravity={[0, -40, 0]}
              frontImage={frontImage}
              backImage={backImage}
              imageFit="cover"
              lanyardWidth={1}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
