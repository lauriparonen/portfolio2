"use client";

import Visualizer3D from "@/components/Visualizer3D";
import Visualizer2D from "@/components/Visualizer2D";
import Link from "next/link";

export default function VisualizerPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <Link 
            href="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← back to main page
          </Link>
        </div>
        {/*<Visualizer3D src="/audio/grassblades.mp3" />*/}
        <Visualizer2D audioSrc="/audio/grassblades.mp3" />
      </div>
    </div>
  );
} 