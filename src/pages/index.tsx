import { useState } from 'react';
import Head from "next/head";
import Header from "@/components/Header";
import Code from "@/sections/Code";
//import Writing from "@/sections/Writing";
import Nous from "@/sections/Nous";
import Music from "@/sections/Music";
import Gallery from "@/sections/Gallery";
import Contact from "@/sections/Contact";
import About from "@/sections/About";
import CollapsibleSection from "@/components/CollapsibleSection";
import GradientBackground from '@/components/GradientBackground';

type Palette = 'blue' | 'maroon' | 'purple';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activePalette, setActivePalette] = useState<Palette>('blue');

  const handleSectionClick = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(activeSection === section ? null : section);
  };

  const handleSectionToggle = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <>
      <Head>
        <title>lauri paronen</title>
        <meta name="description" content="Developer, writer, and sound tinkerer" />
      </Head>

      <Header onSectionClick={handleSectionClick} />

      <main className="relative z-10 pt-20 text-gray-200 scroll-smooth">
        <section id="about">
          <GradientBackground palette={activePalette}>
            <About />
          </GradientBackground>
        </section>

        <section id="code">
          <CollapsibleSection 
            title="code" 
            palette="maroon" 
            isOpen={activeSection === 'code'}
            onToggle={() => handleSectionToggle('code')}
          >
            <Code />
          </CollapsibleSection>
        </section>

{/*
        <section id="writing">
          <CollapsibleSection 
            title="writing" 
            palette="purple"
            isOpen={activeSection === 'writing'}
            onToggle={() => handleSectionToggle('writing')}
          >
            <Writing />
          </CollapsibleSection>
        </section>
*/}

        <section id="nous">
          <CollapsibleSection 
            title="nous" 
            palette="blue"
            isOpen={activeSection === 'nous'}
            onToggle={() => handleSectionToggle('nous')}
          >
            <Nous />
          </CollapsibleSection>
        </section>

        <section id="music">
          <CollapsibleSection 
            title="music" 
            palette="blue"
            isOpen={activeSection === 'music'}
            onToggle={() => handleSectionToggle('music')}
          >
            <Music />
          </CollapsibleSection>
        </section>

        <section id="gallery">
          <CollapsibleSection 
            title="gallery" 
            palette="blue"
            isOpen={activeSection === 'gallery'}
            onToggle={() => handleSectionToggle('gallery')}
          >
            <Gallery />
          </CollapsibleSection>
        </section>

        <section id="contact">
          <CollapsibleSection 
            title="contact" 
            palette="blue"
            isOpen={activeSection === 'contact'}
            onToggle={() => handleSectionToggle('contact')}
          >
            <Contact />
          </CollapsibleSection>
        </section>
      </main>
      <footer className="w-full relative py-6  text-gray-400 text-center text-sm mt-12 overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{ opacity: 0.25 }}>
        </div>

        <div className="relative z-10">
          © {new Date().getFullYear()} lauri paronen  {/* <br /> (ノ ˘_˘)ノ　ζ|||ζ　ζ|||ζ　ζ|||ζ */}
          
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="
            mt-4
            sm:mt-0 sm:absolute sm:right-6 sm:bottom-6
            text-gray-400 px-3 py-1 rounded-lg hover:bg-black/20 transition z-20
          "
          aria-label="Back to top"
        >
          ↑ back to top
        </button>

      </footer>
    </>
  );
}
