import {
    useRef, useEffect, useState, ReactNode, Suspense, lazy,
  } from 'react';
  
  // Lazy load the MeshGradient component
  const MeshGradient = lazy(() => import('@paper-design/shaders-react').then(mod => ({ default: mod.MeshGradient })));
  
  type Props = {
    children: ReactNode;
    className?: string;
    palette?: 'blue' | 'maroon' | 'purple';
    forceFallback?: boolean;
  };
  
  const paletteMap = {
    blue: {
      color1: '#0F044C',
      color2: '#141E61',
      color3: '#01005E',
      color4: '#22267B',
    },
    maroon: {
        color1: '#250902',
        color2: '#0f0000',
        color3: '#640d14',
        color4: '#ad2831',
    },
    purple: {
        color1: '#211C84',
        color2: '#4D55CC',
        color3: '#7A73D1',
        color4: '#B5A8D5',
    }
  };
  
  // capping the frame rate to 30 for performance
  const FRAME_RATE = 30;
  const FRAME_TIME = 1000 / FRAME_RATE;
  
  // Quality levels for different viewport positions
  const QUALITY_LEVELS = {
    ACTIVE: { speed: 0.08 },
    NEARBY: { speed: 0.06 },
    DISTANT: { speed: 0.04 },
    DORMANT: { speed: 0.02 }
  };

  // Simple gradient fallback while shader loads
  const GradientFallback = ({ colors }: { colors: typeof paletteMap.blue }) => (
    <div 
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(45deg, ${colors.color1}, ${colors.color2}, ${colors.color3}, ${colors.color4})`,
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
      }}
    />
  );
  
  const ShadedBackground = ({
    children,
    className = '',
    palette = 'blue',
    forceFallback = false,
  }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [lastFrameTime, setLastFrameTime] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [qualityLevel, setQualityLevel] = useState(QUALITY_LEVELS.ACTIVE);
    const [shouldLoadShader, setShouldLoadShader] = useState(false);
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

    useEffect(() => {
      if (!containerRef.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setIsVisible(entry.isIntersecting);
          
          // Start loading shader when section is about to become visible
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setShouldLoadShader(true);
          }
          
          // Calculate quality level based on intersection ratio and position
          if (!entry.isIntersecting) {
            setQualityLevel(QUALITY_LEVELS.DORMANT);
            return;
          }

          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;
          const distanceFromCenter = Math.abs(rect.top + rect.height/2 - viewportHeight/2);
          const maxDistance = viewportHeight * 1.5; // 1.5 viewport heights
          const distanceRatio = distanceFromCenter / maxDistance;

          if (entry.intersectionRatio > 0.8) {
            setQualityLevel(QUALITY_LEVELS.ACTIVE);
          } else if (distanceRatio < 0.5) {
            setQualityLevel(QUALITY_LEVELS.NEARBY);
          } else {
            setQualityLevel(QUALITY_LEVELS.DISTANT);
          }
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          rootMargin: '50% 0px' // Extend the observation area
        }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, []);

    const handleFrame = (timestamp: number) => {
      if (!isVisible) return false;
      if (timestamp - lastFrameTime >= FRAME_TIME) {
        setLastFrameTime(timestamp);
        return true;
      }
      return false;
    };

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
          {!isMobile && !forceFallback && shouldLoadShader ? (
            <Suspense fallback={<GradientFallback colors={colors} />}>
              <MeshGradient
                {...colors}
                speed={qualityLevel.speed}
                onFrame={handleFrame}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </Suspense>
          ) : (
            <GradientFallback colors={colors} />
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
  