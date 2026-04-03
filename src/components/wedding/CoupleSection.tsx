import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import dividerImg from "@/assets/floral-divider.png";
import { useLanguage, t } from "./LanguageContext";

const CoupleSection = () => {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] animate-spin-slow">
          <img src={dividerImg} alt="" className="w-full opacity-30" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8 }}
          className="text-center font-script text-2xl md:text-3xl text-gold-light mb-12">
          {t(lang, "couple.together")}
        </motion.p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="text-center flex-1">
            <p className="font-body text-sm tracking-[0.3em] uppercase text-gold/60 mb-2">{t(lang, "couple.groom")}</p>
            <h2 className="font-display text-3xl md:text-4xl gradient-gold-text mb-3">{t(lang, "couple.groom_name")}</h2>
            <p className="font-body text-lg text-gold-light/80 italic">{t(lang, "couple.son_of")}</p>
            <p className="font-body text-lg text-foreground">{t(lang, "couple.groom_father")}</p>
            <p className="font-body text-lg text-foreground">{t(lang, "couple.groom_mother")}</p>
            <p className="font-body text-sm text-muted-foreground mt-2 whitespace-pre-line">{t(lang, "couple.groom_city")}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-gold/30 flex items-center justify-center shadow-gold">
              <span className="font-script text-4xl md:text-5xl text-gold">&</span>
            </div>
            <div className="absolute inset-0 rounded-full border border-gold/10 animate-pulse-glow" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 60 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="text-center flex-1">
            <p className="font-body text-sm tracking-[0.3em] uppercase text-gold/60 mb-2">{t(lang, "couple.bride")}</p>
            <h2 className="font-display text-3xl md:text-4xl gradient-gold-text mb-3">{t(lang, "couple.bride_name")}</h2>
            <p className="font-body text-lg text-gold-light/80 italic">{t(lang, "couple.daughter_of")}</p>
            <p className="font-body text-lg text-foreground">{t(lang, "couple.bride_father")}</p>
            <p className="font-body text-lg text-foreground">{t(lang, "couple.bride_mother")}</p>
            <p className="font-body text-sm text-muted-foreground mt-2 whitespace-pre-line">{t(lang, "couple.bride_city")}</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={isInView ? { opacity: 1, scaleX: 1 } : {}} transition={{ delay: 0.8, duration: 1 }} className="mt-16">
          <img src={dividerImg} alt="Decorative divider" className="w-full max-w-lg mx-auto h-12 object-contain opacity-50" />
        </motion.div>
      </div>
    </section>
  );
};

export default CoupleSection;
