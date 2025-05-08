"use client";

import { useEffect, useRef } from "react";

type VisualizerProps = {
  audioSrc: string;
};

const Visualizer = ({ audioSrc }: VisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !audioRef.current) return;
  
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const audio = audioRef.current;
  
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
  
    let audioCtx: AudioContext;
    let analyser: AnalyserNode;
    let source: MediaElementAudioSourceNode;
  
    const initAudio = () => {
      if (!audioCtx || audioCtx.state === "closed") {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
      }
  
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
  
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
  
      const draw = () => {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
  
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) * 0.6;
        const count = bufferLength;
        const angleStep = (Math.PI * 2) / count;
  
        for (let i = 0; i < count; i++) {
          const value = dataArray[i];
          const angle = i * angleStep;
          const dynamicRadius = radius + value * 0.5;
  
          const x = centerX + Math.cos(angle) * dynamicRadius;
          const y = centerY + Math.sin(angle) * dynamicRadius;
  
          const alpha = 0.3 + (value / 255) * 0.7;
  
          ctx.beginPath();
          ctx.arc(x, y, 2 + value / 40, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        }
      };
  
      draw();
    };
  
    audio.addEventListener("play", initAudio, { once: true });
  
    return () => {
      window.removeEventListener("resize", resize);
      audio.removeEventListener("play", initAudio);
      if (audioCtx && audioCtx.state !== "closed") {
        audioCtx.close();
      }
    };
  }, []);
  

  return (
    <div className="w-full h-[400px] relative">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <audio ref={audioRef} src={audioSrc} controls className="relative z-10 mx-auto mt-4 block" />
    </div>
  );
};

export default Visualizer;
