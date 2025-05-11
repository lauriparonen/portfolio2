import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  palette?: 'blue' | 'maroon' | 'purple';
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

const GradientBackground = ({
  children,
  className = '',
  palette = 'blue',
}: Props) => {
  const colors = paletteMap[palette];

  return (
    <div className={`relative overflow-hidden ${className}`}>
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
        <div 
          style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(45deg, ${colors.color1}, ${colors.color2}, ${colors.color3}, ${colors.color4})`,
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
          }}
        />
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

export default GradientBackground; 