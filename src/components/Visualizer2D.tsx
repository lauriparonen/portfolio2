"use client";

import { useEffect, useRef, useState } from "react";
import { MeshGradient } from '@paper-design/shaders-react';

type VisualizerProps = {
  audioSrc: string;
};

const RESTING_COLORS = {
  color1: 'hsl(286, 100.00%, 29.40%)', // deep blue
  color2: 'hsl(260, 30%, 16%)', // dark purple
  color3: 'hsl(240, 20%, 18%)', // navy
  color4: 'hsl(267, 100.00%, 12.00%)', // blue-gray
};

function lerpColor(a: string, b: string, t: number) {
  // a, b: hsl strings; t: 0-1
  const ah = +a.match(/hsl\((\d+),/i)?.[1] || 0;
  const asat = +a.match(/, (\d+)%/i)?.[1] || 0;
  const al = +a.match(/, (\d+)%\)/i)?.[1] || 0;
  const bh = +b.match(/hsl\((\d+),/i)?.[1] || 0;
  const bsat = +b.match(/, (\d+)%/i)?.[1] || 0;
  const bl = +b.match(/, (\d+)%\)/i)?.[1] || 0;
  const h = ah + (bh - ah) * t;
  const s = asat + (bsat - asat) * t;
  const l = al + (bl - al) * t;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

const Visualizer = ({ audioSrc }: VisualizerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState<{ bass: number; mid: number; treble: number }>({
    bass: 0,
    mid: 0,
    treble: 0
  });

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    let audioCtx: AudioContext;
    let analyser: AnalyserNode;
    let source: MediaElementAudioSourceNode;
    let rafId: number;

    const initAudio = () => {
      if (!audioCtx || audioCtx.state === "closed") {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 1024;
        source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const updateAudioData = () => {
        rafId = requestAnimationFrame(updateAudioData);
        analyser.getByteFrequencyData(dataArray);
        // Split frequency bands
        const bass = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 2550; // 0-200Hz
        const mid = dataArray.slice(10, 50).reduce((a, b) => a + b, 0) / 10200; // 200-1000Hz
        const treble = dataArray.slice(50).reduce((a, b) => a + b, 0) / 51000; // 1000Hz+
        setAudioData({ bass, mid, treble });
      };
      updateAudioData();
    };
    audio.addEventListener("play", initAudio, { once: true });
    // Track play/pause for color logic
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onPause);
    return () => {
      audio.removeEventListener("play", initAudio);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onPause);
      if (audioCtx && audioCtx.state !== "closed") {
        audioCtx.close();
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Convert audio data to colors
  const getColors = () => {
    if (!isPlaying) {
      return RESTING_COLORS;
    }
    const { bass, mid, treble } = audioData;
    // Vibrant targets
    const vib1 = `hsl(${Math.round(210 + bass * 120)}, 90%, ${30 + bass * 40}%)`;
    const vib2 = `hsl(${Math.round(260 + mid * 80)}, 95%, ${28 + mid * 45}%)`;
    const vib3 = `hsl(${Math.round(300 + treble * 60)}, 98%, ${26 + treble * 50}%)`;
    const vib4 = `hsl(${Math.round(200 + (bass + mid + treble) * 60)}, 90%, ${24 + (bass + mid + treble) * 40}%)`;
    // Interpolate from resting to vibrant based on overall energy
    const t = Math.min(1, (bass + mid + treble) / 1.2); // 0-1
    return {
      color1: lerpColor(RESTING_COLORS.color1, vib1, t),
      color2: lerpColor(RESTING_COLORS.color2, vib2, t),
      color3: lerpColor(RESTING_COLORS.color3, vib3, t),
      color4: lerpColor(RESTING_COLORS.color4, vib4, t),
    };
  };

  return (
    <div ref={containerRef} className="w-full h-[600px] relative">
      <div className="absolute inset-0">
        <MeshGradient
          {...getColors()}
          speed={0.2 + (isPlaying ? audioData.bass * 0.08 : 0)}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      {/* Controls below the canvas */}
      <div className="relative z-10 flex flex-col items-center pt-110">
        <audio ref={audioRef} src={audioSrc} controls className="mx-auto block" />
        <button
          onClick={toggleFullscreen}
          className="mt-4 px-4 py-2 bg-black/70 text-white rounded hover:bg-black/90 transition-colors"
        >
          {isFullscreen ? 'exit fullscreen' : 'fullscreen'}
        </button>
      </div>
    </div>
  );
};

export default Visualizer;
