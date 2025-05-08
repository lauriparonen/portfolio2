import { useEffect, useRef, useState } from 'react';
import type { Palette } from './ShadedBackground';
import SectionWrapper from './SectionWrapper';
import useShaderHole from '@/lib/useShaderHole';

type Props = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  palette?: Palette;                           // preferred accent
  setActivePalette?: (p: Palette) => void;     // passed down from layout
};

const CollapsibleSection = ({
  title,
  children,
  defaultOpen = false,
  palette = 'blue',
  setActivePalette,
}: Props) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const bodyRef = useRef<HTMLDivElement>(null);
  useShaderHole(isOpen, bodyRef);
  // if section is pre-opened by default, set palette on mount
  useEffect(() => {
    if (defaultOpen && setActivePalette) setActivePalette(palette);
    console.log('CollapsibleSection mounted for:', title);
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && setActivePalette) setActivePalette(palette);
  };

  return (
    <section className="border-b border-white/0 backdrop-blur-sm bg-black/5 hover:bg-black/10">
      <button
        onClick={toggle}
        className="relative z-20 flex w-full items-center justify-between py-4"
      >
        <h2 className="pl-4 text-3xl font-serif">{title}</h2>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
      <div className="max-h-[2000px] overflow-hidden transition-all duration-500 ease-in-out px-6 pb-8"
      ref={bodyRef}
      >
        <SectionWrapper>
          {children}
        </SectionWrapper>
      </div>
    )}
    </section>
  );
};

export default CollapsibleSection;
