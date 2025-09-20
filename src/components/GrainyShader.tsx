"use client"

/** @paper-design/shaders-react@0.0.54 */
import { GrainGradient } from '@paper-design/shaders-react';

/**
 * Code exported from Paper
 * https://app.paper.design/file/01K5K7ETP2ADSCWM737XE092S3?node=01K5K7HVK0HASV4FYDMFF44B39
 * on Sep 20, 2025 at 1:15 PM.
 */
interface GrainyShaderProps {
  children?: React.ReactNode;
  className?: string;
}

export default function GrainyShader({ children, className }: GrainyShaderProps) {
  return (
    <div className={className} style={{ position: 'relative' }}>
      <GrainGradient 
        colors={['#5F85DF', '#280096', '#3C3B92']} 
        colorBack="#00000000" 
        speed={0.28} 
        scale={1.35} 
        rotation={0} 
        offsetX={0} 
        offsetY={0.26} 
        softness={0.7} 
        intensity={0.17} 
        noise={0.19} 
        shape="wave" 
        frame={87449.25000002515} 
        style={{ 
          backgroundColor: '#000A0F', 
          borderRadius: '0px', 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }} 
      />
      {children}
    </div>
  );
}
