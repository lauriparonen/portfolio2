import { useLayoutEffect } from 'react';

export default function useShaderHole(
  open: boolean,
  ref: React.RefObject<HTMLElement | null>
) {
  useLayoutEffect(() => {
    const veil = document.getElementById('veil');
    if (!veil || !ref.current || !open) return;

    const hole = document.createElement('div');
    hole.className = 'hole';
    veil.appendChild(hole);

    const update = () => {
      const { top, height } = ref.current!.getBoundingClientRect();
      hole.style.top = `${top}px`;
      hole.style.height = `${height}px`;
      raf = requestAnimationFrame(update);
    };
    let raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      veil.removeChild(hole);
    };
  }, [open, ref]);
}
