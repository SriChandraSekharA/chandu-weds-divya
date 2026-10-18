import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useLanguage, t } from "./LanguageContext";

const LanguageToggle = () => {
  const { lang, toggle } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed top-5 right-5 z-50 flex items-center gap-2"
    >
      {/* <Link
        to={`/thank-you${lang === "te" ? "?lang=te" : ""}`}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-gold/40 bg-card/80 backdrop-blur-md font-body text-sm tracking-wider text-gold hover:bg-gold/10 transition-colors"
        title={t(lang, "thanks.nav_button")}
      >
        <Heart className="w-4 h-4" />
        <span className="hidden sm:inline">{t(lang, "thanks.nav_button")}</span>
      </Link> */}
      <button
        onClick={toggle}
        className="px-4 py-2 rounded-full border border-gold/40 bg-card/80 backdrop-blur-md font-body text-sm tracking-wider text-gold hover:bg-gold/10 transition-colors cursor-pointer"
      >
        {lang === "en" ? "తెలుగు" : "English"}
      </button>
    </motion.div>
  );
};

export default LanguageToggle;
