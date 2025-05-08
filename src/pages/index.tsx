// src/pages/index.tsx
import Head from "next/head";
import Header from "@/components/Header";
import Code from "@/sections/Code";
import Writing from "@/sections/Writing";
import Nous from "@/sections/Nous";
import Music from "@/sections/Music";
import Gallery from "@/sections/Gallery";
import Contact from "@/sections/Contact";
import About from "@/sections/About";
import { GradientProvider } from "@/components/GradientProvider";
import CollapsibleSection from "@/components/CollapsibleSection";

//import CollapsibleSection from "@/components/CollapsibleSection"; for future use

export default function Home() {
  return (
    <>
      <Head>
        <title>lauri paronen</title>
        <meta name="description" content="Developer, writer, and sound tinkerer" />
      </Head>
      <Header />
      <GradientProvider>
        <main className="pt-20 bg-black text-gray-200 scroll-smooth">
          <div id="gradient-layer-root" className="relative z-0">
            <section id="about"><About /></section>
            <section id="code">
              <CollapsibleSection title="code" defaultOpen={false} palette="sunset">
                <Code />
              </CollapsibleSection>
            </section>
            <section id="writing">
              <CollapsibleSection title="writing">
                <Writing />
              </CollapsibleSection>
            </section>
            <section id="nous">
              <CollapsibleSection title="nous" defaultOpen={false}>
                <Nous />
              </CollapsibleSection>
            </section>
            <section id="music">
              <CollapsibleSection title="music" defaultOpen={false}>
                <Music />
              </CollapsibleSection>
            </section>
            <section id="gallery">
              <CollapsibleSection title="gallery">
                <Gallery />
              </CollapsibleSection>
            </section>
            <section id="contact">
              <CollapsibleSection title="contact" defaultOpen={false}>
                <Contact />
              </CollapsibleSection>
            </section>
          </div>
        </main>
      </GradientProvider>
    </> 
  );
}
