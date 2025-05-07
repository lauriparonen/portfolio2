import { MeshGradient } from '@paper-design/shaders-react';
import { useEffect, useState, useRef, useCallback } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ShadedBackground = ({ children, className = '' }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [opacity, setOpacity] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);
  const lastFrameTime = useRef(0);
  const FRAME_INTERVAL = 1000 / 30; // Cap at 30fps
  const currentRatio = useRef(0);

  const updateOpacity = useCallback(() => {
    const now = performance.now();
    if (now - lastFrameTime.current >= FRAME_INTERVAL) {
      setOpacity(currentRatio.current);
      lastFrameTime.current = now;
    }
    rafRef.current = requestAnimationFrame(updateOpacity);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        currentRatio.current = entry.intersectionRatio;
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1], // Reduced number of thresholds
        rootMargin: '-10% 0px -10% 0px',
      },
    );

    observer.observe(containerRef.current);
    rafRef.current = requestAnimationFrame(updateOpacity);

    return () => {
      observer.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateOpacity]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          opacity: opacity * 0.4,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)'
        }}
      >
        <MeshGradient
          color1="#091540"
          color2="#7692ff"
          color3="#abd2fa"
          color4="#1b2cc1"
          speed={0.08}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default ShadedBackground; 