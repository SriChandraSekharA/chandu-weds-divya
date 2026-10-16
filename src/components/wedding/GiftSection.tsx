import { motion, useInView, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage, t } from "./LanguageContext";
import amazonLogoAsset from "@/assets/amazon-logo.png.asset.json";
import cauveryCallingLogoAsset from "@/assets/cauvery-calling-logo.png.asset.json";

// const AMAZON_GIFT_URL = "https://www.amazon.in/gift-card-store/b?ie=UTF8&node=3704982031";
// const AMAZON_EMAIL = "asrichandrasekhar@gmail.com";
const CAUVERY_URL =
  "https://consciousplanet.org/en/cauvery-calling/campaigns/cauvery-calling-action-now-sri-chandra-sekhar-addepalli-0";

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

  // DB fetch removed - no database dependency

  useEffect(() => {
    // No-op: DB fetch removed
  }, []);

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

        <div className="grid grid-cols-1 md:grid-cols-[1.12fr_0.88fr] gap-6 md:gap-8 max-w-4xl mx-auto items-stretch">
          {/* Cauvery Calling — preferred gift */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="gold-border-ornate rounded-lg p-6 md:p-8 bg-card/90 backdrop-blur-sm flex flex-col items-center text-center ring-1 ring-gold/40 shadow-lg"
          >
            <span className="mb-3 rounded-full border border-gold/50 bg-gold/10 px-4 py-1 font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold">
              {t(lang, "gift.preferred")}
            </span>
            <img
              src={cauveryCallingLogoAsset.url}
              alt={t(lang, "gift.cauvery_logo_alt")}
              className="h-20 w-20 rounded-full object-contain"
            />
            <h3 className="font-display text-xl md:text-2xl gradient-rose-gold-text mb-3 mt-3">
              {t(lang, "gift.cauvery_title")}
            </h3>
            <p className="font-display text-2xl gradient-rose-gold-text mb-3">
              {t(lang, "gift.cauvery_price")}
            </p>
            <p className="font-body text-base text-muted-foreground italic mb-6">{t(lang, "gift.cauvery_desc")}</p>
            <motion.a
              href={CAUVERY_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-auto inline-block px-6 md:px-8 py-3 border border-gold/70 rounded-full bg-gold/15 font-body text-sm tracking-[0.2em] uppercase text-gold hover:bg-gold/25 transition-colors"
            >
              {t(lang, "gift.cauvery_button")}
            </motion.a>
          </motion.div>

          {/* View donations by others */}
          <div className="mt-4 text-center">
            <motion.a
              href={CAUVERY_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 md:px-8 py-3 border border-gold/70 rounded-full bg-gold/15 font-body text-sm uppercase tracking-[0.2em] text-gold hover:bg-gold/25 transition-colors"
            >
              {t(lang, "gift.view_donations_by_other")}
            </motion.a>
          </div>

          {/* Amazon Gift Card — alternative (commented out) */}
          {/* <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="gold-border-ornate rounded-lg p-6 md:p-8 bg-card/70 backdrop-blur-sm flex flex-col items-center text-center opacity-90"
          >
            <img
              src={amazonLogoAsset.url}
              alt={t(lang, "gift.amazon_logo_alt")}
              className="h-14 w-32 object-contain"
            />
            <h3 className="font-display text-xl md:text-2xl gradient-rose-gold-text mb-3 mt-3">
              {t(lang, "gift.amazon_title")}
            </h3>
            <p className="font-body text-base text-muted-foreground italic mb-4">{t(lang, "gift.amazon_desc")}</p>
            <p className="font-body text-sm text-gold-light mb-6 break-all">
              {t(lang, "gift.amazon_send_to")}: <span className="text-gold">{AMAZON_EMAIL}</span>
            </p>
            <motion.a
              href={AMAZON_GIFT_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-auto inline-block px-6 md:px-8 py-3 border border-gold/50 rounded-full font-body text-sm tracking-[0.2em] uppercase text-gold hover:bg-gold/10 transition-colors"
            >
              {t(lang, "gift.amazon_button")}
            </motion.a>
          </motion.div> */}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8 text-center"
        >
          <Link
            to={lang === "te" ? "/thank-you?lang=te" : "/thank-you"}
            className="font-body text-sm uppercase tracking-[0.2em] text-gold hover:underline"
          >
            {t(lang, "gift.pledge_cta")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GiftSection;
