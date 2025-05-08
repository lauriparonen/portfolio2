// pages/index.tsx
import { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import ShadedBackground, { Palette } from '@/components/ShadedBackground';
import CollapsibleSection from '@/components/CollapsibleSection';

import Code     from '@/sections/Code';
import Writing  from '@/sections/Writing';
import Nous     from '@/sections/Nous';
import Music    from '@/sections/Music';
import Gallery  from '@/sections/Gallery';
import Contact  from '@/sections/Contact';
import About    from '@/sections/About';

export default function Home() {
  const [activePalette, setActivePalette] = useState<Palette>('blue');

  return (
    <>
      <Head>
        <title>lauri paronen</title>
        <meta name="description" content="Developer, writer, and sound tinkerer" />
      </Head>

      {/* global background */}
      <ShadedBackground palette={activePalette} />

      <Header />

      <main className="relative z-10 pt-20 text-gray-200 scroll-smooth">
        <section id="about"><About /></section>

        <CollapsibleSection title="code"    palette="maroon" setActivePalette={setActivePalette}>
          <Code />
        </CollapsibleSection>

        <CollapsibleSection title="writing" palette="purple" setActivePalette={setActivePalette}>
          <Writing />
        </CollapsibleSection>

        <CollapsibleSection title="nous"    palette="blue"   setActivePalette={setActivePalette}>
          <Nous />
        </CollapsibleSection>

        <CollapsibleSection title="music"   palette="blue"   setActivePalette={setActivePalette}>
          <Music />
        </CollapsibleSection>

        <CollapsibleSection title="gallery" palette="blue"   setActivePalette={setActivePalette}>
          <Gallery />
        </CollapsibleSection>

        <CollapsibleSection title="contact" palette="blue"   setActivePalette={setActivePalette}>
          <Contact />
        </CollapsibleSection>
      </main>
    </>
  );
}
