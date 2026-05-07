import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage, t } from "./LanguageContext";

const CountdownSection = () => {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const weddingDate = new Date("2026-04-29T23:13:00");

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = weddingDate.getTime() - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: t(lang, "countdown.days"), value: timeLeft.days },
    { label: t(lang, "countdown.hours"), value: timeLeft.hours },
    { label: t(lang, "countdown.minutes"), value: timeLeft.minutes },
    { label: t(lang, "countdown.seconds"), value: timeLeft.seconds },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-maroon/20 via-maroon/10 to-transparent" />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="font-script text-2xl text-gold-light mb-2">
          {t(lang, "countdown.subtitle")}
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          className="font-display text-3xl md:text-4xl gradient-gold-text mb-12">
          {t(lang, "countdown.title")}
        </motion.h2>

        <div className="flex justify-center gap-3 md:gap-8">
          {units.map((unit, i) => (
            <motion.div key={unit.label} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              className="gold-border-ornate rounded-lg p-3 md:p-6 min-w-[68px] md:min-w-[100px] bg-card/50 backdrop-blur-sm flex flex-col items-center justify-center text-center">
              <motion.span key={unit.value} initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="block font-display text-2xl md:text-4xl gradient-gold-text leading-none text-center w-full tabular-nums">
                {String(unit.value).padStart(2, "0")}
              </motion.span>
              <span className="font-body text-[10px] md:text-sm tracking-[0.15em] md:tracking-[0.2em] uppercase text-gold/60 mt-2 block text-center w-full">{unit.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
