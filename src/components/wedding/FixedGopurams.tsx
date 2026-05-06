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
        style={{
          y: leftY,
          WebkitMaskImage:
            "linear-gradient(to top, transparent 0%, black 30%, black 70%, transparent 100%), linear-gradient(to right, black 40%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
        className="fixed left-0 bottom-0 z-[1] pointer-events-none hidden lg:block mix-blend-screen"
      >
        <img
          src={gopuramImg}
          alt="Temple gopuram"
          className="w-28 xl:w-36 opacity-20 object-contain"
        />
      </motion.div>

      {/* Right gopuram - fixed, mirrored */}
      <motion.div
        style={{
          y: rightY,
          WebkitMaskImage:
            "linear-gradient(to top, transparent 0%, black 30%, black 70%, transparent 100%), linear-gradient(to left, black 40%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
        className="fixed right-0 bottom-0 z-[1] pointer-events-none hidden lg:block mix-blend-screen"
      >
        <img
          src={gopuramImg}
          alt="Temple gopuram"
          className="w-28 xl:w-36 opacity-20 object-contain -scale-x-100"
        />
      </motion.div>
    </>
  );
};

export default FixedGopurams;
