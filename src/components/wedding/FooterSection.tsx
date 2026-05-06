import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import dividerImg from "@/assets/floral-divider.png";
import mandalaImg from "@/assets/mandala-top.png";
import { useLanguage, t } from "./LanguageContext";

const FooterSection = () => {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <img
          src={mandalaImg}
          alt=""
          className="w-[500px] h-[500px] max-w-[90vw] max-h-[90vw] animate-spin-slow rounded-full object-cover"
          style={{
            WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 72%)",
            maskImage: "radial-gradient(circle, black 55%, transparent 72%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.5 } : {}} transition={{ duration: 1 }}>
          <img src={dividerImg} alt="" className="w-full max-w-sm mx-auto h-10 object-contain mb-10" />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.8 }}
          className="font-script text-3xl md:text-4xl text-gold-light mb-6">
          {t(lang, "footer.invite")}
        </motion.p>

        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6, duration: 0.8 }}
          className="font-body text-lg text-foreground/70 mb-4">
          {t(lang, "footer.request")}
        </motion.p>

        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.8, duration: 0.8 }}
          className="font-body text-base text-muted-foreground italic">
          {t(lang, "footer.quote")}
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1, duration: 1 }} className="mt-12">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4" />
          <p className="font-body text-sm tracking-[0.3em] uppercase text-gold/40">{t(lang, "footer.with")}</p>
          <p className="font-body text-sm text-gold/30 mt-2">{t(lang, "footer.families")}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.5 } : {}} transition={{ delay: 1.2, duration: 1 }} className="mt-10">
          <img src={dividerImg} alt="" className="w-full max-w-sm mx-auto h-10 object-contain rotate-180" />
        </motion.div>
      </div>
    </section>
  );
};

export default FooterSection;
