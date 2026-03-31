import { motion } from "framer-motion";
import diyaImg from "@/assets/diya.png";

const diyas = [
  { position: "left-4 bottom-1/4", size: "w-14 md:w-20" },
  { position: "right-4 bottom-1/3", size: "w-12 md:w-16" },
  { position: "left-8 bottom-2/3", size: "w-10 md:w-14" },
  { position: "right-8 bottom-[15%]", size: "w-10 md:w-14" },
];

const AnimatedDiyas = () => (
  <div className="fixed inset-0 z-[1] pointer-events-none hidden lg:block">
    {diyas.map((d, i) => (
      <motion.div
        key={i}
        className={`absolute ${d.position}`}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
      >
        <div className="relative">
          <img src={diyaImg} alt="" className={`${d.size} object-contain opacity-20`} />
          {/* Flame glow */}
          <motion.div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold/30 blur-md"
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        </div>
      </motion.div>
    ))}
  </div>
);

export default AnimatedDiyas;
