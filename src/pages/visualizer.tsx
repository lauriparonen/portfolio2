"use client";

import Visualizer3D from "@/components/Visualizer3D";
import Visualizer2D from "@/components/Visualizer2D";
import Link from "next/link";
import { useState } from "react";

export default function VisualizerPage() {
  const [selectedTrack, setSelectedTrack] = useState("/audio/epilysis.mp3");

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
      </div>
    </div>
  );
}