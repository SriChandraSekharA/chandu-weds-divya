import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import rangoliImg from "@/assets/rangoli-divider.png";

interface OrnateSectionProps {
  children: ReactNode;
  showTopDivider?: boolean;
  showBottomDivider?: boolean;
  className?: string;
}

const OrnateSection = ({ children, showTopDivider = true, showBottomDivider = false, className = "" }: OrnateSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {showTopDivider && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 0.4, scaleX: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="flex justify-center -mt-6 mb-2"
        >
          <img src={rangoliImg} alt="" className="w-full max-w-md h-10 object-contain" />
        </motion.div>
      )}
      {children}
      {showBottomDivider && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 0.4, scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="flex justify-center mt-2 -mb-6"
        >
          <img src={rangoliImg} alt="" className="w-full max-w-md h-10 object-contain rotate-180" />
        </motion.div>
      )}
    </div>
  );
};

export default OrnateSection;
