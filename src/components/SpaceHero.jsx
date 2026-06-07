// SpaceHero.jsx
import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Cone, Cylinder } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// Global mouse tracker — works anywhere on the page, not just inside canvas
const globalMouse = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    // Map to NDC [-1, 1]
    globalMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    globalMouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
  });
}

function RealisticSun() {
  const sunRef = useRef();
  const glowRef = useRef();
  useFrame(() => {
    if (sunRef.current) sunRef.current.rotation.y += 0.001;
    if (glowRef.current) glowRef.current.rotation.y -= 0.0005;
  });
  return (
    <group>
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.6, 128, 128]} />
        <meshStandardMaterial color="#FDB813" emissive="#ff8c00" emissiveIntensity={3} roughness={0.6} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.1, 128, 128]} />
        <meshBasicMaterial color="#ffae00" transparent opacity={0.2} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.6, 128, 128]} />
        <meshBasicMaterial color="#ffdd66" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      <pointLight intensity={6} distance={100} decay={2} color="#ffcc66" />
    </group>
  );
}

function Earth() {
  const earthRef = useRef();
  useFrame(() => { if (earthRef.current) earthRef.current.rotation.y += 0.002; });
  return (
    <mesh ref={earthRef} position={[5, 0, 0]}>
      <sphereGeometry args={[0.7, 128, 128]} />
      <meshStandardMaterial color="#2563eb" roughness={0.8} metalness={0.1} emissive="#0f172a" emissiveIntensity={0.2} />
    </mesh>
  );
}

function OrbitRing() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[5, 5.01, 200]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.08} side={THREE.DoubleSide} />
    </mesh>
  );
}

function ShootingStar({ delay = 0 }) {
  const ref = useRef();
  const startX = useMemo(() => Math.random() * 26 - 6, []);
  const startY = useMemo(() => Math.random() * 8 + 4, []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() + delay) % 12;
    if (t < 1.8) {
      const progress = t / 1.8;
      ref.current.visible = true;
      ref.current.position.x = startX - progress * 16;
      ref.current.position.y = startY - progress * 7;
      ref.current.position.z = -6;
      ref.current.material.opacity = 1 - progress;
    } else {
      ref.current.visible = false;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.055, 16, 16]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={1} />
    </mesh>
  );
}

function SmokeParticle({ spaceshipRef, index, movingRef }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current || !spaceshipRef.current) return;
    const time = clock.getElapsedTime();
    const pulse = (time * 0.9 + index * 0.3) % 1;
    if (movingRef.current) {
      ref.current.visible = true;
      ref.current.position.x = spaceshipRef.current.position.x - 0.55 - pulse * 1.4;
      ref.current.position.y = spaceshipRef.current.position.y + Math.sin(index + time) * 0.16;
      ref.current.position.z = spaceshipRef.current.position.z;
      ref.current.scale.setScalar(0.15 + pulse * 0.5);
      ref.current.material.opacity = 0.35 * (1 - pulse);
    } else {
      ref.current.visible = false;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshBasicMaterial color="#cbd5e1" transparent opacity={0.25} />
    </mesh>
  );
}

function Spaceship() {
  const shipRef = useRef();
  const { viewport } = useThree();

  const smooth = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const rotSmooth = useRef({ y: 0, x: 0, z: 0 });
  const movingRef = useRef(false);
  const lastSmooth = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!shipRef.current) return;

    // Use global mouse — works even when scrolled past the canvas
    const targetX = globalMouse.x * (viewport.width / 2);
    const targetY = globalMouse.y * (viewport.height / 2);

    const prevX = smooth.current.x;
    const prevY = smooth.current.y;

    // Silky lerp factor — 0.08 gives that "floating on water" feel
    smooth.current.x = THREE.MathUtils.lerp(smooth.current.x, targetX, 0.08);
    smooth.current.y = THREE.MathUtils.lerp(smooth.current.y, targetY, 0.08);

    velocity.current.x = smooth.current.x - prevX;
    velocity.current.y = smooth.current.y - prevY;

    // Detect meaningful movement for thruster smoke
    const speed = Math.abs(velocity.current.x) + Math.abs(velocity.current.y);
    movingRef.current = speed > 0.002;

    shipRef.current.position.x = smooth.current.x;
    shipRef.current.position.y = smooth.current.y;

    // Dynamic banking — amplified velocity gives satisfying tilt
    const targetRotY = THREE.MathUtils.clamp(velocity.current.x * 22, -1.0, 1.0);
    const targetRotX = THREE.MathUtils.clamp(-velocity.current.y * 16, -0.7, 0.7);
    const targetRotZ = THREE.MathUtils.clamp(-velocity.current.x * 14, -0.6, 0.6);

    rotSmooth.current.y = THREE.MathUtils.lerp(rotSmooth.current.y, targetRotY, 0.1);
    rotSmooth.current.x = THREE.MathUtils.lerp(rotSmooth.current.x, targetRotX, 0.1);
    rotSmooth.current.z = THREE.MathUtils.lerp(rotSmooth.current.z, targetRotZ, 0.1);

    shipRef.current.rotation.y = rotSmooth.current.y;
    shipRef.current.rotation.x = rotSmooth.current.x;
    shipRef.current.rotation.z = rotSmooth.current.z;
  });

  return (
    <>
      <group ref={shipRef} position={[0, -1.5, 3]} scale={0.55}>
        <Cone args={[0.35, 1.1, 32]} rotation={[0, 0, -Math.PI / 2]}>
          <meshStandardMaterial color="#e5e7eb" metalness={0.6} roughness={0.25} />
        </Cone>
        <Cylinder args={[0.25, 0.35, 1.2, 32]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.25} />
        </Cylinder>
        <mesh position={[0.15, 0.18, 0.02]}>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={1.2} transparent opacity={0.9} />
        </mesh>
        <mesh position={[-0.55, 0.28, 0]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[0.7, 0.12, 0.05]} />
          <meshStandardMaterial color="#64748b" metalness={0.5} />
        </mesh>
        <mesh position={[-0.55, -0.28, 0]} rotation={[0, 0, 0.5]}>
          <boxGeometry args={[0.7, 0.12, 0.05]} />
          <meshStandardMaterial color="#64748b" metalness={0.5} />
        </mesh>
        <pointLight position={[-0.8, 0, 0]} intensity={1.5} color="#f97316" />
        <mesh position={[-0.75, 0, 0]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshBasicMaterial color="#fb923c" transparent opacity={0.9} />
        </mesh>
      </group>

      {[...Array(10)].map((_, i) => (
        <SmokeParticle key={i} spaceshipRef={shipRef} index={i} movingRef={movingRef} />
      ))}
    </>
  );
}

export default function SpaceHero() {
  return (
    <section style={{
      width: "100%",
      height: "100%",
      background: "radial-gradient(circle at center, #111827 0%, #020617 45%, #000000 100%)",
      position: "relative",
      overflow: "hidden",
      pointerEvents: "none", // let scroll events pass through to page
    }}>
      <Canvas
        style={{ pointerEvents: "none" }}
        camera={{ position: [0, 3.5, 13], fov: 58 }}
      >
        <ambientLight intensity={0.25} />
        <Stars radius={160} depth={80} count={8000} factor={4} fade speed={0.12} />
        <RealisticSun />
        <OrbitRing />
        <Earth />
        <Spaceship />
        <ShootingStar delay={0} />
        <ShootingStar delay={5} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.08} />
        <EffectComposer>
          <Bloom intensity={1.6} luminanceThreshold={0} luminanceSmoothing={0.9} />
        </EffectComposer>
      </Canvas>
    </section>
  );
}
