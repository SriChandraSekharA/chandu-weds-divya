import { motion } from "framer-motion";
import petalImg from "@/assets/petal.png";

const petals = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 8 + Math.random() * 6,
  size: 16 + Math.random() * 20,
  rotation: Math.random() * 360,
  swayAmount: 30 + Math.random() * 60,
}));

const FloatingPetals = () => (
  <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
    {petals.map((p) => (
      <motion.div
        key={p.id}
        className="absolute -top-10"
        style={{ left: `${p.left}%`, width: p.size, height: p.size }}
        animate={{
          y: ["0vh", "105vh"],
          x: [0, p.swayAmount, -p.swayAmount / 2, p.swayAmount / 3, 0],
          rotate: [p.rotation, p.rotation + 360],
        }}
        transition={{
          duration: p.duration,
          repeat: Infinity,
          delay: p.delay,
          ease: "linear",
        }}
      >
        <img src={petalImg} alt="" className="w-full h-full object-contain opacity-40" />
      </motion.div>
    ))}
  </div>
);

export default FloatingPetals;
