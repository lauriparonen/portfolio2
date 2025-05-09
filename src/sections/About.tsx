import { useEffect, useState } from "react";
import ShadedBackground from "@/components/ShadedBackground";
import Image from "next/image";

const About = () => {
  const [scrollY, setScrollY] = useState(0);

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
      
      <div 
        className="w-40 h-40 mx-auto my-8 relative md:w-48 md:h-48"
        style={{
          transform: `rotate(${scrollY * 0.2}deg)`,
          opacity: Math.max(0.3, 1 - scrollY * 0.001),
        }}
      >
        <Image
          src="/ensolaurel-transparent-white.svg"
          alt="Enso-Laurel Circle"
          width={128}
          height={128}
          className="w-full h-full"
        />
      </div>
    </ShadedBackground>
  );
};

export default About; 