import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LanguageProvider, useLanguage, t } from "@/components/wedding/LanguageContext";
import LanguageToggle from "@/components/wedding/LanguageToggle";
import AmbientParticles from "@/components/wedding/AmbientParticles";
import GiftPledgeForm from "@/components/wedding/GiftPledgeForm";
import BlessingsWall from "@/components/wedding/BlessingsWall";

const ThankYouContent = () => {
  const { lang } = useLanguage();
  const [refreshKey, setRefreshKey] = useState(0);
  const backTo = lang === "te" ? "/?lang=te" : "/";

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <LanguageToggle />
      <AmbientParticles />
      <main className="relative z-10 mx-auto w-full max-w-2xl px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <p className="font-script text-2xl gradient-rose-gold-text mb-2">{t(lang, "thanks.subtitle")}</p>
          <h1 className="font-display text-3xl md:text-4xl gradient-rose-gold-text mb-4">
            {t(lang, "thanks.title")}
          </h1>
          <div className="mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="mt-6 font-body text-base italic text-muted-foreground">{t(lang, "thanks.intro")}</p>
        </motion.div>

        <GiftPledgeForm onSaved={() => setRefreshKey((k) => k + 1)} />
        {/* <BlessingsWall refreshKey={refreshKey} /> */}

        <div className="mt-12 text-center">
          <Link
            to={backTo}
            className="font-body text-sm uppercase tracking-[0.2em] text-gold hover:underline"
          >
            {t(lang, "thanks.back")}
          </Link>
        </div>
      </main>
    </div>
  );
};

const ThankYou = () => (
  <LanguageProvider>
    <ThankYouContent />
  </LanguageProvider>
);

export default ThankYou;
