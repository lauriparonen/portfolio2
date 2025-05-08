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
    const [isMobile, setIsMobile] = useState(false);
    const colors = paletteMap[palette];

    useEffect(() => {
      const checkMobile = () => {
        const isMobileDevice = 
          /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
          (window.innerWidth <= 768);
        setIsMobile(isMobileDevice);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
      <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
        {/* Section-local gradient, laid behind content */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            opacity: 0.4,
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
          }}
        >
          {!isMobile && (
            <MeshGradient
              {...colors}
              speed={0.08}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          )}
          {isMobile && (
            <div 
              style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(45deg, ${colors.color1}, ${colors.color2}, ${colors.color3}, ${colors.color4})`,
                backgroundSize: '400% 400%',
                animation: 'gradient 15s ease infinite',
              }}
            />
          )}
        </div>

        {/* Actual content */}
        <div className="relative z-10">{children}</div>

        <style jsx>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    );
  };
  
  export default ShadedBackground;
  