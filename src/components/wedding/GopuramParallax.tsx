import { motion, useScroll, useTransform } from "framer-motion";
import gopuramPanorama from "@/assets/gopuram-panorama.jpg";

const GopuramParallax = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section className="relative h-[300px] md:h-[400px] overflow-hidden">
      {/* Parallax panorama */}
      <motion.div
        style={{ x }}
        className="absolute inset-0 w-[120%]"
      >
        <img
          src={gopuramPanorama}
          alt="Temple gopuram panorama"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-background/40" />

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-script text-3xl md:text-5xl text-gold-light text-center px-4 drop-shadow-lg"
        >
          A Sacred Union Blessed by the Divine
        </motion.p>
      </div>
    </section>
  );
};

export default GopuramParallax;
