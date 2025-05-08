// CollapsibleSection.tsx
import { useState } from 'react';
import ShadedBackground from './ShadedBackground';

type Props = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  palette?: 'blue' | 'maroon' | 'purple';
};

const CollapsibleSection = ({
  title,
  children,
  defaultOpen = false,
  palette = 'blue',
}: Props) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="border-b border-white/0 backdrop-blur-sm bg-black/5 hover:bg-black/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-20 flex w-full items-center justify-between py-4"
      >
        <h2 className="text-3xl font-serif pl-4">{title}</h2>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="overflow-hidden transition-all duration-500 ease-in-out max-h-[2000px] opacity-100">
          <ShadedBackground className="px-6 pb-8" palette={palette}>
            {children}
          </ShadedBackground>
        </div>
      )}
    </section>
  );
};

export default CollapsibleSection;
