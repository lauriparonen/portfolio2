// src/pages/index.tsx
import Head from "next/head";
import Header from "@/components/Header";
import Code from "@/sections/Code";
import Writing from "@/sections/Writing";
import Nous from "@/sections/Nous";
import Music from "@/sections/Music";
import Gallery from "@/sections/Gallery";
import Contact from "@/sections/Contact";
//import CollapsibleSection from "@/components/CollapsibleSection"; for future use

export default function Home() {
  return (
    <>
      <Head>
        <title>lauri paronen</title>
        <meta name="description" content="Developer, writer, and sound tinkerer" />
      </Head>
      <Header />
      <main className="pt-20 bg-black text-gray-200 scroll-smooth">
        <section id="code"><Code /></section>
        <section id="writing"><Writing /></section>
        <section id="nous"><Nous /></section>
        <section id="music"><Music /></section>
        <section id="gallery"><Gallery /></section>
        <section id="contact"><Contact /></section>
      </main>
    </>
  );
}
