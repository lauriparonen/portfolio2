import { useEffect, useState } from "react";
import ShadedBackground from "@/components/ShadedBackground";
import Image from "next/image";

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ShadedBackground className="min-h-screen relative">
      <div className="px-6 py-20">
        <h2 className="text-3xl font-serif mb-4">about</h2>
        <p className="text-gray-400 max-w-xl mb-8">
          <i>generalist, writer, creative technologist</i>
          <br />
          based in Tampere, Finland
          <br />
          <br />
          BSc, Computer Science

          <br />
          <br />
          
          Here you can find my coding projects, writing, and other creative work.
          <br />
          Scroll below to explore ( ˙▿˙ )
          <br />
        </p>
      </div>
      
      <div className="w-40 md:w-48 mx-auto flex flex-col items-center group relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-40 md:h-48 relative focus:outline-none mx-auto flex items-center justify-center"
          style={{
            transform: `translateX(0) rotate(${scrollY * 0.2}deg)`,
            opacity: Math.max(0.3, 1 - scrollY * 0.001),
          }}
          aria-label="Show logo meaning"
        >
          <Image
            src="/ensolaurel-transparent-white.svg"
            alt="Enso-Laurel Circle"
            width={128}
            height={128}
          />
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black/0 text-gray-400 hover:text-white transition-colors px-2 py-1 rounded-lg border border-white/0 flex items-center justify-center mt-2 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
          tabIndex={0}
        >
          <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
        </button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out w-full flex justify-center ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-black/0 text-gray-400 rounded-lg px-4 py-4 border border-white/0 border-t-0 text-sm max-w-xl mx-auto">
          <p>
            In Zen Buddhist symbolism, the enso is a circle that represents <i>emptiness</i>.
            A common practice involves drawing the enso, or rather letting it draw itself,
            as part of the process of meditation. A master can discern a practitioner's adepthood instantly from the enso.
            <br />
            <br />
            In the logo above, the other side of the enso is a <i>laurel</i>. I choose to believe in nominative determinism—that my name deriving from this evergreen decorum used to crown
            victors is a token of the Fates looking over me. Bridging the two is an apt reminder for both <i>victory</i> and <i>emptiness</i>.
            <br />
            <br />
            <i>—Lauri</i>
          </p>
        </div>
      </div>
    </ShadedBackground>
  );
};

export default About; 