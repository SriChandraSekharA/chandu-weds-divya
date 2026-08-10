import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const MAROON = new THREE.Color("#6B1A1A");
const MAROON_DEEP = new THREE.Color("#3E0D0D");
const GOLD = new THREE.Color("#D4AF37");

const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uOpen;
  varying vec2 vUv;
  varying float vFold;
  void main() {
    vUv = uv;
    vec3 pos = position;
    // primary vertical fabric folds (deep wrinkles along x)
    float bigFold = sin(pos.x * 6.0) * 0.18;
    // secondary finer wrinkles
    float smallFold = sin(pos.x * 22.0 + pos.y * 1.2) * 0.04;
    // horizontal gathered wrinkles that stretch as curtain opens
    float gather = sin(pos.y * 9.0 + pos.x * 3.0) * 0.05 * (1.0 - uOpen * 0.6);
    // gentle idle sway
    float sway = sin(uTime * 0.7 + pos.y * 1.3) * 0.05 * (1.0 - uOpen);
    pos.z += bigFold + smallFold + gather;
    pos.x += sway;
    // fabric sags slightly downward in middle while closed
    pos.y += sin(pos.x * 1.5) * -0.04 * (1.0 - uOpen);
    vFold = bigFold + smallFold;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uDeep;
  uniform vec3 uGold;
  uniform float uSide; // -1 left, 1 right (gold trim on inner edge)
  varying vec2 vUv;
  varying float vFold;
  void main() {
    // layered vertical folds for richer velvet look
    float bigFolds = 0.5 + 0.5 * sin(vUv.x * 14.0);
    float fineFolds = 0.5 + 0.5 * sin(vUv.x * 46.0 + vUv.y * 2.0);
    float folds = mix(pow(bigFolds, 1.8), fineFolds, 0.25);
    // shading from displacement so wrinkles read as 3D
    float wrinkleShade = clamp(0.5 + vFold * 1.4, 0.2, 1.0);
    vec3 color = mix(uDeep, uBase, folds) * wrinkleShade;

    // horizontal gather creases
    float creases = 0.5 + 0.5 * sin(vUv.y * 60.0 + vUv.x * 4.0);
    color *= mix(0.85, 1.0, creases);

    // top vignette
    float topShade = smoothstep(1.0, 0.6, vUv.y);
    color *= mix(0.55, 1.0, topShade);

    // gold trim on inner edge
    float edgeX = uSide < 0.0 ? vUv.x : (1.0 - vUv.x);
    float trim = smoothstep(0.02, 0.0, edgeX);
    color = mix(color, uGold, trim);

    gl_FragColor = vec4(color, 1.0);
  }
`;

interface PanelProps {
  side: -1 | 1;
  progress: { value: number };
  width: number;
  height: number;
}

const Panel = ({ side, progress, width, height }: PanelProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpen: { value: 0 },
      uBase: { value: MAROON },
      uDeep: { value: MAROON_DEEP },
      uGold: { value: GOLD },
      uSide: { value: side },
    }),
    [side]
  );

  useFrame((_, delta) => {
    if (!meshRef.current || !matRef.current) return;
    const p = progress.value;
    matRef.current.uniforms.uTime.value += delta;
    matRef.current.uniforms.uOpen.value = p;
    // start half-overlapping in middle, slide outward
    const startX = side * (width * 0.25);
    const endX = side * (width * 1.4);
    meshRef.current.position.x = startX + (endX - startX) * p;
    meshRef.current.scale.x = 1 - p * 0.2;
  });

  return (
    <mesh ref={meshRef} position={[side * (width * 0.25), 0, 0]}>
      <planeGeometry args={[width * 0.6, height, 128, 64]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

const CurtainScene = ({
  progress,
}: {
  progress: { value: number };
}) => {
  // Camera is default; plane width chosen to cover viewport
  const width = 12;
  const height = 10;
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[0, 2, 4]} intensity={0.6} />
      <Panel side={-1} progress={progress} width={width} height={height} />
      <Panel side={1} progress={progress} width={width} height={height} />
    </>
  );
};

const CurtainIntro = ({ onComplete }: { onComplete?: () => void }) => {
  const [mounted, setMounted] = useState(true);
  const [fade, setFade] = useState(false);
  const progressRef = useRef({ value: 0 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const idleMs = reduced ? 300 : 1600;
    const openMs = reduced ? 900 : 4200;
    const fadeMs = 500;
    const revealDelay = 100;

    let raf: number;
    let start = 0;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start - idleMs;
      if (elapsed <= 0) {
        progressRef.current.value = 0;
      } else if (elapsed >= openMs) {
        progressRef.current.value = 1;
        return;
      } else {
        progressRef.current.value = easeInOutCubic(elapsed / openMs);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const fadeTimer = setTimeout(() => setFade(true), idleMs + openMs);
    const revealTimer = setTimeout(() => onComplete?.(), idleMs + openMs + revealDelay);
    const unmountTimer = setTimeout(
      () => setMounted(false),
      idleMs + openMs + fadeMs + 50
    );

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fadeTimer);
      clearTimeout(revealTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none transition-opacity duration-500"
      style={{ opacity: fade ? 0 : 1 }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <CurtainScene progress={progressRef.current} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CurtainIntro;