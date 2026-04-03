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
    "couple.groom_name": { en: "KIRAN Kumar", te: "కిరణ్ కుమార్" },
    "couple.bride_name": { en: "SUJITHA", te: "సుజిత" },
    "couple.son_of": { en: "Elder Son of", te: "పెద్ద కుమారుడు" },
    "couple.daughter_of": { en: "Only Daughter of", te: "ఏకైక కుమార్తె" },
    "couple.groom_father": { en: "Sri. Venkateswara Rao &", te: "శ్రీ వెంకటేశ్వర రావు &" },
    "couple.groom_mother": { en: "Smt. Rama Devi", te: "శ్రీమతి రామ దేవి" },
    "couple.bride_father": { en: "Sri. Chandra Sekhar &", te: "శ్రీ చంద్ర శేఖర్ &" },
    "couple.bride_mother": { en: "Smt. Vijaya Lakshmi", te: "శ్రీమతి విజయ లక్ష్మి" },
    "couple.groom_city": { en: "", te: "" },
    "couple.bride_city": { en: "", te: "" },

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
    "events.muhurtham": { en: "Muhurtham", te: "ముహూర్తం" },
    "events.muhurtham_desc": { en: "The sacred wedding ceremony performed with traditional Vedic rituals", te: "సంప్రదాయ వేద మంత్రాలతో పవిత్ర వివాహ వేడుక" },
    "events.dinner": { en: "Dinner", te: "విందు భోజనం" },
    "events.dinner_desc": { en: "Grand dinner — your blessings and presence will make the occasion truly special", te: "ఘన విందు — మీ ఆశీర్వాదాలు మరియు ఉనికి ఈ సందర్భాన్ని ప్రత్యేకంగా చేస్తాయి" },
    "events.date_wedding": { en: "Wednesday, 29th April 2026", te: "బుధవారం, 29 ఏప్రిల్ 2026" },
    "events.time_muhurtham": { en: "11:13 PM", te: "రాత్రి 11:13" },
    "events.time_dinner": { en: "7:00 PM Onwards", te: "సాయంత్రం 7:00 నుండి" },
    "events.venue_mandapam": { en: "TSIIC MULTIPURPOSE FUNCTION HALL, Hyderabad", te: "TSIIC మల్టీపర్పస్ ఫంక్షన్ హాల్, హైదరాబాద్" },

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
