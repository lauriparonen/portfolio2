"use client";

import { useEffect, useRef, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

/**
 * audio-reactive mesh gradient visualizer 
 * vibe coded af lol shoutout gpt5
 * 
 * secret sauce is in cross-band modulation in the distortion and swirl parameters
 * 
 * fits w/ @paper-design/shaders-react 0.0.54, might break in newer versions
 * supports: colors[], distortion, swirl, grainMixer, grainOverlay
 */

type VisualizerProps = { audioSrc: string };

const DEFAULT_COLORS = {
  color1: "#162346",
  color2: "#261c3d",
  color3: "#1a2038",
  color4: "#1d083f",
};

// utils ——————————————————————————————
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (prev: number, next: number, coeff = 0.95) =>
  prev * coeff + next * (1 - coeff);
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

function hslToHex(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const [r, g, b] = (
    h < 60 ? [c, x, 0] :
    h < 120 ? [x, c, 0] :
    h < 180 ? [0, c, x] :
    h < 240 ? [0, x, c] :
    h < 300 ? [x, 0, c] :
              [c, 0, x]
  ).map(v => Math.round((v + m) * 255));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function lerpColorHSL(a: string, b: string, t: number) {
  const parse = (color: string): [number, number, number] => {
    if (color.startsWith("#")) {
      // hex → hsl
      const r = parseInt(color.slice(1, 3), 16) / 255;
      const g = parseInt(color.slice(3, 5), 16) / 255;
      const b = parseInt(color.slice(5, 7), 16) / 255;
      const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      let h = 0,
        s = 0;
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
        h *= 60;
      }
      return [h, s * 100, l * 100];
    } else {
      // hsl string
      const nums = color.match(/\d+(\.\d+)?/g);
      if (!nums) return [0, 0, 0];
      return nums.map(Number) as [number, number, number];
    }
  };

  const [ah, as, al] = parse(a);
  const [bh, bs, bl] = parse(b);
  return hslToHex(lerp(ah, bh, t), lerp(as, bs, t), lerp(al, bl, t));
}


function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    listener();
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);
  return matches;
}

// component ——————————————————————————————
const Visualizer = ({ audioSrc }: VisualizerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [audioData, setAudioData] = useState({ bass: 0, mid: 0, treble: 0 });
  const [restingColors, setRestingColors] = useState(DEFAULT_COLORS);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

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

  // audio setup
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
      const FALL = 0.97;
      const GAIN = { bass: 1.4, mid: 1.2, treble: 1.0 } as const;

      const loop = () => {
        raf = requestAnimationFrame(loop);
        analyser.getByteFrequencyData(data);
        const avg = (arr: Uint8Array) =>
          arr.reduce((s, v) => s + v, 0) / (arr.length * 255);
        const raw = {
          bass: avg(data.slice(0, 10)),
          mid: avg(data.slice(10, 50)),
          treble: avg(data.slice(50)),
        } as const;
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

  const prevColorsRef = useRef<string[]>([
    restingColors.color1,
    restingColors.color2,
    restingColors.color3,
    restingColors.color4,
  ]);

  useEffect(() => {
    // when user changes palette manually, reset baseline
    prevColorsRef.current = [
      restingColors.color1,
      restingColors.color2,
      restingColors.color3,
      restingColors.color4,
    ];
  }, [restingColors]);

  const getColors = () => {
    const { bass, mid, treble } = audioData;
    const energy = clamp01((bass + mid + treble) / 1.1);

    const hexToHsl = (hex: string): [number, number, number] => {
      hex = hex.replace("#", "");
      const r = parseInt(hex.slice(0, 2), 16) / 255;
      const g = parseInt(hex.slice(2, 4), 16) / 255;
      const b = parseInt(hex.slice(4, 6), 16) / 255;
      const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      let h = 0,
        s = 0;
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
        h *= 60;
      }
      return [h, s * 100, l * 100];
    };

    const adjust = (
      [h, s, l]: [number, number, number],
      hueDelta: number,
      sDelta: number,
      lDelta: number
    ) => {
      const hh = ((h + hueDelta) % 360 + 360) % 360;
      const ss = Math.min(100, Math.max(0, s + sDelta));
      const ll = Math.min(100, Math.max(0, l + lDelta));
      return hslToHex(hh, ss, ll);
    };

    const [h1, s1, l1] = hexToHsl(restingColors.color1);
    const [h2, s2, l2] = hexToHsl(restingColors.color2);
    const [h3, s3, l3] = hexToHsl(restingColors.color3);
    const [h4, s4, l4] = hexToHsl(restingColors.color4);

    const nextColors = [
      adjust([h1, s1, l1], bass * 60, 8, bass * 20),
      adjust([h2, s2, l2], mid * 60, 8, mid * 20),
      adjust([h3, s3, l3], treble * 40, 8, treble * 20),
      adjust([h4, s4, l4], energy * 40, 6, energy * 15),
    ];

    // smooth interpolation between frames
    const smoothed = nextColors.map((next, i) =>
      lerpColorHSL(prevColorsRef.current[i], next, 0.25)
    );
    prevColorsRef.current = smoothed;

    return smoothed;
  };


  const handleColorChange = (key: keyof typeof restingColors, value: string) =>
    setRestingColors(prev => ({ ...prev, [key]: value }));
  const resetColors = () => setRestingColors(DEFAULT_COLORS);

  useEffect(() => {
    return () => {
      setIsMounted(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const isMobile = useMediaQuery("(max-width: 768px)");
  if (!isMounted) return null;

  const colors = getColors();

  return (
    <div className="flex flex-col gap-4">
      <div ref={containerRef} className="relative h-[600px] w-full">
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <MeshGradient
            colors={colors}
            speed={0.12 + (audioData.bass + audioData.mid + (audioData.treble * 1.2)) * 0.06}
            distortion={audioData.bass * 0.5 + audioData.mid * 0.2}
            swirl={audioData.treble * 0.4 + audioData.mid * 0.3}
            grainMixer={0.2}
            grainOverlay={0.1}
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
            showColorPicker ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
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
                      onChange={(e) =>
                        handleColorChange(key as keyof typeof restingColors, e.target.value)
                      }
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
