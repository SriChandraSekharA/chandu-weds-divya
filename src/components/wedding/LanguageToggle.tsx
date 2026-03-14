import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

const LanguageToggle = () => {
  const { lang, toggle } = useLanguage();

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      onClick={toggle}
      className="fixed top-5 right-5 z-50 px-4 py-2 rounded-full border border-gold/40 bg-card/80 backdrop-blur-md font-body text-sm tracking-wider text-gold hover:bg-gold/10 transition-colors cursor-pointer"
    >
      {lang === "en" ? "తెలుగు" : "English"}
    </motion.button>
  );
};

export default LanguageToggle;
