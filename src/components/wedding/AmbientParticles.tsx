import { motion } from "framer-motion";
import { useMemo } from "react";

type ParticleType = "petal" | "marigold" | "diya";

interface Particle {
  id: number;
  type: ParticleType;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  rotateFrom: number;
  rotateTo: number;
}

const RosePetal = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="petalGrad" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="hsl(340, 80%, 78%)" />
        <stop offset="60%" stopColor="hsl(340, 70%, 60%)" />
        <stop offset="100%" stopColor="hsl(340, 65%, 45%)" />
      </radialGradient>
    </defs>
    <path
      d="M12 2 C 17 5, 20 11, 17 18 C 15 22, 9 22, 7 18 C 4 11, 7 5, 12 2 Z"
      fill="url(#petalGrad)"
      stroke="hsl(340, 60%, 40%)"
      strokeWidth="0.4"
      opacity="0.9"
    />
    <path d="M12 4 Q 12 12 12 20" stroke="hsl(340, 50%, 35%)" strokeWidth="0.3" opacity="0.5" />
  </svg>
);

const Marigold = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="marigoldGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="hsl(38, 95%, 70%)" />
        <stop offset="60%" stopColor="hsl(28, 90%, 55%)" />
        <stop offset="100%" stopColor="hsl(20, 85%, 42%)" />
      </radialGradient>
    </defs>
    {[...Array(8)].map((_, i) => (
      <ellipse
        key={i}
        cx="12"
        cy="6"
        rx="2.4"
        ry="4"
        fill="url(#marigoldGrad)"
        opacity="0.85"
        transform={`rotate(${i * 45} 12 12)`}
      />
    ))}
    {[...Array(8)].map((_, i) => (
      <ellipse
        key={`inner-${i}`}
        cx="12"
        cy="8.5"
        rx="1.8"
        ry="2.8"
        fill="hsl(32, 95%, 62%)"
        opacity="0.95"
        transform={`rotate(${i * 45 + 22.5} 12 12)`}
      />
    ))}
    <circle cx="12" cy="12" r="1.6" fill="hsl(24, 90%, 45%)" />
  </svg>
);

const Diya = ({ size }: { size: number }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="flameGrad" cx="50%" cy="65%" r="50%">
        <stop offset="0%" stopColor="hsl(50, 100%, 92%)" />
        <stop offset="40%" stopColor="hsl(40, 100%, 70%)" />
        <stop offset="80%" stopColor="hsl(25, 95%, 55%)" />
        <stop offset="100%" stopColor="hsl(10, 85%, 45%)" stopOpacity="0.4" />
      </radialGradient>
      <linearGradient id="diyaBowl" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(28, 70%, 55%)" />
        <stop offset="100%" stopColor="hsl(20, 65%, 30%)" />
      </linearGradient>
    </defs>
    {/* glow */}
    <ellipse cx="12" cy="14" rx="10" ry="12" fill="url(#flameGrad)" opacity="0.35" />
    {/* flame */}
    <path
      d="M12 4 C 14.5 9, 15 13, 12 18 C 9 13, 9.5 9, 12 4 Z"
      fill="url(#flameGrad)"
    />
    <path
      d="M12 8 C 13 11, 13 14, 12 17 C 11 14, 11 11, 12 8 Z"
      fill="hsl(50, 100%, 88%)"
      opacity="0.9"
    />
    {/* bowl */}
    <path
      d="M3 22 Q 12 32, 21 22 Q 18 26, 12 26 Q 6 26, 3 22 Z"
      fill="url(#diyaBowl)"
      stroke="hsl(35, 80%, 65%)"
      strokeWidth="0.4"
    />
    <ellipse cx="12" cy="22" rx="9" ry="1.5" fill="hsl(35, 80%, 60%)" opacity="0.7" />
  </svg>
);

const renderParticle = (type: ParticleType, size: number) => {
  if (type === "petal") return <RosePetal size={size} />;
  if (type === "marigold") return <Marigold size={size} />;
  return <Diya size={size} />;
};

const AmbientParticles = ({ count = 22 }: { count?: number }) => {
  const particles = useMemo<Particle[]>(() => {
    const types: ParticleType[] = ["petal", "petal", "marigold", "marigold", "diya"];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      type: types[i % types.length],
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 14 + Math.random() * 16,
      size: 14 + Math.random() * 18,
      drift: (Math.random() - 0.5) * 160,
      rotateFrom: Math.random() * 360,
      rotateTo: Math.random() * 720 - 360,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute -top-12"
          style={{ left: `${p.left}%` }}
          initial={{ y: -40, x: 0, rotate: p.rotateFrom, opacity: 0 }}
          animate={{
            y: ["-5vh", "105vh"],
            x: [0, p.drift * 0.5, p.drift, p.drift * 0.3, 0],
            rotate: [p.rotateFrom, p.rotateFrom + p.rotateTo],
            opacity: [0, 0.85, 0.85, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.1, 0.5, 0.9, 1],
          }}
        >
          <div
            style={{
              filter: p.type === "diya" ? "drop-shadow(0 0 8px hsl(40 100% 65% / 0.6))" : "drop-shadow(0 2px 4px hsl(0 0% 0% / 0.3))",
            }}
          >
            {renderParticle(p.type, p.size)}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AmbientParticles;