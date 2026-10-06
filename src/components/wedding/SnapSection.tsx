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
    hidden: { opacity: 0, rotateX: -75, transformPerspective: 1200 },
    visible: {
      opacity: 1,
      rotateX: 0,
      transformPerspective: 1200,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  },
};

interface Props {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  id?: string;
}

const SnapSection = ({ children, variant = "fade", className = "", id }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });

  return (
    <section
      ref={ref}
      id={id}
      className={`w-full relative overflow-hidden ${className}`}
    >
      <motion.div
        variants={variants[variant]}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-full"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SnapSection;