import {
    createContext, useContext, useEffect, useState, ReactNode, memo,
  } from 'react';
  import { MeshGradient } from '@paper-design/shaders-react';
  
  const PALETTES = {
    blue:   { color1: '#091540', color2: '#7692ff', color3: '#abd2fa', color4: '#1b2cc1' },
    sunset: { color1: '#ff6b6b', color2: '#ffe66d', color3: '#ffb700', color4: '#ff4e50' },
    // add more…
  } as const;
  
  type PaletteKey = keyof typeof PALETTES;
  
  /* ----------  Context API  ---------- */
  const GradientCtx = createContext<(p: PaletteKey) => void>(() => {});
  
  export const usePalette = (palette: PaletteKey) => {
    const register = useContext(GradientCtx);
    /* tell the provider we need this palette; runs once per mount */
    useEffect(() => register(palette), [palette, register]);
  };
  
  /* ----------  Provider component  ---------- */
  export const GradientProvider = ({ children }: { children: ReactNode }) => {
    /* palettes that have at least one consumer */
    const [active, setActive] = useState<Set<PaletteKey>>(new Set());
  
    const register = (p: PaletteKey) =>
      setActive(prev => (prev.has(p) ? prev : new Set(prev).add(p)));
  
    return (
      <GradientCtx.Provider value={register}>
        {children}
  
        {Array.from(active).map(palette => {
          const { color1, color2, color3, color4 } = PALETTES[palette];
          return (
            <MeshGradient
              /* one canvas per palette, fixed behind everything */
              key={palette}
              color1={color1}
              color2={color2}
              color3={color3}
              color4={color4}
              speed={0.08}
              style={{
                position: 'fixed',
                inset: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: -1,       // lives *behind* page content
              }}
            />
          );
        })}
      </GradientCtx.Provider>
    );
  };
  