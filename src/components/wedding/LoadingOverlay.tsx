import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLanguage, t } from "./LanguageContext";

const LoadingOverlay = ({ onLoaded }: { onLoaded: () => void }) => {
  const { lang } = useLanguage();

  useEffect(() => {
    const id = setTimeout(onLoaded, 1500);
    return () => clearTimeout(id);
  }, [onLoaded]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[105] flex flex-col items-center justify-center gap-6 bg-background"
      aria-label="Loading"
      aria-live="polite"
    >
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-gold/10" />
        <div className="absolute inset-0 rounded-full border-4 border-t-gold border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-gold/80 animate-pulse" />
        </div>
      </div>
      <p className="font-script text-2xl gradient-rose-gold-text animate-pulse">
        {t(lang, "loading.text")}
      </p>
    </motion.div>
  );
};

export default LoadingOverlay;
