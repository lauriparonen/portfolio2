import { useRef, useEffect, useState } from 'react';
import ShadedBackground from './ShadedBackground';

type Props = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  palette?: 'blue' | 'maroon' | 'purple';
};

const CollapsibleSection = ({
  title,
  children,
  isOpen,
  onToggle,
  palette = 'blue',
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (!contentRef.current) return;
    setContentHeight(contentRef.current.scrollHeight);
    // Add ResizeObserver to update height dynamically
    const observer = new window.ResizeObserver(() => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [children]);

  return (
    <section className="border-b border-white/0 backdrop-blur-sm bg-black/5 hover:bg-black/10">
      <button
        onClick={onToggle}
        className="relative z-20 flex w-full items-center justify-between py-4 px-4 cursor-pointer hover:bg-black/5 transition-colors"
      >
        <h2 className="text-3xl font-serif">{title}</h2>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </button>

      <div 
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ 
          maxHeight: isOpen ? contentHeight : 0,
          opacity: isOpen ? 1 : 0
        }}
      >
        <div ref={contentRef}>
          <ShadedBackground className="px-6 pb-8" palette={palette} forceFallback={true}>
            {children}
          </ShadedBackground>
        </div>
      </div>
    </section>
  );
};

export default CollapsibleSection;
