import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useLanguage, t } from "./LanguageContext";

const VenueSection = () => {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const googleMapsUrl = "https://maps.app.goo.gl/vArPKEkZTM3B9gpe6";

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      <motion.div style={{ y }} className="absolute top-0 right-0 w-64 h-64 opacity-5">
        <div className="w-full h-full rounded-full border-2 border-gold animate-spin-slow" />
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="font-script text-2xl text-gold-light mb-2">{t(lang, "venue.subtitle")}</p>
          <h2 className="font-display text-3xl md:text-4xl gradient-gold-text mb-4">{t(lang, "venue.title")}</h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="flex-1 text-center md:text-left">
            <h3 className="font-display text-2xl text-gold mb-4">{t(lang, "venue.name")}</h3>
            <div className="font-body text-lg space-y-2 text-foreground/80">
              <p>{t(lang, "venue.line1")}</p>
              <p>{t(lang, "venue.line2")}</p>
              <p className="text-muted-foreground text-base mt-4 whitespace-pre-line">{t(lang, "venue.landmark")}</p>
            </div>
            <motion.a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="inline-block mt-6 px-8 py-3 border border-gold/50 rounded-full font-body text-sm tracking-[0.2em] uppercase text-gold hover:bg-gold/10 transition-colors">
              {t(lang, "venue.maps")}
            </motion.a>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.4 }}
            className="gold-border-ornate rounded-xl p-6 bg-card/60 backdrop-blur-sm text-center">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-gold/60 mb-4">{t(lang, "venue.scan")}</p>
            <div className="bg-cream p-4 rounded-lg inline-block">
              <QRCodeSVG value={googleMapsUrl} size={180} bgColor="hsl(40, 50%, 92%)" fgColor="hsl(30, 20%, 15%)" level="M" />
            </div>
            <p className="font-body text-xs text-muted-foreground mt-3">{t(lang, "venue.camera")}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VenueSection;
