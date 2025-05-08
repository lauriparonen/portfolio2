import { useEffect, useState } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';

export type Palette = 'blue' | 'maroon' | 'purple';

const paletteMap = {
  blue:   { color1: '#091540', color2: '#7692ff', color3: '#abd2fa', color4: '#1b2cc1' },
  maroon: { color1: '#250902', color2: '#38040e', color3: '#640d14', color4: '#ad2831' },
  purple: { color1: '#10002b', color2: '#3c096c', color3: '#9d4edd', color4: '#e0aaff' },
};

type Props = { palette: Palette };

const ShadedBackground = ({ palette }: Props) => {
  const [colors, setColors] = useState(paletteMap[palette]);

  // update on palette change
  useEffect(() => setColors(paletteMap[palette]), [palette]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <MeshGradient {...colors} speed={0.08} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default ShadedBackground;
