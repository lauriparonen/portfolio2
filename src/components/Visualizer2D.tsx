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

const DEFAULT_COLORS = {
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

// Convert hex to HSL
function hexToHSL(hex: string): [number, number, number] {
  // Remove the hash if it exists
  hex = hex.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    
    h /= 6;
  }

  return [
    Math.round(h * 360),
    Math.round(s * 100),
    Math.round(l * 100)
  ];
}

function lerpColor(a: string, b: string, t: number) {
  // Handle hex colors
  const isHex = (color: string) => color.startsWith('#');
  
  // Convert colors to HSL if they're in hex format
  const [ah, as, al] = isHex(a) ? hexToHSL(a) : a.match(/\d+/g)!.map(Number);
  const [bh, bs, bl] = isHex(b) ? hexToHSL(b) : b.match(/\d+/g)!.map(Number);
  
  return `hsl(${lerp(ah, bh, t)}, ${lerp(as, bs, t)}%, ${lerp(al, bl, t)}%)`;
}

// Add useMediaQuery hook
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

// —————————————————————————————————— component
const Visualizer = ({ audioSrc }: VisualizerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [audioData, setAudioData] = useState({ bass: 0, mid: 0, treble: 0 });
  const [restingColors, setRestingColors] = useState(DEFAULT_COLORS);
  const [showColorPicker, setShowColorPicker] = useState(false);

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
    if (!isPlaying) return restingColors;

    const { bass, mid, treble } = audioData;

    // Extract base hues from resting colors
    const getHue = (color: string) => {
      const isHex = color.startsWith('#');
      return isHex ? hexToHSL(color)[0] : parseInt(color.match(/\d+/g)![0]);
    };

    const baseHue1 = getHue(restingColors.color1);
    const baseHue2 = getHue(restingColors.color2);
    const baseHue3 = getHue(restingColors.color3);
    const baseHue4 = getHue(restingColors.color4);

    // Generate vibrant colors based on resting colors' hues
    const vib1 = `hsl(${Math.round(baseHue1 + bass * 80)}, 90%, ${50 + bass * 30}%)`;
    const vib2 = `hsl(${Math.round(baseHue2 + mid * 80)}, 95%, ${48 + mid * 30}%)`;
    const vib3 = `hsl(${Math.round(baseHue3 + treble * 60)}, 92%, ${46 + treble * 30}%)`;
    const vib4 = `hsl(${Math.round(baseHue4 + (bass + mid + treble) * 60)}, 88%, ${44 + (bass + mid + treble) * 30}%)`;

    const energy = clamp01((bass + mid + treble) / 1.1);

    return {
      color1: lerpColor(restingColors.color1, vib1, energy),
      color2: lerpColor(restingColors.color2, vib2, energy),
      color3: lerpColor(restingColors.color3, vib3, energy),
      color4: lerpColor(restingColors.color4, vib4, energy),
    } as const;
  };

  const handleColorChange = (key: keyof typeof restingColors, value: string) => {
    setRestingColors(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetColors = () => {
    setRestingColors(DEFAULT_COLORS);
  };

  /* ——— render ——— */
  const isMobile = useMediaQuery("(max-width: 768px)");

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

      <div className="flex flex-col items-center gap-4">
        <audio ref={audioRef} src={audioSrc} controls className="mx-auto block" />
        <div className="flex gap-2">
          {!isMobile && (
            <button
              onClick={toggleFullscreen}
              className="rounded-lg bg-black/70 px-4 py-2 text-white transition-all duration-300 hover:bg-black/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              {isFullscreen ? "exit fullscreen" : "fullscreen"}
            </button>
          )}
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="rounded-lg bg-black/70 px-4 py-2 text-white transition-all duration-300 hover:bg-black/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            {showColorPicker ? "hide colors" : "edit colors"}
          </button>
        </div>

        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showColorPicker ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mt-4 flex flex-col gap-4 rounded-lg bg-black/70 p-4">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(restingColors).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-2">
                  <label className="text-sm text-white">{key}</label>
                  <div className="relative">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => handleColorChange(key as keyof typeof restingColors, e.target.value)}
                      className="h-10 w-full cursor-pointer rounded border-2 border-white/20 bg-white/10 shadow-[0_0_0_2px_rgba(255,255,255,0.1)] transition-all hover:border-white/40 focus:border-white/60 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.2)]"
                    />
                    <div className="absolute inset-0 pointer-events-none rounded bg-gradient-to-br from-white/5 to-transparent" />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={resetColors}
              className="rounded-lg bg-white/10 px-4 py-2 text-white transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              reset colors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
