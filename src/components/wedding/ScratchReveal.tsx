import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { useLanguage, t } from "./LanguageContext";

const CARD_W = 320;
const CARD_H = 420;
const RADIUS = 28;
const THRESHOLD = 0.55;

// Confetti particle type
interface Confetti {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  velocity: { x: number; y: number };
}

// Scratch particle type
interface ScratchParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

const CONFETTI_COLORS = ["#d4af37", "#f0cbb4", "#c98d7a", "#b97f8e", "#e8d5b7", "#fff"];

const ScratchReveal = ({ onDone }: { onDone: () => void }) => {
  const { lang } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [supported, setSupported] = useState(true);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [particles, setParticles] = useState<ScratchParticle[]>([]);
  const particleId = useRef(0);

  // Haptic feedback helper
  const vibrate = useCallback((pattern: number | number[]) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }, []);

  // Spawn scratch particles
  const spawnParticles = useCallback((x: number, y: number) => {
    const newParticles: ScratchParticle[] = [];
    for (let i = 0; i < 3; i++) {
      newParticles.push({
        id: particleId.current++,
        x: x + (Math.random() - 0.5) * 30,
        y: y + (Math.random() - 0.5) * 30,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 3 + Math.random() * 4,
      });
    }
    setParticles((prev) => [...prev.slice(-20), ...newParticles]);
  }, []);

  // Spawn confetti burst on reveal
  const spawnConfetti = useCallback(() => {
    const newConfetti: Confetti[] = [];
    for (let i = 0; i < 60; i++) {
      const angle = (Math.PI * 2 * i) / 60 + Math.random() * 0.5;
      const speed = 8 + Math.random() * 12;
      newConfetti.push({
        id: i,
        x: CARD_W / 2,
        y: CARD_H / 2,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed - 5,
        },
      });
    }
    setConfetti(newConfetti);
    vibrate([50, 30, 100]); // celebration vibration pattern
  }, [vibrate]);

  // lock page scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // paint foil
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setSupported(false);
      return;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = CARD_W * dpr;
    canvas.height = CARD_H * dpr;
    ctx.scale(dpr, dpr);

    const grad = ctx.createLinearGradient(0, 0, CARD_W, CARD_H);
    grad.addColorStop(0, "#3b2a56");
    grad.addColorStop(0.35, "#c98d7a");
    grad.addColorStop(0.5, "#f0cbb4");
    grad.addColorStop(0.65, "#b97f8e");
    grad.addColorStop(1, "#2e2447");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CARD_W, CARD_H);

    // foil sheen streaks
    ctx.globalAlpha = 0.12;
    for (let i = -CARD_H; i < CARD_W + CARD_H; i += 14) {
      ctx.strokeStyle = i % 28 === 0 ? "#ffffff" : "#000000";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i - CARD_H, CARD_H);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Add glitter/sparkle dots
    ctx.globalAlpha = 0.4;
    for (let i = 0; i < 50; i++) {
      const gx = Math.random() * CARD_W;
      const gy = Math.random() * CARD_H;
      const gr = 1 + Math.random() * 2;
      ctx.beginPath();
      ctx.arc(gx, gy, gr, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.5 ? "#ffffff" : "#f0cbb4";
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.textAlign = "center";
    ctx.font = "700 20px system-ui, sans-serif";
    const hint = t(lang, "scratch.hint");
    // dark pill behind the text for guaranteed contrast on any foil color
    ctx.fillStyle = "rgba(20,12,30,0.78)";
    const metrics = ctx.measureText(hint);
    const padX = 22, padY = 12;
    const tw = metrics.width + padX * 2;
    const th = 20 + padY * 2;
    const bx = CARD_W / 2 - tw / 2;
    const by = CARD_H / 2 - th / 2 + 2;
    ctx.beginPath();
    ctx.roundRect(bx, by, tw, th, 14);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillText(hint, CARD_W / 2, CARD_H / 2 + 7);
  }, [lang]);

  const scratchAt = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = RADIUS * 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (last.current) {
      ctx.beginPath();
      ctx.moveTo(last.current.x, last.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    last.current = { x, y };

    // Spawn scratch particles
    spawnParticles(x, y);
  };

  const measure = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 32) {
      total++;
      if (data[i] < 24) clear++;
    }
    if (total && clear / total >= THRESHOLD) {
      setRevealed(true);
      spawnConfetti();
    }
  };

  useEffect(() => {
    if (revealed) return;
    const id = setInterval(measure, 150);
    return () => clearInterval(id);
  }, [revealed]);

  // Clean up particles after animation
  useEffect(() => {
    if (particles.length === 0) return;
    const timeout = setTimeout(() => {
      setParticles((prev) => prev.slice(3));
    }, 400);
    return () => clearTimeout(timeout);
  }, [particles]);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * CARD_W,
      y: ((e.clientY - rect.top) / rect.height) * CARD_H,
    };
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-background/85 backdrop-blur-md px-4">
      <div
        className="gold-border-ornate relative rounded-2xl bg-card/70 overflow-hidden"
        style={{ width: CARD_W, height: CARD_H }}
      >
        {/* revealed content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-script text-2xl gradient-rose-gold-text"
          >
            {t(lang, "scratch.wedding_of")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col items-center gap-3"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="font-display text-2xl gradient-rose-gold-text"
            >
              {t(lang, "couple.groom_name")} & {t(lang, "couple.bride_name")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="font-display text-xl gradient-rose-gold-text whitespace-pre-line leading-snug"
            >
              {t(lang, "events.date_wedding")}
            </motion.p>
            {revealed && (
              <motion.button
                onClick={onDone}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="mt-4 rounded-full border border-gold/50 px-6 py-2 font-body text-sm tracking-widest uppercase text-gold/90 transition-colors hover:bg-gold/10 animate-pulse"
                style={{
                  animation: "pulse-gold 2s ease-in-out infinite",
                }}
              >
                {t(lang, "scratch.continue")}
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Confetti burst */}
        <AnimatePresence>
          {confetti.map((c) => (
            <motion.div
              key={c.id}
              initial={{
                x: c.x,
                y: c.y,
                rotate: c.rotation,
                scale: c.scale,
                opacity: 1,
              }}
              animate={{
                x: c.x + c.velocity.x * 15,
                y: c.y + c.velocity.y * 15 + 100,
                rotate: c.rotation + 360,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute pointer-events-none"
              style={{
                width: 8,
                height: 8,
                backgroundColor: c.color,
                borderRadius: c.id % 3 === 0 ? "50%" : "2px",
              }}
            />
          ))}
        </AnimatePresence>

        {/* Scratch particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: p.x, y: p.y, scale: 1, opacity: 0.8 }}
              animate={{ y: p.y - 30, scale: 0, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute pointer-events-none rounded-full"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                left: -p.size / 2,
                top: -p.size / 2,
              }}
            />
          ))}
        </AnimatePresence>

        {/* foil with shimmer */}
        {supported ? (
          <>
            {/* Shimmer overlay */}
            {!revealed && (
              <div
                ref={shimmerRef}
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
                style={{ opacity: 0.3 }}
              >
                <div
                  className="absolute w-[200%] h-full"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)",
                    animation: "shimmer 3s ease-in-out infinite",
                  }}
                />
              </div>
            )}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full transition-opacity duration-700"
              style={{
                touchAction: "none",
                opacity: revealed ? 0 : 1,
                pointerEvents: revealed ? "none" : "auto",
                cursor: "grab",
              }}
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                drawing.current = true;
                last.current = null;
                const p = pos(e);
                scratchAt(p.x, p.y);
                vibrate(5); // light tap
              }}
              onPointerMove={(e) => {
                if (!drawing.current) return;
                const p = pos(e);
                scratchAt(p.x, p.y);
              }}
              onPointerUp={() => {
                drawing.current = false;
                last.current = null;
                measure();
              }}
              onPointerLeave={() => {
                drawing.current = false;
                last.current = null;
              }}
            />
          </>
        ) : (
          !revealed && (
            <button
              onClick={() => {
                setRevealed(true);
                spawnConfetti();
              }}
              className="absolute inset-0 flex items-center justify-center bg-primary/80 font-body text-sm uppercase tracking-widest text-foreground"
            >
              {t(lang, "scratch.reveal")}
            </button>
          )
        )}
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(212, 175, 55, 0); }
        }
      `}</style>
    </div>
  );
};

export default ScratchReveal;