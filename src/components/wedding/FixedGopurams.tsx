import { motion, useScroll, useTransform } from "framer-motion";
import gopuramImg from "@/assets/gopuram-left.png";

const FixedGopurams = () => {
  const { scrollYProgress } = useScroll();
  const leftY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <>
      {/* Left gopuram - fixed */}
      <motion.div
        style={{ y: leftY }}
        className="fixed left-0 bottom-0 z-[1] pointer-events-none hidden lg:block"
      >
        <img
          src={gopuramImg}
          alt="Temple gopuram"
          className="w-28 xl:w-36 opacity-[0.12] object-contain"
        />
      </motion.div>

      {/* Right gopuram - fixed, mirrored */}
      <motion.div
        style={{ y: rightY }}
        className="fixed right-0 bottom-0 z-[1] pointer-events-none hidden lg:block"
      >
        <img
          src={gopuramImg}
          alt="Temple gopuram"
          className="w-28 xl:w-36 opacity-[0.12] object-contain -scale-x-100"
        />
      </motion.div>
    </>
  );
};

export default FixedGopurams;
