"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Float, Line, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function OrbitalCore() {
  const group = useRef<THREE.Group>(null);
  const globe = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const nodes = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => setProgress(Math.min(1, window.scrollY / Math.max(1, window.innerHeight * 2)));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useFrame((state, delta) => {
    if (!group.current || !globe.current || !ringA.current || !ringB.current || !nodes.current) return;
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.12, 0.025);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -state.pointer.x * 0.12, 0.025);
    const morph = THREE.MathUtils.smoothstep(progress, 0.12, 0.85);
    globe.current.scale.setScalar(1 - morph * 0.2);
    ringA.current.rotation.x = Math.PI / 2 + morph * 0.7;
    ringB.current.rotation.y += delta * (0.12 + morph * 0.2);
    nodes.current.rotation.y -= delta * 0.18;
    nodes.current.scale.setScalar(1 + morph * 0.14);
  });
  return <group ref={group}>
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.2}>
      <mesh ref={globe}>
        <icosahedronGeometry args={[1.28, 2]} />
        <meshBasicMaterial color="#9b91ff" wireframe transparent opacity={0.42} />
      </mesh>
      <mesh scale={0.94}>
        <icosahedronGeometry args={[1.28, 1]} />
        <meshBasicMaterial color="#c7f36b" wireframe transparent opacity={0.12} />
      </mesh>
    </Float>
    <mesh ref={ringA} rotation={[Math.PI / 2.5, 0.2, 0]}>
      <torusGeometry args={[1.72, 0.008, 8, 160]} />
      <meshBasicMaterial color="#c7f36b" transparent opacity={0.8} />
    </mesh>
    <mesh ref={ringB} rotation={[0.8, 0.3, 0.6]}>
      <torusGeometry args={[1.95, 0.006, 8, 160]} />
      <meshBasicMaterial color="#8e83ff" transparent opacity={0.65} />
    </mesh>
    <group ref={nodes}>
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        const r = 1.78 + (i % 2) * 0.18;
        return <mesh key={i} position={[Math.cos(a) * r, Math.sin(a * 1.7) * 0.5, Math.sin(a) * r]} rotation={[a, a * 0.4, 0]}>
          <boxGeometry args={[0.13, 0.13, 0.13]} />
          <meshStandardMaterial color={i % 3 === 0 ? "#c7f36b" : "#a39aff"} emissive={i % 3 === 0 ? "#647d2d" : "#423b8a"} emissiveIntensity={1.4} metalness={0.4} roughness={0.25} />
        </mesh>;
      })}
    </group>
    <Line points={[[-2.3, 0.35, -0.2], [-1.1, 0.8, 0.1], [0, 0, 0], [1.3, -0.45, 0.2], [2.2, 0.25, 0.1]]} color="#c7f36b" transparent opacity={0.35} lineWidth={1} />
    <Sparkles count={90} scale={5.5} size={1.8} speed={0.22} color="#a9a0ff" opacity={0.65} />
  </group>;
}

export default function HeroScene() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower = navigator.hardwareConcurrency <= 4 || (("deviceMemory" in navigator) && Number((navigator as Navigator & { deviceMemory?: number }).deviceMemory) <= 4);
    setEnabled(!reduced && !lowPower);
  }, []);
  if (!enabled) return <div aria-hidden="true" className="absolute right-[-5%] top-[18%] hidden h-[560px] w-[560px] rounded-full border border-[#c7f36b]/10 bg-[radial-gradient(circle,rgba(142,131,255,.13),transparent_68%)] lg:block" />;
  return <div aria-hidden="true" className="pointer-events-none absolute right-[-7%] top-[13%] hidden h-[650px] w-[650px] opacity-90 lg:block">
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6.8], fov: 42 }} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[3, 3, 3]} intensity={2.4} color="#c7f36b" />
      <pointLight position={[-3, -2, 2]} intensity={2} color="#8e83ff" />
      <OrbitalCore />
      <AdaptiveDpr pixelated />
    </Canvas>
  </div>;
}