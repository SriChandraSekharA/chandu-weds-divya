import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

type Variant = "fade" | "slide" | "flip";

const variants: Record<Variant, { hidden: any; visible: any }> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
  },
  slide: {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
  },
  flip: {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  },
};

interface Props {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const SnapSection = ({ children, variant = "fade", className = "" }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35, once: false });

  return (
    <section
      ref={ref}
      className={`snap-start snap-always min-h-screen w-full relative ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        variants={variants[variant]}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-full h-full min-h-screen"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SnapSection;