import { motion, useInView, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage, t } from "./LanguageContext";

// Animated counter component using framer-motion
const AnimatedCounter = ({ value, isInView }: { value: number; isInView: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [value, isInView]);

  return <span ref={nodeRef}>{displayValue.toLocaleString()}</span>;
};

const GiftSection = () => {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // DB fetch removed - no database dependency; banner hidden while totalTrees is 0
  const totalTrees = 0;
  const isLoading = false;

  return (
    <section ref={ref} className="relative min-h-[60vh] flex items-center py-12 md:py-24 px-4 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="font-script text-2xl gradient-rose-gold-text mb-2">{t(lang, "gift.subtitle")}</p>
          <h2 className="font-display text-3xl md:text-4xl gradient-rose-gold-text mb-4">{t(lang, "gift.title")}</h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </motion.div>

        {/* Animated Tree Counter Banner */}
        {(totalTrees > 0 || !isLoading) && totalTrees > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 md:mb-10"
          >
            <div className="max-w-md mx-auto text-center py-4 px-6 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl">🌳</span>
                <div className="flex flex-col items-start">
                  <span className="font-display text-2xl md:text-3xl text-gold">
                    <AnimatedCounter value={totalTrees} isInView={isInView} />
                  </span>
                  <span className="font-body text-xs uppercase tracking-[0.15em] text-gold-light">
                    {t(lang, "gift.trees_planted")}
                  </span>
                </div>
                <span className="text-2xl">🌳</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Cauvery Calling / Amazon gift cards and donation links intentionally
            commented out (EN + TE) — recoverable from git history (19683fe). */}
      </div>
    </section>
  );
};

export default GiftSection;
