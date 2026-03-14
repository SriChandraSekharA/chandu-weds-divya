import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import dividerImg from "@/assets/floral-divider.png";
import mandalaImg from "@/assets/mandala-top.png";

const FooterSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      {/* Background mandala */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <img src={mandalaImg} alt="" className="w-[500px] h-[500px] animate-spin-slow" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : {}}
          transition={{ duration: 1 }}
        >
          <img src={dividerImg} alt="" className="w-full max-w-sm mx-auto h-10 object-contain mb-10" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-script text-3xl md:text-4xl text-gold-light mb-6"
        >
          We joyfully invite you to share in our happiness
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-body text-lg text-foreground/70 mb-4"
        >
          Your gracious presence and blessings are requested at the wedding ceremony of our beloved children.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="font-body text-base text-muted-foreground italic"
        >
          "Two souls with but a single thought, two hearts that beat as one."
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12"
        >
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4" />
          <p className="font-body text-sm tracking-[0.3em] uppercase text-gold/40">
            With Love & Blessings
          </p>
          <p className="font-body text-sm text-gold/30 mt-2">
            Both Families
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : {}}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-10"
        >
          <img src={dividerImg} alt="" className="w-full max-w-sm mx-auto h-10 object-contain rotate-180" />
        </motion.div>
      </div>
    </section>
  );
};

export default FooterSection;
