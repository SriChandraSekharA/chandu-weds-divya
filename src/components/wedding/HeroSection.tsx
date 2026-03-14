import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import mandalaImg from "@/assets/mandala-top.png";
import ganeshImg from "@/assets/ganesh.png";
import { useLanguage, t } from "./LanguageContext";

const HeroSection = () => {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const mandalaRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0 bg-gradient-to-b from-background via-maroon/20 to-background" />
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/30"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      <motion.div style={{ opacity }} className="relative z-10 text-center px-4">
        <motion.div style={{ rotate: mandalaRotate }} className="mx-auto mb-6 w-32 h-32 md:w-44 md:h-44 opacity-40">
          <img src={mandalaImg} alt="Mandala decoration" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="mx-auto mb-4 w-24 h-24 md:w-32 md:h-32">
          <img src={ganeshImg} alt="Lord Ganesh" className="w-full h-full object-contain" />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          className="font-body text-lg md:text-xl text-gold-light tracking-[0.3em] uppercase mb-2">
          {t(lang, "hero.blessing")}
        </motion.p>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 1 }}
          className="w-40 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}
          className="font-script text-2xl md:text-3xl text-gold-light mb-4">
          {t(lang, "hero.divine")}
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl gradient-gold-text mb-4 leading-tight">
          {t(lang, "hero.title")}
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="mt-8">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
            className="text-gold/60 text-sm tracking-[0.2em] uppercase font-body">
            {t(lang, "hero.scroll")}
            <div className="mt-2 mx-auto w-[1px] h-8 bg-gradient-to-b from-gold/60 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
