import { motion, useInView } from "framer-motion";
import { useRef, useCallback } from "react";
import { Calendar } from "lucide-react";
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
      <h3 className="font-display text-xl md:text-2xl gradient-rose-gold-text mb-3">{title}</h3>
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
  ];

  const generateICS = useCallback(() => {
    // Wedding event: November 26, 2026, 9:33 AM IST (UTC+5:30), duration 8 hours
    const startDate = new Date(Date.UTC(2026, 10, 26, 4, 3, 0)); // 9:33 AM IST = 4:03 AM UTC
    const endDate = new Date(Date.UTC(2026, 10, 26, 12, 3, 0)); // 5:33 PM IST = 12:03 PM UTC

    const formatDate = (date: Date) =>
      date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Chandu Weds Divya//Wedding Invitation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `DTSTAMP:${formatDate(new Date())}`,
      `UID:wedding-${Date.now()}@chanduwedsdivya.com`,
      "SUMMARY:Wedding of Sri Chandra Sekhar & Divya Sri",
      "DESCRIPTION:The sacred wedding ceremony of Sri Chandra Sekhar and Divya Sri. Your gracious presence and blessings are requested.",
      "LOCATION:APR Praveen's Higheria Clubhouse\\, Patancheru\\, Hyderabad",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wedding-chandu-divya.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return (
    <section className="relative min-h-[60vh] flex items-center py-12 md:py-24 overflow-hidden">
      <div className="absolute inset-0 parallax-section opacity-15" style={{ backgroundImage: `url(${weddingBg})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          {lang === "en" && <p className="font-script text-2xl gradient-rose-gold-text mb-2">{t(lang, "events.subtitle")}</p>}
          <h2 className="font-display text-3xl md:text-4xl gradient-rose-gold-text mb-4">{t(lang, "events.title")}</h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 max-w-md mx-auto gap-6 md:gap-8">
          {events.map((event, index) => (
            <EventCard key={event.title} {...event} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex justify-center mt-8"
        >
          <button
            onClick={generateICS}
            className="flex items-center gap-2 px-6 py-3 border border-gold/50 rounded-full text-gold-light hover:bg-gold/10 hover:border-gold transition-all duration-300 tracking-widest text-sm uppercase font-body"
          >
            <Calendar className="w-4 h-4" />
            {t(lang, "events.add_calendar")}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
