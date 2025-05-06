import { useState } from 'react';

type SectionProps = {
    title: string;
    children: React.ReactNode;
};

const CollapsibleSection = ({ title, children }: SectionProps) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="border-t border-gray-800 py-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-left w-full text-2xl font-serif text-white hover:text-gray-300 transition"
        >
          {title}
        </button>
        {isOpen && <div className="mt-4">{children}</div>}
      </div>
    );
  };
  
  export default CollapsibleSection;