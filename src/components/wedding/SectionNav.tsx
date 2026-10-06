import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

const SECTIONS: Section[] = [
  { id: "hero", label: "Home" },
  { id: "couple", label: "Couple" },
  { id: "gopuram", label: "Temple" },
  { id: "countdown", label: "Countdown" },
  { id: "events", label: "Events" },
  { id: "venue", label: "Venue" },
  { id: "gift", label: "Gift" },
  { id: "footer", label: "Footer" },
];

const SectionNav = () => {
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3, rootMargin: "-10% 0px -10% 0px" }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3"
      aria-label="Section navigation"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <div key={id} className="relative group flex items-center justify-end">
            {/* Tooltip */}
            <span
              className="absolute right-6 px-2 py-1 text-xs font-medium text-wedding-gold bg-background/90 
                         border border-wedding-gold/30 rounded opacity-0 group-hover:opacity-100 
                         transition-opacity duration-200 whitespace-nowrap pointer-events-none"
            >
              {label}
            </span>
            
            {/* Dot button */}
            <motion.button
              onClick={() => scrollToSection(id)}
              className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 
                         ${isActive 
                           ? "bg-wedding-gold border-wedding-gold" 
                           : "bg-transparent border-wedding-gold/40 hover:border-wedding-gold/70"
                         }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Scroll to ${label}`}
              aria-current={isActive ? "true" : undefined}
            />
          </div>
        );
      })}
    </nav>
  );
};

export default SectionNav;
