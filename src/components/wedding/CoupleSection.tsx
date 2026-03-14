import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import dividerImg from "@/assets/floral-divider.png";

const CoupleSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      {/* Background ornament */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] animate-spin-slow">
          <img src={dividerImg} alt="" className="w-full opacity-30" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center font-script text-2xl md:text-3xl text-gold-light mb-12"
        >
          Together with their families
        </motion.p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center flex-1"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-gold/60 mb-2">The Groom</p>
            <h2 className="font-display text-3xl md:text-4xl gradient-gold-text mb-3">
              Rajesh Kumar
            </h2>
            <p className="font-body text-lg text-gold-light/80 italic">
              Son of
            </p>
            <p className="font-body text-lg text-foreground">
              Sri Venkateshwara Rao &
            </p>
            <p className="font-body text-lg text-foreground">
              Smt. Lakshmi Devi
            </p>
            <p className="font-body text-sm text-muted-foreground mt-2">
              Resident of Hyderabad
            </p>
          </motion.div>

          {/* Ampersand */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-gold/30 flex items-center justify-center shadow-gold">
              <span className="font-script text-4xl md:text-5xl text-gold">&</span>
            </div>
            <div className="absolute inset-0 rounded-full border border-gold/10 animate-pulse-glow" />
          </motion.div>

          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center flex-1"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-gold/60 mb-2">The Bride</p>
            <h2 className="font-display text-3xl md:text-4xl gradient-gold-text mb-3">
              Priya Sharma
            </h2>
            <p className="font-body text-lg text-gold-light/80 italic">
              Daughter of
            </p>
            <p className="font-body text-lg text-foreground">
              Sri Ramachandra Rao &
            </p>
            <p className="font-body text-lg text-foreground">
              Smt. Saraswati Devi
            </p>
            <p className="font-body text-sm text-muted-foreground mt-2">
              Resident of Vijayawada
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16"
        >
          <img src={dividerImg} alt="Decorative divider" className="w-full max-w-lg mx-auto h-12 object-contain opacity-50" />
        </motion.div>
      </div>
    </section>
  );
};

export default CoupleSection;
