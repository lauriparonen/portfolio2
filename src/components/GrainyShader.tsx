"use client"

interface GrainyShaderProps {
  children?: React.ReactNode;
  className?: string;
}

/** @paper-design/shaders-react@0.0.55 */
import { GrainGradient } from '@paper-design/shaders-react';

/**
 * Code exported from Paper
 * https://app.paper.design/file/01K6J72GY8WCGPTY7JA54XKV0M?node=01K6QNWF4NK3CTNWDDHFE95AF5
 * on Oct 9, 2025 at 12:29 PM.
 */
export default function GrainyShader({ children, className }: GrainyShaderProps) {
  return (
    <div className={className} style={{ position: 'relative' }}>
      <GrainGradient 
          colors={['#9F8EEC', '#6696EA', '#3F7CFF']} 
          colorBack="#00000000" 
          speed={0.17} 
          scale={0.57} 
          rotation={-143} 
          offsetX={0.2} 
          offsetY={-0.27} 
          softness={0.67} 
          intensity={0.16} 
          noise={0.21} 
          shape="wave" 
          frame={388314.307000006} 
          style={
            { position: 'absolute',
              top: -80,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -1,
              willChange: 'auto'
            }} />
            {children}
    </div>
  )
}
