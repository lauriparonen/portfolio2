import { useState } from "react";
import ShadedBackground from "./ShadedBackground";

type Props = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const CollapsibleSection = ({ title, children, defaultOpen = false }: Props) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'h-auto' : 'h-20'}`}>
      <ShadedBackground className="h-full">
        <div className="px-6 py-20">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full text-left mb-4"
          >
            <h2 className="text-3xl font-serif">{title}</h2>
            <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          <div 
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {children}
          </div>
        </div>
      </ShadedBackground>
    </div>
  );
};

export default CollapsibleSection;