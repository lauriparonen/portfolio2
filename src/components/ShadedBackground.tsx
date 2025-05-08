import {
    useRef, useEffect, useState, ReactNode,
  } from 'react';
  import { MeshGradient } from '@paper-design/shaders-react';
  
  type Props = {
    children: ReactNode;
    className?: string;
    palette?: 'blue' | 'maroon' | 'purple';
  };
  
  const paletteMap = {
    blue: {
      color1: '#091540',
      color2: '#7692ff',
      color3: '#abd2fa',
      color4: '#1b2cc1',
    },
    maroon: {
        color1: '#250902',
        color2: '#38040e',
        color3: '#640d14',
        color4: '#ad2831',
    },
    purple: {
        color1: '#10002b',
        color2: '#3c096c',
        color3: '#9d4edd',
        color4: '#e0aaff',
    }
  };
  
  const ShadedBackground = ({
    children,
    className = '',
    palette = 'blue',
  }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [opacity, setOpacity] = useState(0);
    const currentRatio = useRef(0);
    const raf = useRef<number>(0);
  
    const tick = () => {
      setOpacity(currentRatio.current);
      raf.current = requestAnimationFrame(tick);
    };
  
    useEffect(() => {
      if (!containerRef.current) return;
      const io = new IntersectionObserver(
        ([entry]) => (currentRatio.current = entry.intersectionRatio),
        { threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      io.observe(containerRef.current);
      raf.current = requestAnimationFrame(tick);
      return () => {
        io.disconnect();
        raf.current && cancelAnimationFrame(raf.current);
      };
    }, []);
  
    const colors = paletteMap[palette];
  
    return (
      <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
        {/* Section-local gradient, laid behind content */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            opacity: opacity * 0.4,
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
          }}
        >
          <MeshGradient
            {...colors}
            speed={0.08}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
  
        {/* Actual content */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  };
  
  export default ShadedBackground;
  