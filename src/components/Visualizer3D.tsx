"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type Props = { src: string };

type VisualizationMode = "sphere" | "particles";

// Shared AudioContext instance
let sharedAudioContext: AudioContext | null = null;

export default function Visualizer3D({ src }: Props) {
  console.log("[Visualizer3D] mount src=", src);
  const audioEl = useRef<HTMLAudioElement>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [mode, setMode] = useState<VisualizationMode>("sphere");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dpr, setDpr] = useState(1);
  const frameCount = useRef(0);
  const FRAME_THROTTLE = 2; // Only update every 2nd frame

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    setDpr(window.devicePixelRatio);
  }, []);

  // Initialize Web Audio
  useEffect(() => {
    const audio = audioEl.current;
    if (!audio) {
      console.warn("[Visualizer3D] audioEl missing");
      return;
    }

    // Reuse existing AudioContext or create new one
    if (!sharedAudioContext || sharedAudioContext.state === "closed") {
      sharedAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const analyserNode = sharedAudioContext.createAnalyser();
    analyserNode.fftSize = isMobile ? 128 : 256; // Reduce FFT size on mobile
    setAnalyser(analyserNode);

    const srcNode = sharedAudioContext.createMediaElementSource(audio);
    srcNode.connect(analyserNode);
    analyserNode.connect(sharedAudioContext.destination);

    const onPlay = () => {
      if (sharedAudioContext?.state === "suspended") {
        sharedAudioContext.resume();
      }
    };
    audio.addEventListener("play", onPlay);

    // Set up intersection observer for visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (!entry.isIntersecting && sharedAudioContext?.state === "running") {
          sharedAudioContext.suspend();
        }
      },
      { threshold: 0.1 }
    );

    if (audio.parentElement) {
      observer.observe(audio.parentElement);
    }

    return () => {
      audio.removeEventListener("play", onPlay);
      srcNode.disconnect();
      analyserNode.disconnect();
      observer.disconnect();
    };
  }, [isMobile]);

  // Sphere visualization
  function SphereCloud() {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.PointsMaterial>(null);

    useFrame(() => {
      if (!isVisible) return;
      
      frameCount.current++;
      if (frameCount.current % (isMobile ? 4 : FRAME_THROTTLE) !== 0) return; // More aggressive throttling on mobile

      const pts = pointsRef.current;
      const mat = materialRef.current;

      if (!pts || !analyser || !mat) return;

      pts.rotation.y += 0.00000000001;

      if (analyser) {
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((sum, v) => sum + v, 0) / data.length;
        const norm = avg / 255;

        const hue = THREE.MathUtils.lerp(0.6, 0.0, norm);
        mat.color.setHSL(hue, 1, 0.5);

        mat.size = THREE.MathUtils.lerp(0.002, 0.08, norm);

        const scale = THREE.MathUtils.lerp(1, 2, avg / 255);
        pts.scale.set(scale, scale, scale);
      }
    });

    return (
      <points ref={pointsRef}>
        <sphereGeometry args={[1, isMobile ? 16 : 32, isMobile ? 16 : 32]} /> {/* Reduce geometry complexity on mobile */}
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

  // Particle system visualization
  function ParticleSystem() {
    const particlesRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.PointsMaterial>(null);
    const [particles] = useState(() => {
      const count = isMobile ? 1000 : 2000; // Reduce particle count on mobile
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);
      
      for (let i = 0; i < count; i++) {
        // Random initial positions in a sphere
        const radius = Math.random() * 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
        
        // Random initial velocities
        velocities[i * 3] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      }
      
      return { positions, velocities };
    });

    useFrame(() => {
      if (!isVisible) return;
      
      frameCount.current++;
      if (frameCount.current % (isMobile ? 4 : FRAME_THROTTLE) !== 0) return; // More aggressive throttling on mobile

      const pts = particlesRef.current;
      const mat = materialRef.current;

      if (!pts || !analyser || !mat) return;

      if (analyser) {
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((sum, v) => sum + v, 0) / data.length;
        const norm = avg / 255;

        // Update particle positions
        const positions = particles.positions;
        const velocities = particles.velocities;
        
        for (let i = 0; i < positions.length; i += 3) {
          // Update position based on velocity
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];
          
          // Add some audio reactivity to velocities
          velocities[i] += (Math.random() - 0.5) * 0.01 * norm;
          velocities[i + 1] += (Math.random() - 0.5) * 0.01 * norm;
          velocities[i + 2] += (Math.random() - 0.5) * 0.01 * norm;
          
          // Dampen velocities
          velocities[i] *= 0.99;
          velocities[i + 1] *= 0.99;
          velocities[i + 2] *= 0.99;
          
          // Keep particles within bounds
          const maxRadius = 3;
          const distance = Math.sqrt(
            positions[i] * positions[i] +
            positions[i + 1] * positions[i + 1] +
            positions[i + 2] * positions[i + 2]
          );
          
          if (distance > maxRadius) {
            const scale = maxRadius / distance;
            positions[i] *= scale;
            positions[i + 1] *= scale;
            positions[i + 2] *= scale;
          }
        }
        
        pts.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        pts.geometry.attributes.position.needsUpdate = true;

        // Update color and size based on audio
        const hue = (Date.now() * 0.0001 + norm * 0.05) % 1;
        const saturation = THREE.MathUtils.lerp(0.7, 1, Math.sin(Date.now() * 0.001) * 0.5 + 0.5);
        const lightness = THREE.MathUtils.lerp(0.3, 0.9, norm);
        mat.color.setHSL(hue, saturation, lightness);
        mat.size = THREE.MathUtils.lerp(0.002, 0.08, norm);
      }
    });

    return (
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles.positions, 3]}
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
        </bufferGeometry>
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
    <div className="w-full max-w-2xl mx-auto">
      <div className="h-[420px] rounded bg-black">
        <Canvas 
          camera={{ position: [0, 0, 2] }} 
          className="h-full"
          dpr={isMobile ? 1 : dpr} // Use state instead of direct window access
        >
          <color attach="background" args={["#000"]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.7} />
          {isVisible && (mode === "sphere" ? <SphereCloud /> : <ParticleSystem />)}
          <OrbitControls 
            autoRotate 
            autoRotateSpeed={0.1} 
            enableZoom={!isMobile} 
            enablePan={false} 
          />
        </Canvas>
      </div>
      <div className="flex justify-center mt-4">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as VisualizationMode)}
          className="bg-black text-white border border-gray-900 rounded px-4 py-2 focus:outline-none focus:border-gray-500 transition-all duration-300 ease-in-out hover:border-gray-500 focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="sphere">sphere</option>
          <option value="particles">particle system</option>
        </select>
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
