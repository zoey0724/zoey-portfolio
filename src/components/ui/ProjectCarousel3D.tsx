import { useState } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useLightbox } from './LightboxProvider';

export interface ProjectData {
  title: string;
  company: string;
  role: string;
  date: string;
  description: string;
  highlights: string[];
  image: string;
}

interface ProjectCarousel3DProps {
  projects: ProjectData[];
}

function FlipCard({ project, index, activeIndex, isFlipped, onFlip, onHover, onSwipe, onZoom }: { 
  project: ProjectData, 
  index: number, 
  activeIndex: number,
  isFlipped: boolean,
  onFlip: () => void,
  onHover: () => void,
  onSwipe: (dir: 'left' | 'right') => void,
  onZoom: (image: string) => void
}) {
  const isActive = index === activeIndex;
  
  // 采用线性排布，防止卡片循环移动到鼠标下方导致无限自动切换
  const offset = index - activeIndex;
  
  // 设置空间位置：移除了会破坏鼠标事件的 z 轴 translate，改用 zIndex 和 scale 来完美模拟 3D 且保证鼠标悬停 100% 灵敏
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const x = offset * (isMobile ? 75 : 65) + "%";
  const rotateY = offset * -25;
  const scale = isActive ? 1 : 0.85;
  const opacity = isActive ? 1 : (isMobile ? 0.8 : 0.4);
  const zIndex = isActive ? 50 : 10;

  return (
    <motion.div
      className="absolute top-0 left-0 right-0 bottom-0 mx-auto w-[70vw] md:w-full max-w-[600px] md:max-w-[760px] h-[380px] md:h-[480px] cursor-pointer"
      initial={false}
      animate={{ 
        x, 
        rotateY: rotateY + (isFlipped ? 180 : 0), 
        scale, 
        zIndex
      }}
      transition={{ 
        type: "spring", 
        stiffness: 70,    // 降低硬度，让动画变得缓慢
        damping: 20,      // 调整阻尼，防止过度回弹
        mass: 1.5         // 增加质量，让卡片移动更有厚重的高级感
      }}
      style={{ transformStyle: "preserve-3d" }}
      onClick={() => {
        if (isActive) {
          onFlip();
        } else {
          onHover();
        }
      }}
      onMouseEnter={() => !isActive && onHover()}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={(_, { offset }) => {
        if (offset.x < -40) {
          onSwipe('left');
        } else if (offset.x > 40) {
          onSwipe('right');
        }
      }}
    >
      {/* 正面 (Front) - 高级 Mac 浏览器视窗包装 */}
      <motion.div 
        animate={{ opacity }}
        transition={{ duration: 0.3 }}
        className={cn(
          "absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border border-black/5 bg-secondary flex flex-col",
          isFlipped ? "pointer-events-none" : ""
        )}
        style={{ 
          backfaceVisibility: "hidden", 
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(0deg) translateZ(1px)",
          willChange: "transform"
        }}
      >
        {/* Mac 风格顶部导航条 */}
        <div className="h-10 w-full bg-white/80 border-b border-black/5 flex items-center px-4 space-x-2 shrink-0 z-20 shadow-sm relative">
          <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-500 shadow-inner"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-500 shadow-inner"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-500 shadow-inner"></div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs font-semibold text-muted">{project.title.split(' ')[0]}</span>
          </div>
        </div>

        {/* 截图内容区域 */}
        <div className="relative w-full flex-1 overflow-hidden bg-white/50 group">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105" 
          />
          
          {/* 轻微底部阴影衬托 */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent pointer-events-none"></div>

          {/* 毛玻璃浮动文本底座 (Glassmorphism) */}
          <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 bg-white/70 backdrop-blur-xl border border-black/5 p-5 md:p-6 rounded-2xl shadow-xl z-20 transform transition-transform duration-500 hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-primary mb-1">
                  {project.title}
                </h3>
                <p className="text-foreground/80 font-bold text-sm md:text-base">
                  {project.role} <span className="text-muted mx-1">·</span> {project.company}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 查看原图角标 */}
        {isActive && (
          <motion.div 
            className="absolute top-14 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full border border-black/5 text-foreground/70 shadow-lg z-30 cursor-pointer hover:bg-white transition-colors"
            animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={(e) => { 
              e.stopPropagation(); // 阻止事件冒泡，防止触发卡片翻转
              onZoom(project.image); 
            }}
          >
            <ZoomIn className="w-5 h-5" />
          </motion.div>
        )}
      </motion.div>

      {/* 背面 (Back) - 清爽的详情展示 */}
      <motion.div 
        animate={{ opacity }}
        transition={{ duration: 0.3 }}
        className={cn(
          "absolute inset-0 w-full h-full rounded-[2rem] bg-secondary shadow-2xl border border-black/5 p-8 overflow-y-auto flex flex-col",
          !isFlipped ? "pointer-events-none" : ""
        )}
        style={{ 
          backfaceVisibility: "hidden", 
          WebkitBackfaceVisibility: "hidden", 
          transform: "rotateY(180deg) translateZ(1px)",
          willChange: "transform"
        }}
      >
        <div className="h-full flex flex-col">
          <h3 className="text-2xl font-bold text-primary mb-4">{project.title}</h3>
          <p className="text-sm font-medium text-foreground/80 mb-6 pb-4 border-b border-black/5">
            核心描述与价值
          </p>
          <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-6">
            {project.description}
          </p>
          <ul className="space-y-4 flex-1">
            {project.highlights.map((hl, i) => (
              <li key={i} className="flex items-start text-sm md:text-base text-foreground/60 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0 shadow-[0_0_8px_rgba(79,70,229,0.5)]"></span>
                <span>{hl}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 text-center text-xs text-muted font-bold tracking-widest uppercase cursor-pointer hover:text-primary transition-colors">
            再次点击返回
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectCarousel3D({ projects }: ProjectCarousel3DProps) {
  const [activeIndex, setActiveIndex] = useState(2); 
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const { openLightbox } = useLightbox();

  const handleHover = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      setFlippedIndex(null); 
    }
  };

  const handleFlip = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <div 
      className="w-full relative py-20 overflow-hidden" 
      style={{ perspective: "2000px" }} 
    >
      <div className="relative w-full max-w-7xl mx-auto h-[380px] md:h-[480px] flex justify-center items-center transform-gpu" style={{ transformStyle: "preserve-3d" }}>
        {projects.map((project, idx) => (
          <FlipCard 
            key={idx}
            project={project}
            index={idx}
            activeIndex={activeIndex}
            isFlipped={flippedIndex === idx}
            onFlip={() => handleFlip(idx)}
            onHover={() => handleHover(idx)}
            onSwipe={(dir) => {
              if (dir === 'left' && activeIndex < projects.length - 1) {
                handleHover(activeIndex + 1);
              } else if (dir === 'right' && activeIndex > 0) {
                handleHover(activeIndex - 1);
              }
            }}
            onZoom={(img) => openLightbox(img)}
          />
        ))}
      </div>
    </div>
  );
}
