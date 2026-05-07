import { motion, useScroll, useTransform } from "framer-motion";
import gopuramPanorama from "@/assets/gopuram-panorama.jpg";
import { useLanguage, t } from "./LanguageContext";

const GopuramParallax = () => {
  const { lang } = useLanguage();
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ x }} className="absolute inset-0 w-[120%]">
        <img src={gopuramPanorama} alt="Temple gopuram panorama" className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-background/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="font-script text-3xl md:text-5xl text-gold-light text-center px-4 drop-shadow-lg">
          {t(lang, "gopuram.text")}
        </motion.p>
      </div>
    </section>
  );
};

export default GopuramParallax;
