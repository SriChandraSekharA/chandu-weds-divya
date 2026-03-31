import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import envelopeImg from "@/assets/envelope.jpg";
import mandalaImg from "@/assets/mandala-top.png";

const EnvelopeOpening = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState<"envelope" | "opening" | "done">("envelope");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("opening"), 1800);
    const t2 = setTimeout(() => setStage("done"), 3600);
    const t3 = setTimeout(onComplete, 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          {/* Background particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-gold/40"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{
                y: [0, -60, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Rotating mandala behind */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[500px] h-[500px] opacity-[0.04]"
          >
            <img src={mandalaImg} alt="" className="w-full h-full" />
          </motion.div>

          {/* Envelope */}
          <motion.div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Envelope body */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: 0 }}
              animate={
                stage === "envelope"
                  ? { scale: 1, opacity: 1, rotateY: 0 }
                  : { scale: 1.1, opacity: 0, rotateY: 15, y: -40 }
              }
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl"
              style={{ perspective: 1000 }}
            >
              <img src={envelopeImg} alt="Wedding envelope" className="w-full h-full object-cover" />

              {/* Envelope flap */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={stage === "opening" ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gold-dark/80 to-gold/60 origin-top"
                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
              />

              {/* Gold seal */}
              <motion.div
                initial={{ scale: 1 }}
                animate={stage === "opening" ? { scale: 0, rotate: 360 } : {}}
                transition={{ duration: 0.8 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark shadow-gold flex items-center justify-center"
              >
                <span className="font-script text-2xl text-background">ॐ</span>
              </motion.div>
            </motion.div>

            {/* Text reveal after opening */}
            <AnimatePresence>
              {stage === "opening" && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <p className="font-script text-2xl md:text-3xl text-gold-light mb-2">You are invited</p>
                  <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Tap hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-16 font-body text-sm tracking-[0.2em] uppercase text-gold/50"
          >
            Opening your invitation...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnvelopeOpening;
