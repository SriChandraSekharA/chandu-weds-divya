import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage, t } from "./LanguageContext";

const AMAZON_GIFT_URL = "https://www.amazon.in/gift-card-store/b?ie=UTF8&node=3704982031";
const AMAZON_EMAIL = "asrichandrasekhar@gmail.com";
const CAUVERY_URL =
  "https://consciousplanet.org/en/cauvery-calling/campaigns/cauvery-calling-action-now-sri-chandra-sekhar-addepalli-0";

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-gold" fill="currentColor" aria-hidden="true">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C5 8 17 8 17 8z" />
  </svg>
);

const GiftIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-gold" fill="currentColor" aria-hidden="true">
    <path d="M20 7h-3.17A3 3 0 0 0 20 4a3 3 0 0 0-5.5-1.65A3 3 0 0 0 12 4a3 3 0 0 0-2.5-1.65A3 3 0 0 0 4 4a3 3 0 0 0 3.17 3H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM10 19H6v-6h4zm0-8H5V9h5zm-1-4a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm4 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm6 4h-5V9h5zm-4 8h-4v-6h4z" />
  </svg>
);

const GiftSection = () => {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          {/* Amazon Gift Card */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="gold-border-ornate rounded-lg p-6 md:p-8 bg-card/80 backdrop-blur-sm flex flex-col items-center text-center"
          >
            <GiftIcon />
            <h3 className="font-display text-xl md:text-2xl gradient-rose-gold-text mb-3 mt-3">
              {t(lang, "gift.amazon_title")}
            </h3>
            <p className="font-body text-base text-muted-foreground italic mb-4">{t(lang, "gift.amazon_desc")}</p>
            <p className="font-body text-sm text-gold-light mb-6">
              {t(lang, "gift.amazon_send_to")}: <span className="text-gold">{AMAZON_EMAIL}</span>
            </p>
            <motion.a
              href={AMAZON_GIFT_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 md:px-8 py-3 border border-gold/50 rounded-full font-body text-sm tracking-[0.2em] uppercase text-gold hover:bg-gold/10 transition-colors"
            >
              {t(lang, "gift.amazon_button")}
            </motion.a>
          </motion.div>

          {/* Cauvery Calling */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="gold-border-ornate rounded-lg p-6 md:p-8 bg-card/80 backdrop-blur-sm flex flex-col items-center text-center"
          >
            <LeafIcon />
            <h3 className="font-display text-xl md:text-2xl gradient-rose-gold-text mb-3 mt-3">
              {t(lang, "gift.cauvery_title")}
            </h3>
            <p className="font-body text-base text-muted-foreground italic mb-6">{t(lang, "gift.cauvery_desc")}</p>
            <motion.a
              href={CAUVERY_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 md:px-8 py-3 border border-gold/50 rounded-full font-body text-sm tracking-[0.2em] uppercase text-gold hover:bg-gold/10 transition-colors"
            >
              {t(lang, "gift.cauvery_button")}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
