import Link from "next/link";
//import Visualizer3D from "@/components/Visualizer3D";
import { useState } from "react";

export default function Music() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div>
      <p className="text-gray-400 max-w-xl mb-8">
        I sometimes tinker with sound. Below you can find my music on SoundCloud and Spotify.
        The <i>visualizer</i> button takes you to a page where you can find a colorful gradient audio visualizer. 
        It initially plays <i>Epilysis</i>, an ambient track of mine; but you can also visualize your own audio files	♪♪♪ ヽ(ˇ∀ˇ )ゞ
      </p>

      <div className="flex justify-center mb-8">
        <Link 
          href="/visualizer" 
          target="_blank"
          className="rounded-lg bg-black/70 px-4 py-2 text-white transition-all duration-300 hover:bg-black/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          visualizer
        </Link>
      </div>
      
      <div className="space-y-6 max-w-4xl mx-auto px-4 py-12">
        <div className="text-left text-gray-200">
          <button
            onClick={() => toggleSection('soundcloud')}
            className="flex items-center justify-between w-full text-left text-gray-400 hover:text-white mb-4"
          >
            <span>SoundCloud</span>
            <span className={`transform transition-transform duration-300 ${openSection === 'soundcloud' ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSection === 'soundcloud' ? 'max-h-[352px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="overflow-hidden rounded-xl shadow-md border border-gray-700">
              <iframe
                title="soundCloud"
                className="w-full h-[352px]"
                scrolling="no"
                frameBorder="0"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/lamiatunes&amp;color=%070707&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="text-left text-gray-200">
          <button
            onClick={() => toggleSection('spotify')}
            className="flex items-center justify-between w-full text-left text-gray-400 hover:text-white mb-4"
          >
            <span>Spotify</span>
            <span className={`transform transition-transform duration-300 ${openSection === 'spotify' ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSection === 'spotify' ? 'max-h-[352px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="overflow-hidden rounded-xl shadow-md border border-gray-700">
              <iframe
                title="spotify"
                className="w-full h-[352px]"
                src="https://open.spotify.com/embed/artist/6b1HmB9aQHT0nEXpB02pEm?utm_source=generator&theme=0"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
        
        <div className="text-left text-gray-200">
          <button
            onClick={() => toggleSection('favorite')}
            className="flex items-center justify-between w-full text-left text-gray-400 hover:text-white mb-4"
          >
            <span>my favorite track</span>
            <span className={`transform transition-transform duration-300 ${openSection === 'favorite' ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSection === 'favorite' ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-gray-400 max-w-xl mb-4">
              This is my favorite song I've made so far. It's an atmospheric ambient track:
            </p>
            <div className="overflow-hidden rounded-xl shadow-md border border-gray-700">
              <iframe
                title="spotify-track"
                className="w-full h-[352px]"
                src="https://open.spotify.com/embed/track/1NEcK1vbBzbvLh5SaLnJoh?utm_source=generator"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="text-left text-gray-200">
          <button
            onClick={() => toggleSection('idm')}
            className="flex items-center justify-between w-full text-left text-gray-400 hover:text-white mb-4"
          >
            <span>IDM playlist</span>
            <span className={`transform transition-transform duration-300 ${openSection === 'idm' ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSection === 'idm' ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="overflow-hidden rounded-xl shadow-md border border-gray-700">
              <iframe 
                title="idm-playlist"
                className="w-full h-[352px]"
                src="https://open.spotify.com/embed/playlist/7f1kshQCCRAKXepEzSlreJ?utm_source=generator&theme=0" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
