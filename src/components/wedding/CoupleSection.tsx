import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage, t } from "./LanguageContext";

const CoupleSection = () => {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center py-24 px-4 overflow-hidden">
      {/* Soft layered gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-maroon/30 via-background to-background" />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8 }}
          className="text-center font-script text-2xl md:text-3xl gradient-rose-gold-text mb-12">
          {t(lang, "couple.together")}
        </motion.p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="text-center flex-1">
            <p className="font-body text-sm tracking-[0.3em] uppercase text-gold/60 mb-2">{t(lang, "couple.groom")}</p>
            <h2 className="font-display md:text-4xl gradient-rose-gold-text mb-3 text-2xl">{t(lang, "couple.groom_name")}</h2>
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
            <h2 className="font-display md:text-4xl gradient-rose-gold-text mb-3 text-2xl">{t(lang, "couple.bride_name")}</h2>
            <p className="font-body text-lg text-gold-light/80 italic">{t(lang, "couple.daughter_of")}</p>
            <p className="font-body text-lg text-foreground">{t(lang, "couple.bride_father")}</p>
            <p className="font-body text-lg text-foreground">{t(lang, "couple.bride_mother")}</p>
            <p className="font-body text-sm text-muted-foreground mt-2 whitespace-pre-line">{t(lang, "couple.bride_city")}</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={isInView ? { opacity: 1, scaleX: 1 } : {}} transition={{ delay: 0.8, duration: 1 }} className="mt-16">
          <div className="w-full max-w-lg mx-auto h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default CoupleSection;
