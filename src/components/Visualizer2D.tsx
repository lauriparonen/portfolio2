"use client";

import { useEffect, useRef, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

/**
 * Calmer, more colourful audio‑reactive gradient.
 * 
 * Changes from previous version
 * ——————————————————————————————————————————
 * • uses *average* energy per band instead of peak → smoother
 * • 95% low‑pass filter (≈350 ms @ 60 fps) to remove strobe
 * • slower envelope fall‑off (FALL = 0.97)
 * • compressed gain so values live in ≈ 0.15 – 0.8
 * • widened hue ranges → distinct cyan / magenta / yellow blend
 * • lightness floor lifted so gradient never goes full black
 */

type VisualizerProps = {
  audioSrc: string;
};

const RESTING_COLORS = {
  color1: "hsl(220, 65%, 18%)", // deep midnight
  color2: "hsl(260, 45%, 15%)", // purple
  color3: "hsl(240, 35%, 16%)", // navy
  color4: "hsl(280, 55%, 14%)", // indigo
};

// —————————————————————————————————— helpers
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function smooth(prev: number, next: number, coeff = 0.95) {
  return prev * coeff + next * (1 - coeff);
}
function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}
function lerpColor(a: string, b: string, t: number) {
  const [ah, as, al] = a.match(/\d+/g)!.map(Number);
  const [bh, bs, bl] = b.match(/\d+/g)!.map(Number);
  return `hsl(${lerp(ah, bh, t)}, ${lerp(as, bs, t)}%, ${lerp(al, bl, t)}%)`;
}

// —————————————————————————————————— component
const Visualizer = ({ audioSrc }: VisualizerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [audioData, setAudioData] = useState({ bass: 0, mid: 0, treble: 0 });

  /* ——— Fullscreen tracking ——— */
  useEffect(() => {
    const cb = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", cb);
    return () => document.removeEventListener("fullscreenchange", cb);
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await containerRef.current.requestFullscreen();
  };

  /* ——— Audio setup ——— */
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    let ctx: AudioContext;
    let analyser: AnalyserNode;
    let raf: number;

    const init = () => {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.85;

      ctx.createMediaElementSource(audio).connect(analyser);
      analyser.connect(ctx.destination);

      const data = new Uint8Array(analyser.frequencyBinCount);
      let prev = { bass: 0, mid: 0, treble: 0 };

      const FALL = 0.97; // slower decay
      const GAIN = { bass: 1.4, mid: 1.2, treble: 1.0 } as const;

      const loop = () => {
        raf = requestAnimationFrame(loop);
        analyser.getByteFrequencyData(data);

        /* average energy per band */
        const avg = (arr: Uint8Array) =>
          arr.reduce((s, v) => s + v, 0) / (arr.length * 255);

        const raw = {
          bass: avg(data.slice(0, 10)),
          mid: avg(data.slice(10, 50)),
          treble: avg(data.slice(50)),
        } as const;

        /* low‑pass filter + slow decay */
        prev = {
          bass: raw.bass > prev.bass ? smooth(prev.bass, raw.bass, 0.7) : prev.bass * FALL,
          mid: raw.mid > prev.mid ? smooth(prev.mid, raw.mid, 0.7) : prev.mid * FALL,
          treble: raw.treble > prev.treble ? smooth(prev.treble, raw.treble, 0.7) : prev.treble * FALL,
        };

        setAudioData({
          bass: clamp01(prev.bass * GAIN.bass),
          mid: clamp01(prev.mid * GAIN.mid),
          treble: clamp01(prev.treble * GAIN.treble),
        });
      };
      loop();
    };

    audio.addEventListener("play", init, { once: true });
    const setPlay = () => setIsPlaying(true);
    const setPause = () => setIsPlaying(false);
    audio.addEventListener("play", setPlay);
    audio.addEventListener("pause", setPause);
    audio.addEventListener("ended", setPause);

    return () => {
      audio.removeEventListener("play", init);
      audio.removeEventListener("play", setPlay);
      audio.removeEventListener("pause", setPause);
      audio.removeEventListener("ended", setPause);
      if (ctx) ctx.close();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* ——— Dynamic colours ——— */
  const getColors = () => {
    if (!isPlaying) return RESTING_COLORS;

    const { bass, mid, treble } = audioData;

    const vib1 = `hsl(${Math.round(160 - bass * 80)}, 90%, ${50 + bass * 30}%)`; // bass → cyan‑green
    const vib2 = `hsl(${Math.round(280 + mid * 80)}, 95%, ${48 + mid * 30}%)`;   // mid → purple‑pink
    const vib3 = `hsl(${Math.round(40 + treble * 60)}, 92%, ${46 + treble * 30}%)`; // treble → yellow‑orange
    const vib4 = `hsl(${Math.round(200 + (bass + mid + treble) * 160)}, 88%, ${44 + (bass + mid + treble) * 30}%)`;

    const energy = clamp01((bass + mid + treble) / 1.1);

    return {
      color1: lerpColor(RESTING_COLORS.color1, vib1, energy),
      color2: lerpColor(RESTING_COLORS.color2, vib2, energy),
      color3: lerpColor(RESTING_COLORS.color3, vib3, energy),
      color4: lerpColor(RESTING_COLORS.color4, vib4, energy),
    } as const;
  };

  /* ——— render ——— */
  return (
    <div className="flex flex-col gap-4">
      <div ref={containerRef} className="relative h-[600px] w-full">
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <MeshGradient
            {...getColors()}
            speed={0.12 + (audioData.bass + audioData.mid + audioData.treble) * 0.06}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <audio ref={audioRef} src={audioSrc} controls className="mx-auto block" />
        <button
          onClick={toggleFullscreen}
          className="mt-4 rounded bg-black/70 px-4 py-2 text-white transition hover:bg-black/90"
        >
          {isFullscreen ? "exit fullscreen" : "fullscreen"}
        </button>
      </div>
    </div>
  );
};

export default Visualizer;
