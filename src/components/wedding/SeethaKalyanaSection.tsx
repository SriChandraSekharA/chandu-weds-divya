import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import seethaAsset from "@/assets/seetha-kalyana.jpg.asset.json";
import { useLanguage, t } from "./LanguageContext";

const SeethaKalyanaSection = () => {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-maroon/20 to-background" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 w-full text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-body text-sm tracking-[0.3em] uppercase gradient-rose-gold-text mb-3"
        >
          {t(lang, "seetha.subtitle")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-display text-3xl md:text-5xl gradient-rose-gold-text mb-8"
        >
          {t(lang, "seetha.title")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mx-auto rounded-2xl overflow-hidden shadow-gold border border-gold/30 max-w-3xl"
        >
          <img
            src={seethaAsset.url}
            alt="Seetha Kalyana Vaibhogame"
            loading="lazy"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-gold/20 rounded-2xl" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="font-script text-2xl md:text-3xl gradient-rose-gold-text mt-8"
        >
          {t(lang, "seetha.mantra")}
        </motion.p>
      </div>
    </section>
  );
};

export default SeethaKalyanaSection;