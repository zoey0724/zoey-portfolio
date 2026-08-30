import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface SidebarItem {
  id: string;
  label: string;
  level?: number; // 0 for parent, 1 for child
}

interface LineSidebarProps {
  items: SidebarItem[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: 'smooth' | 'linear';
  markerLength?: number; 
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  activeId?: string;
  onItemClick?: (id: string, label: string) => void;
  className?: string;
}

const SidebarLine = ({ 
  item, 
  isActive, 
  mouseY, 
  proximityRadius, 
  maxShift, 
  markerLength, 
  itemGap, 
  fontSize,
  markerColor,
  accentColor,
  textColor,
  onItemClick
}: any) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineCenterY, setLineCenterY] = useState(0);

  useEffect(() => {
    const updateCenter = () => {
      if (lineRef.current) {
        const rect = lineRef.current.getBoundingClientRect();
        setLineCenterY(rect.top + rect.height / 2);
      }
    };
    
    // 初始化和窗口大小改变时更新中心点即可
    // 侧边栏本身是 fixed 的，不会随页面滚动而改变绝对视口坐标
    updateCenter();
    window.addEventListener('resize', updateCenter);
    
    // 当展开/折叠导致高度变化时，也要重新计算
    const timeout = setTimeout(updateCenter, 350); // 等待折叠动画 0.3s 结束
    
    return () => {
      window.removeEventListener('resize', updateCenter);
      clearTimeout(timeout);
    };
  }, [item.isVisible]);

  // Calculate distance from mouse to this item's center
  const distance = useTransform(mouseY, (y: number) => {
    return Math.abs(y - lineCenterY);
  });

  // Calculate magnetic shift
  const shift = useTransform(distance, [0, proximityRadius], [maxShift, 0]);
  const smoothShift = useSpring(shift, { stiffness: 150, damping: 20 });
  const finalShift = useTransform(distance, (d: number) => d < proximityRadius ? smoothShift.get() : 0);

  // Parent (level 0) gets full length, child (level 1) gets shorter length
  const levelLength = item.level === 1 ? markerLength * 0.4 : markerLength;
  const levelIndent = item.level === 1 ? markerLength * 0.6 : 0;
  
  // Is this item visible? If it's a child, it is only visible if its parent is active.
  // The logic is handled via the `isVisible` prop passed from the parent component.
  const isVisible = item.isVisible !== false;

  return (
    <motion.div
      initial={false}
      animate={{
        height: isVisible ? 'auto' : 0,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }} // 物理回弹缓动曲线，更加丝滑
      className={cn("w-full", isVisible ? "" : "pointer-events-none")}
    >
      <div 
        className="relative flex items-center group cursor-pointer"
        style={{ paddingBottom: itemGap, paddingTop: itemGap }}
        onClick={() => onItemClick && onItemClick(item.id, item.label)}
      >
        <motion.div
          ref={lineRef}
        className="h-[2px] transition-colors duration-500 rounded-r-full pointer-events-none"
        style={{ 
          width: levelLength, 
          backgroundColor: isActive ? accentColor : markerColor,
          x: finalShift,
          marginRight: levelIndent
        }}
        animate={{
          opacity: isActive ? 1 : 0.3
        }}
      />
      <motion.span 
        className="ml-4 font-bold tracking-wider transition-colors duration-500 pointer-events-none drop-shadow-md"
        style={{ 
          fontSize: `${fontSize}rem`,
          color: isActive ? accentColor : textColor,
          x: finalShift
        }}
        animate={{
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1.05 : 1
        }}
      >
        {item.label}
      </motion.span>
      </div>
    </motion.div>
  );
};

export function LineSidebar({
  items,
  accentColor = "#4F46E5",
  textColor = "#18181b",
  markerColor = "#94a3b8",
  proximityRadius = 150,
  maxShift = 25,
  markerLength = 40,
  itemGap = 8,
  fontSize = 0.85,
  activeId,
  onItemClick,
  className
}: LineSidebarProps) {
  const mouseY = useMotionValue(-1000);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      // 判定范围扩大到屏幕左侧 200px 内，先触发展开动画
      if (e.clientX < 200) {
        setIsHovered(true);
        mouseY.set(e.clientY); // 配合 proximityRadius (150px) 实现平滑过渡
      } else {
        setIsHovered(false);
        mouseY.set(-1000);
      }
    };

    const handleGlobalMouseLeave = () => {
      setIsHovered(false);
      mouseY.set(-1000);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseleave', handleGlobalMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseleave', handleGlobalMouseLeave);
    };
  }, [mouseY]);

  // Pre-process items to determine visibility
  let currentParentId = '';
  let activeParentId = activeId;

  // First pass: find the active parent ID if a child is currently active
  items.forEach(item => {
    if (item.level === 0 || !item.level) {
      currentParentId = item.id;
    }
    if (item.id === activeId && item.level === 1) {
      activeParentId = currentParentId;
    }
  });

  // Second pass: assign parentId and determine visibility
  currentParentId = '';
  const processedItems = items.map(item => {
    if (item.level === 0 || !item.level) {
      currentParentId = item.id;
      return { ...item, isVisible: true, parentId: currentParentId };
    } else {
      const isVisible = (currentParentId === activeParentId) || isHovered;
      return { ...item, isVisible, parentId: currentParentId };
    }
  });

  return (
    <div 
      className={cn("fixed left-0 top-1/2 -translate-y-1/2 z-50 py-10", className)}
    >
      <div className="flex flex-col">
        {processedItems.map((item) => (
          <SidebarLine
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            mouseY={mouseY}
            proximityRadius={proximityRadius}
            maxShift={maxShift}
            markerLength={markerLength}
            itemGap={itemGap}
            fontSize={fontSize}
            markerColor={markerColor}
            accentColor={accentColor}
            textColor={textColor}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
}
