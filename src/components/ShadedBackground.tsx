import { MeshGradient } from '@paper-design/shaders-react';
import { useEffect, useState, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ShadedBackground = ({ children, className = '' }: Props) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [opacity, setOpacity] = useState(0);
  
    useEffect(() => {
      if (!containerRef.current) return;
  
      const observer = new IntersectionObserver(
        ([entry]) => setOpacity(entry.intersectionRatio),
        {
          threshold: Array.from({ length: 20 }, (_, i) => i / 20),
          rootMargin: '-10% 0px -10% 0px',
        },
      );
  
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div 
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
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