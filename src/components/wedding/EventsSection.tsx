import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import weddingBg from "@/assets/wedding-bg.jpg";
import { useLanguage, t } from "./LanguageContext";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  index: number;
}

const EventCard = ({ title, date, time, venue, description, index }: EventCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="gold-border-ornate rounded-lg p-6 md:p-8 bg-card/80 backdrop-blur-sm">
      <h3 className="font-display text-xl md:text-2xl gradient-gold-text mb-3">{title}</h3>
      <div className="space-y-2 font-body text-base">
        <p className="text-gold-light flex items-center gap-2 text-lg md:text-xl whitespace-pre-line">{date}</p>
        <p className="text-gold-light flex items-center gap-2 text-lg md:text-xl font-semibold"><span className="text-gold/60">🕐</span> {time}</p>
        
        <p className="text-muted-foreground text-sm italic mt-3">{description}</p>
      </div>
    </motion.div>
  );
};

const EventsSection = () => {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const events = [
    { title: t(lang, "events.muhurtham"), date: t(lang, "events.date_wedding"), time: t(lang, "events.time_muhurtham"), venue: t(lang, "events.venue_mandapam"), description: t(lang, "events.muhurtham_desc") },
    { title: t(lang, "events.dinner"), date: t(lang, "events.date_wedding"), time: t(lang, "events.time_dinner"), venue: t(lang, "events.venue_mandapam"), description: t(lang, "events.dinner_desc") },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 parallax-section opacity-15" style={{ backgroundImage: `url(${weddingBg})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="font-script text-2xl text-gold-light mb-2">{t(lang, "events.subtitle")}</p>
          <h2 className="font-display text-3xl md:text-4xl gradient-gold-text mb-4">{t(lang, "events.title")}</h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {events.map((event, index) => (
            <EventCard key={event.title} {...event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
