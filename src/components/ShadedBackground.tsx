import { MeshGradient } from '@paper-design/shaders-react';
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ShadedBackground = ({ children, className = "" }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        // Smoothly transition opacity based on intersection ratio
        setOpacity(entry.intersectionRatio);
      },
      {
        threshold: Array.from({ length: 20 }, (_, i) => i / 20), // Create array of thresholds from 0 to 1
        rootMargin: "-10% 0px -10% 0px" // Start fading in/out slightly before the element is fully in view
      }
    );

    const element = document.getElementById('shader-container');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div id="shader-container" className={`relative ${className}`}>
      <div 
        className="absolute inset-0 transition-opacity duration-500"
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