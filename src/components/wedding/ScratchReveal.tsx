import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLanguage, t } from "./LanguageContext";

const CARD_W = 320;
const CARD_H = 420;
const RADIUS = 28;
const THRESHOLD = 0.55;

const ScratchReveal = ({ onDone }: { onDone: () => void }) => {
  const { lang } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [supported, setSupported] = useState(true);

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

    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = "600 15px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(t(lang, "scratch.hint"), CARD_W / 2, CARD_H / 2);
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
    if (total && clear / total >= THRESHOLD) setRevealed(true);
  };

  useEffect(() => {
    if (revealed) return;
    const id = setInterval(measure, 150);
    return () => clearInterval(id);
  }, [revealed]);

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
          <p className="font-script text-2xl gradient-rose-gold-text">
            {t(lang, "scratch.wedding_of")}
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="font-display text-2xl gradient-rose-gold-text">
              {t(lang, "couple.groom_name")} & {t(lang, "couple.bride_name")}
            </p>
            <p className="font-display text-xl gradient-rose-gold-text whitespace-pre-line leading-snug">
              {t(lang, "events.date_wedding")}
            </p>
            {revealed && (
              <button
                onClick={onDone}
                className="mt-4 rounded-full border border-gold/50 px-6 py-2 font-body text-sm tracking-widest uppercase text-gold/90 transition-colors hover:bg-gold/10"
              >
                {t(lang, "scratch.continue")}
              </button>
            )}
          </motion.div>
        </div>

        {/* foil */}
        {supported ? (
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
        ) : (
          !revealed && (
            <button
              onClick={() => setRevealed(true)}
              className="absolute inset-0 flex items-center justify-center bg-primary/80 font-body text-sm uppercase tracking-widest text-foreground"
            >
              {t(lang, "scratch.reveal")}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ScratchReveal;