import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useRef, useMemo, Suspense, useState } from "react";
import * as THREE from "three";

// Monastery marker — floating golden orb with ring
function MonasteryMarker({ position, name, onClick }) {
  const ref = useRef();
  const ringRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t * 1.8 + position[0] * 2) * 0.07;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.5;
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
  });

  return (
    <group
      ref={ref}
      position={position}
      onClick={onClick}
      onPointerEnter={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerLeave={() => { setHovered(false); document.body.style.cursor = "default"; }}
    >
      {/* Main orb */}
      <mesh scale={hovered ? 1.4 : 1}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? "#fbbf24" : "#d97706"}
          emissive={hovered ? "#fbbf24" : "#b45309"}
          emissiveIntensity={hovered ? 2 : 0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Spinning ring */}
      <mesh ref={ringRef} scale={hovered ? 1.6 : 1.2}>
        <torusGeometry args={[0.28, 0.015, 16, 48]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.4} transparent opacity={0.6} />
      </mesh>
      {/* Ground glow disc */}
      <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.25, 24]} />
        <meshBasicMaterial color="#d97706" transparent opacity={hovered ? 0.3 : 0.1} />
      </mesh>
      {/* Name label */}
      <Text
        position={[0, 0.42, 0]}
        fontSize={hovered ? 0.14 : 0.11}
        color={hovered ? "#ffffff" : "#fcd34d"}
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.012}
        outlineColor="#000"
      >
        {name}
      </Text>
    </group>
  );
}

// Glowing connecting path
function TrailPath({ points }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5), [points]);
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.opacity = 0.5 + Math.sin(clock.getElapsedTime()) * 0.15;
    }
  });

  return (
    <mesh ref={ref}>
      <tubeGeometry args={[curve, 100, 0.02, 8, false]} />
      <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.6} transparent opacity={0.6} />
    </mesh>
  );
}

// Ambient floating particles
function FloatingParticles() {
  const ref = useRef();
  const count = 80;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 14;
      arr[i + 1] = Math.random() * 4 + 0.5;
      arr[i + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
      ref.current.position.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#fbbf24" transparent opacity={0.25} sizeAttenuation />
    </points>
  );
}

export default function MonasteryTrail3D({ monasteries = [], onSelectMonastery }) {
  const displayMonasteries = monasteries.slice(0, 8);

  // Arrange in a gentle spiral
  const pathPoints = useMemo(() => {
    return displayMonasteries.map((_, i) => {
      const angle = (i / displayMonasteries.length) * Math.PI * 1.7 - Math.PI * 0.35;
      const radius = 2.8 + i * 0.35;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      );
    });
  }, [displayMonasteries]);

  if (displayMonasteries.length === 0) return null;

  return (
    <div className="w-full h-[480px] rounded-2xl overflow-hidden border border-amber-700/30 shadow-2xl shadow-amber-900/20 relative">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none" style={{ backgroundImage: "url('/sikkim_bg.webp')" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none" />

      <Canvas camera={{ position: [0, 5, 9], fov: 45 }} gl={{ antialias: true, alpha: true }} className="relative z-10">
        <Suspense fallback={null}>
          <fog attach="fog" args={["#000000", 14, 25]} />

          {/* Lighting */}
          <ambientLight intensity={0.3} color="#fef3c7" />
          <pointLight position={[0, 5, 0]} intensity={1} color="#f59e0b" distance={15} />
          <pointLight position={[-4, 3, 4]} intensity={0.4} color="#fbbf24" />
          <pointLight position={[4, 3, -4]} intensity={0.4} color="#d97706" />

          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={5}
            maxDistance={16}
            minPolarAngle={Math.PI / 5}
            maxPolarAngle={Math.PI / 2.3}
            autoRotate
            autoRotateSpeed={0.6}
            target={[0, 0, 0]}
          />

          {/* Trail path */}
          {pathPoints.length >= 2 && <TrailPath points={pathPoints} />}

          {/* Monastery markers */}
          {displayMonasteries.map((m, i) => (
            <MonasteryMarker
              key={m.name}
              position={[pathPoints[i].x, pathPoints[i].y, pathPoints[i].z]}
              name={m.name.replace(" Monastery", "")}
              onClick={() => onSelectMonastery?.(m)}
            />
          ))}

          {/* Particles */}
          <FloatingParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
