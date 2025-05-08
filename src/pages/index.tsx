// src/pages/index.tsx
import { useState } from 'react';
import Head from "next/head";
import Header from "@/components/Header";
import Code from "@/sections/Code";
import Writing from "@/sections/Writing";
import Nous from "@/sections/Nous";
import Music from "@/sections/Music";
import Gallery from "@/sections/Gallery";
import Contact from "@/sections/Contact";
import About from "@/sections/About";
import CollapsibleSection from "@/components/CollapsibleSection";
import ShadedBackground from '@/components/ShadedBackground';

type Palette = 'blue' | 'maroon' | 'purple';

export default function Home() {
  const [activePalette, setActivePalette] = useState<Palette>('blue');
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>lauri paronen</title>
        <meta name="description" content="Developer, writer, and sound tinkerer" />
      </Head>

      <Header />

      <main className="relative z-10 pt-20 text-gray-200 scroll-smooth">
        <section id="about">
          <ShadedBackground palette={activePalette}>
            <About />
          </ShadedBackground>
        </section>

        <CollapsibleSection 
          title="code" 
          palette="maroon" 
          isOpen={activeSection === 'code'}
          onToggle={() => setActiveSection(activeSection === 'code' ? null : 'code')}
        >
          <Code />
        </CollapsibleSection>

        <CollapsibleSection 
          title="writing" 
          palette="purple"
          isOpen={activeSection === 'writing'}
          onToggle={() => setActiveSection(activeSection === 'writing' ? null : 'writing')}
        >
          <Writing />
        </CollapsibleSection>

        <CollapsibleSection 
          title="nous" 
          palette="blue"
          isOpen={activeSection === 'nous'}
          onToggle={() => setActiveSection(activeSection === 'nous' ? null : 'nous')}
        >
          <Nous />
        </CollapsibleSection>

        <CollapsibleSection 
          title="music" 
          palette="blue"
          isOpen={activeSection === 'music'}
          onToggle={() => setActiveSection(activeSection === 'music' ? null : 'music')}
        >
          <Music />
        </CollapsibleSection>

        <CollapsibleSection 
          title="gallery" 
          palette="blue"
          isOpen={activeSection === 'gallery'}
          onToggle={() => setActiveSection(activeSection === 'gallery' ? null : 'gallery')}
        >
          <Gallery />
        </CollapsibleSection>

        <CollapsibleSection 
          title="contact" 
          palette="blue"
          isOpen={activeSection === 'contact'}
          onToggle={() => setActiveSection(activeSection === 'contact' ? null : 'contact')}
        >
          <Contact />
        </CollapsibleSection>
      </main>
    </> 
  );
}
