"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// 3D Audio Nebula Visualizer (Debugged)

type Props = { src: string };

export default function Visualizer3D({ src }: Props) {
  console.log("[Visualizer3D] mount src=", src);
  const audioEl = useRef<HTMLAudioElement>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  // Initialize Web Audio
  useEffect(() => {
    const audio = audioEl.current;
    if (!audio) {
      console.warn("[Visualizer3D] audioEl missing");
      return;
    }
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyserNode = ctx.createAnalyser();
    analyserNode.fftSize = 256;
    setAnalyser(analyserNode);

    const srcNode = ctx.createMediaElementSource(audio);
    srcNode.connect(analyserNode);
    analyserNode.connect(ctx.destination);

    const onPlay = () => {
      if (ctx.state === "suspended") ctx.resume();
    };
    audio.addEventListener("play", onPlay);

    return () => {
      audio.removeEventListener("play", onPlay);
      srcNode.disconnect();
      analyserNode.disconnect();
      ctx.close();
    };
  }, []);

  // Inner reactive point cloud
  function Cloud() {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.PointsMaterial>(null);

    useFrame(() => {
      const pts = pointsRef.current;
      const mat = materialRef.current;

      if (!pts || !analyser || !mat) return;

      // Rotate the points
      pts.rotation.y += 0.00000000001;

      if (analyser) {
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((sum, v) => sum + v, 0) / data.length;
        const norm = avg / 255;

        const hue = THREE.MathUtils.lerp(0.6, 0.0, norm);
        mat.color.setHSL(hue, 1, 0.5); // Set color based on average frequency

        mat.size = THREE.MathUtils.lerp(0.002, 0.08, norm); // Set size based on average frequency

        const scale = THREE.MathUtils.lerp(1, 2, avg / 255);
        pts.scale.set(scale, scale, scale);
      }
    });

    return (
      <points ref={pointsRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <pointsMaterial
          ref={materialRef}
          size={0.009}
          color="#ffffff"
          sizeAttenuation
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </points>
    );
  }

  return (
    <div className="w-full">
      <div className="h-[420px] rounded bg-black">
        <Canvas camera={{ position: [0, 0, 2] }} className="h-full">
          <color attach="background" args={["#000"]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.7} />
          <Cloud />
          <OrbitControls autoRotate autoRotateSpeed={0.1} enableZoom={true} enablePan={false} />
        </Canvas>
      </div>
      <audio
        ref={audioEl}
        src={src}
        controls
        className="block w-full max-w-md mx-auto mt-4"
      />
    </div>
  );
}
