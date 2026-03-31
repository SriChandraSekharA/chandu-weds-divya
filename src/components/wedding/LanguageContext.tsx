import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "te";

interface LanguageContextType {
  lang: Language;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType>({ lang: "en", toggle: () => {} });

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");
  const toggle = () => setLang((l) => (l === "en" ? "te" : "en"));
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
};

// All translations
export const t = (lang: Language, key: string): string => {
  const translations: Record<string, Record<Language, string>> = {
    // Hero
    "hero.blessing": { en: "Shri Ganeshaya Namaha", te: "శ్రీ గణేశాయ నమః" },
    "hero.divine": { en: "With the blessings of the Almighty", te: "సర్వశక్తిమంతుని ఆశీర్వాదంతో" },
    "hero.title": { en: "Wedding Invitation", te: "వివాహ శుభలేఖ" },
    "hero.scroll": { en: "Scroll Down", te: "క్రిందకు స్క్రోల్ చేయండి" },

    // Couple
    "couple.together": { en: "Together with their families", te: "ఇరు కుటుంబాల సమక్షంలో" },
    "couple.groom": { en: "The Groom", te: "వరుడు" },
    "couple.bride": { en: "The Bride", te: "వధువు" },
    "couple.groom_name": { en: "Rajesh Kumar", te: "రాజేష్ కుమార్" },
    "couple.bride_name": { en: "Priya Sharma", te: "ప్రియ శర్మ" },
    "couple.son_of": { en: "Son of", te: "తండ్రి" },
    "couple.daughter_of": { en: "Daughter of", te: "తండ్రి" },
    "couple.groom_father": { en: "Sri Venkateshwara Rao &", te: "శ్రీ వెంకటేశ్వర రావు &" },
    "couple.groom_mother": { en: "Smt. Lakshmi Devi", te: "శ్రీమతి లక్ష్మి దేవి" },
    "couple.bride_father": { en: "Sri Ramachandra Rao &", te: "శ్రీ రామచంద్ర రావు &" },
    "couple.bride_mother": { en: "Smt. Saraswati Devi", te: "శ్రీమతి సరస్వతి దేవి" },
    "couple.groom_city": { en: "Resident of Hyderabad", te: "హైదరాబాద్ నివాసి" },
    "couple.bride_city": { en: "Resident of Vijayawada", te: "విజయవాడ నివాసి" },

    // Countdown
    "countdown.subtitle": { en: "Counting Down To", te: "శుభ ముహూర్తం వరకు" },
    "countdown.title": { en: "The Big Day", te: "పెళ్ళి రోజు" },
    "countdown.days": { en: "Days", te: "రోజులు" },
    "countdown.hours": { en: "Hours", te: "గంటలు" },
    "countdown.minutes": { en: "Minutes", te: "నిమిషాలు" },
    "countdown.seconds": { en: "Seconds", te: "సెకన్లు" },

    // Events
    "events.subtitle": { en: "Celebrate With Us", te: "మాతో కలిసి జరుపుకోండి" },
    "events.title": { en: "Wedding Events", te: "వివాహ కార్యక్రమాలు" },
    "events.pellikuthuru": { en: "Pellikuthuru", te: "పెళ్ళికూతురు" },
    "events.pellikuthuru_desc": { en: "Traditional pre-wedding ceremony with haldi and mehendi for the bride", te: "వధువుకు పసుపు, మెహందీతో సంప్రదాయ పెళ్ళి ముందు వేడుక" },
    "events.sangeeth": { en: "Sangeeth & Mehendi", te: "సంగీత్ & మెహందీ" },
    "events.sangeeth_desc": { en: "An evening of music, dance, and celebrations with both families", te: "ఇరు కుటుంబాలతో సంగీతం, నృత్యం మరియు వేడుకల సాయంత్రం" },
    "events.wedding": { en: "Wedding Ceremony", te: "వివాహ వేడుక" },
    "events.wedding_desc": { en: "The sacred wedding ceremony performed with traditional Vedic rituals", te: "సంప్రదాయ వేద మంత్రాలతో పవిత్ర వివాహ వేడుక" },
    "events.reception": { en: "Wedding Reception", te: "వివాహ విందు" },
    "events.reception_desc": { en: "Grand reception dinner — your blessings and presence will make the occasion truly special", te: "ఘన విందు — మీ ఆశీర్వాదాలు మరియు ఉనికి ఈ సందర్భాన్ని ప్రత్యేకంగా చేస్తాయి" },
    "events.date1": { en: "Friday, 15th August 2026", te: "శుక్రవారం, 15 ఆగస్టు 2026" },
    "events.date2": { en: "Saturday, 16th August 2026", te: "శనివారం, 16 ఆగస్టు 2026" },
    "events.time_pellikuthuru": { en: "9:00 AM - 12:00 PM", te: "ఉదయం 9:00 - మధ్యాహ్నం 12:00" },
    "events.time_sangeeth": { en: "6:00 PM - 10:00 PM", te: "సాయంత్రం 6:00 - రాత్రి 10:00" },
    "events.time_wedding": { en: "Muhurtam: 7:32 AM - 8:45 AM", te: "ముహూర్తం: ఉదయం 7:32 - 8:45" },
    "events.time_reception": { en: "7:00 PM Onwards", te: "సాయంత్రం 7:00 నుండి" },
    "events.venue_bride": { en: "Bride's Residence, Vijayawada", te: "వధువు నివాసం, విజయవాడ" },
    "events.venue_function": { en: "Sri Venkateswara Function Hall, Vijayawada", te: "శ్రీ వెంకటేశ్వర ఫంక్షన్ హాల్, విజయవాడ" },
    "events.venue_mandapam": { en: "Sri Sai Kalyana Mandapam, Hyderabad", te: "శ్రీ సాయి కళ్యాణ మండపం, హైదరాబాద్" },

    // Venue
    "venue.subtitle": { en: "Find Your Way", te: "మార్గం కనుగొనండి" },
    "venue.title": { en: "Wedding Venue", te: "వివాహ వేదిక" },
    "venue.name": { en: "Sri Sai Kalyana Mandapam", te: "శ్రీ సాయి కళ్యాణ మండపం" },
    "venue.line1": { en: "Road No. 12, Banjara Hills", te: "రోడ్ నంబర్ 12, బంజారా హిల్స్" },
    "venue.line2": { en: "Hyderabad, Telangana 500034", te: "హైదరాబాద్, తెలంగాణ 500034" },
    "venue.landmark": { en: "Near Banjara Hills Check Post, opposite City Central Mall", te: "బంజారా హిల్స్ చెక్ పోస్ట్ సమీపంలో, సిటీ సెంట్రల్ మాల్ ఎదురుగా" },
    "venue.maps": { en: "Open in Google Maps", te: "Google Maps లో చూడండి" },
    "venue.scan": { en: "Scan for Directions", te: "దిశల కోసం స్కాన్ చేయండి" },
    "venue.camera": { en: "Point your camera at the QR code", te: "QR కోడ్ వైపు మీ కెమెరా చూపండి" },

    // Gopuram
    "gopuram.text": { en: "A Sacred Union Blessed by the Divine", te: "దైవ ఆశీర్వాదంతో పవిత్ర బంధం" },

    // Footer
    "footer.invite": { en: "We joyfully invite you to share in our happiness", te: "మా ఆనందంలో పాలుపంచుకోమని మిమ్మల్ని ఆహ్వానిస్తున్నాము" },
    "footer.request": { en: "Your gracious presence and blessings are requested at the wedding ceremony of our beloved children.", te: "మా ప్రియమైన పిల్లల వివాహ వేడుకకు మీ శుభ ఉనికి మరియు ఆశీర్వాదాలు కోరుతున్నాము." },
    "footer.quote": { en: '"Two souls with but a single thought, two hearts that beat as one."', te: '"ఒకే ఆలోచనతో రెండు ఆత్మలు, ఒకటిగా కొట్టుకునే రెండు హృదయాలు."' },
    "footer.with": { en: "With Love & Blessings", te: "ప్రేమ & ఆశీర్వాదాలతో" },
    "footer.families": { en: "Both Families", te: "ఇరు కుటుంబాలు" },
  };

  return translations[key]?.[lang] ?? key;
};
