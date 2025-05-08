import { useRef, useEffect } from 'react';

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const r = entry.intersectionRatio;      // 0 – 1
        // write ratio to CSS var so :before can fade
        entry.target instanceof HTMLElement &&
          entry.target.style.setProperty('--mask-opacity', `${r * 0.4}`);
          console.log(entry.intersectionRatio)
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative section-mask">
      {children}
    </div>
  );
};

export default SectionWrapper;