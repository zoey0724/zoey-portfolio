import React, { useRef, useState, useEffect } from 'react';

interface SpecularButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
}

export default function SpecularButton({
  children,
  size = 'md',
  radius = 18,
  tint = '#ffffff',
  tintOpacity = 0,
  blur = 0,
  textColor = '#f5f5f5',
  lineColor = '#ffffff',
  baseColor = '#525252',
  intensity = 1,
  shineSize = 10,
  shineFade = 40,
  thickness = 1,
  speed = 0.35,
  followMouse = true,
  proximity = 250,
  autoAnimate = false,
  className = '',
  onClick,
  ...props
}: SpecularButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [distance, setDistance] = useState(proximity + 1);

  useEffect(() => {
    if (!followMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.sqrt(Math.pow(e.clientX - cx, 2) + Math.pow(e.clientY - cy, 2));
      setDistance(dist);

      if (dist <= proximity) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [followMouse, proximity]);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const isActive = autoAnimate || distance <= proximity;
  const currentIntensity = isActive ? intensity : 0;
  
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    if (!autoAnimate) return;
    let animationFrameId: number;
    const animate = () => {
      setAngle((prev) => (prev + speed) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [autoAnimate, speed]);

  const actualX = autoAnimate ? 50 + 50 * Math.cos(angle * (Math.PI / 180)) : mousePos.x;
  const actualY = autoAnimate ? 50 + 50 * Math.sin(angle * (Math.PI / 180)) : mousePos.y;

  return (
    <button
      ref={buttonRef}
      className={`relative inline-flex items-center justify-center overflow-hidden outline-none ${sizeClasses[size]} ${className}`}
      style={{
        borderRadius: `${radius}px`,
        color: textColor,
        padding: `${thickness}px`, 
        transition: `opacity 0.3s ease`,
      }}
      onClick={onClick}
      {...props}
    >
      {/* Background layer */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none border border-black/5"
        style={{
          borderRadius: `${radius}px`,
          background: baseColor,
          boxShadow: tintOpacity > 0 ? `inset 0 0 ${blur}px ${blur / 2}px rgba(255,255,255,${tintOpacity})` : 'none',
        }}
      />

      {/* Shine/Border layer */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: currentIntensity,
          borderRadius: `${radius}px`,
          background: `radial-gradient(circle at ${actualX}% ${actualY}%, ${lineColor} ${shineSize}%, transparent ${shineFade}%)`,
        }}
      />

      {/* Inner fill layer to create border effect */}
      <div 
        className="absolute z-20 pointer-events-none"
        style={{
          inset: `${thickness}px`,
          borderRadius: `${Math.max(0, radius - thickness)}px`,
          background: baseColor
        }}
      />

      {/* Content */}
      <div className="relative z-30 flex items-center justify-center">
        {children}
      </div>
    </button>
  );
}
