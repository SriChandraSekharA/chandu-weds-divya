import { motion } from "framer-motion";
import { useMemo } from "react";

type ParticleType = "petal" | "marigold" | "hibiscus" | "jasmine" | "lotus";

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

const Hibiscus = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="hibGrad" cx="50%" cy="60%" r="60%">
        <stop offset="0%" stopColor="hsl(345, 90%, 80%)" />
        <stop offset="60%" stopColor="hsl(350, 80%, 58%)" />
        <stop offset="100%" stopColor="hsl(350, 75%, 40%)" />
      </radialGradient>
    </defs>
    {[...Array(5)].map((_, i) => (
      <path
        key={i}
        d="M12 12 C 8 8, 8 3, 12 2 C 16 3, 16 8, 12 12 Z"
        fill="url(#hibGrad)"
        opacity="0.9"
        transform={`rotate(${i * 72} 12 12)`}
      />
    ))}
    <circle cx="12" cy="12" r="1.6" fill="hsl(50, 95%, 65%)" />
    <line x1="12" y1="12" x2="12" y2="20" stroke="hsl(45, 90%, 60%)" strokeWidth="0.6" />
  </svg>
);

const Jasmine = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="jasGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="hsl(45, 60%, 98%)" />
        <stop offset="100%" stopColor="hsl(40, 40%, 86%)" />
      </radialGradient>
    </defs>
    {[...Array(6)].map((_, i) => (
      <ellipse
        key={i}
        cx="12"
        cy="7"
        rx="2"
        ry="3.5"
        fill="url(#jasGrad)"
        opacity="0.95"
        transform={`rotate(${i * 60} 12 12)`}
      />
    ))}
    <circle cx="12" cy="12" r="1.2" fill="hsl(48, 85%, 70%)" />
  </svg>
);

const Lotus = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="lotusGrad" cx="50%" cy="60%" r="55%">
        <stop offset="0%" stopColor="hsl(330, 85%, 88%)" />
        <stop offset="100%" stopColor="hsl(330, 70%, 60%)" />
      </radialGradient>
    </defs>
    {[...Array(8)].map((_, i) => (
      <path
        key={i}
        d="M12 12 C 10.5 7, 10.5 3, 12 2 C 13.5 3, 13.5 7, 12 12 Z"
        fill="url(#lotusGrad)"
        opacity="0.85"
        transform={`rotate(${i * 45} 12 12)`}
      />
    ))}
    <circle cx="12" cy="12" r="1.4" fill="hsl(45, 90%, 70%)" />
  </svg>
);

const renderParticle = (type: ParticleType, size: number) => {
  if (type === "petal") return <RosePetal size={size} />;
  if (type === "marigold") return <Marigold size={size} />;
  if (type === "hibiscus") return <Hibiscus size={size} />;
  if (type === "jasmine") return <Jasmine size={size} />;
  return <Lotus size={size} />;
};

const AmbientParticles = ({ count = 18 }: { count?: number }) => {
  const particles = useMemo<Particle[]>(() => {
    const types: ParticleType[] = ["petal", "hibiscus", "marigold", "jasmine", "hibiscus", "lotus", "petal"];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      type: types[i % types.length],
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 22 + Math.random() * 22,
      size: 12 + Math.random() * 14,
      drift: (Math.random() - 0.5) * 160,
      rotateFrom: Math.random() * 360,
      rotateTo: Math.random() * 720 - 360,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
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
            opacity: [0, 0.25, 0.3, 0.2, 0],
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
              filter: "blur(0.4px) drop-shadow(0 1px 2px hsl(0 0% 0% / 0.2))",
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