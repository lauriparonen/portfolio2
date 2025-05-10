"use client";

import Visualizer3D from "@/components/Visualizer3D";
import Visualizer2D from "@/components/Visualizer2D";
import Link from "next/link";
import { useState } from "react";

export default function VisualizerPage() {
  const [selectedTrack, setSelectedTrack] = useState("/audio/epilysis.mp3");
  const [showInfo, setShowInfo] = useState(false);
  const [showTechDetails, setShowTechDetails] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedTrack(url);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-8 flex justify-between items-center">
          <Link 
            href="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← back to main page
          </Link>
          
          <div className="flex items-center gap-4">
            <label 
              htmlFor="audio-upload" 
              className="cursor-pointer text-gray-400 hover:text-white transition-colors"
            >
              try with your own audio!
            </label>
            <input
              id="audio-upload"
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
        {/*<Visualizer3D src="/audio/grassblades.mp3" />*/}
        <Visualizer2D audioSrc={selectedTrack} />
        
        {/* footer */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowInfo(true)}
            className="rounded-lg bg-black/70 px-4 py-2 text-white transition-all duration-300 hover:bg-black/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            about
          </button>

          {showInfo && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
              <div className="bg-gray-900 rounded-xl p-6 max-w-lg">
                <h3 className="text-xl text-white mb-4">about the visualizer</h3>
                <p className="text-gray-300 mb-4">
                  This audio-reactive gradient visualizer analyzes your music in real-time, 
                  separating it into bass, mid, and treble frequencies. The colors and movement 
                  respond dynamically to the energy in each frequency band.
                </p>
                <p className="text-gray-300 mb-6">
                  You can customize the base colors using the color picker, and the visualizer 
                  will generate vibrant variations based on the audio input. The colors change dynamically and
                  somewhat unpredictably, making each visualization organic and unique.
                </p>
                <p className="text-gray-300 mb-6">
                  The default track is <i>Epilysis</i>, an ambient track of mine. 
                  You can also upload your own audio file to visualize. 
                </p>
                <div>
                  <button
                    onClick={() => setShowTechDetails(!showTechDetails)}
                    className="flex items-center justify-between w-full text-xl text-white mb-4"
                  >
                    <span>quick technical details</span>
                    <span className={`transform transition-transform duration-300 ${showTechDetails ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showTechDetails ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-300 mb-6">
                      The visualizer uses the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API" className="text-gray-400 hover:text-white transition-colors" target="_blank">Web Audio API</a> to analyze the audio and extract the frequency data.
                      The frequency data is used to modulate the color parameters of <i><a href="https://github.com/paper-design" className="text-gray-400 hover:text-white transition-colors" target="_blank">paper design's</a></i> mesh gradient shader.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowInfo(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}