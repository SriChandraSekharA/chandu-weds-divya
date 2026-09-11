import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "te";

interface LanguageContextType {
  lang: Language;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType>({ lang: "en", toggle: () => {} });

export const useLanguage = () => useContext(LanguageContext);

const getInitialLang = (): Language => {
  if (typeof window === "undefined") return "en";
  const param = new URLSearchParams(window.location.search).get("lang");
  return param === "te" ? "te" : "en";
};

const setUrlLang = (lang: Language) => {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (lang === "te") url.searchParams.set("lang", "te");
  else url.searchParams.delete("lang");
  window.history.replaceState({}, "", url.toString());
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>(getInitialLang);
  const toggle = () =>
    setLang((l) => {
      const next = l === "en" ? "te" : "en";
      setUrlLang(next);
      return next;
    });
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
    "couple.groom_name": { en: "Sri Chandra sekhar", te: "శ్రీ చంద్ర శేఖర్" },
    "couple.bride_name": { en: "Divya Sri", te: "దివ్య శ్రీ" },
    "couple.son_of": { en: "Younger Son of", te: "పెద్ద కుమారుడు" },
    "couple.daughter_of": { en: "Only Daughter of", te: "ఏకైక కుమార్తె" },
    "couple.groom_father": { en: "Sri. Venkata Ramana Murthy &", te: "శ్రీ వెంకటేశ్వర రావు &" },
    "couple.groom_mother": { en: "Smt. Shashi Kala", te: "శ్రీమతి రామ దేవి" },
    "couple.bride_father": { en: "Sri. Karunakar &", te: "శ్రీ చంద్ర శేఖర్ &" },
    "couple.bride_mother": { en: "Smt. Anantha Lakshmi", te: "శ్రీమతి విజయ లక్ష్మి" },
    "couple.groom_city": { en: "\n", te: "\n" },
    "couple.bride_city": { en: "\n", te: "\n" },

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
    "events.date_wedding": { en: "📅\nThursday, 26th November 2026", te: "📅\nగురువారం, 26 నవంబర్ 2026" },
    "events.time_muhurtham": { en: "9:33 AM", te: "ఉదయం 9:33" },
    "events.time_dinner": { en: "7:00 PM Onwards", te: "సాయంత్రం 7:00 నుండి" },
    "events.venue_mandapam": { en: "\nAPR Praveen's Higheria Clubhouse, Patancheru, Hyderabad", te: "\nAPR ప్రవీణ్'స్ హైగేరియా క్లబ్‌హౌస్, పటాన్‌చెరు, హైదరాబాద్" },

    // Venue
    "venue.subtitle": { en: "Find Your Way", te: "మార్గం కనుగొనండి" },
    "venue.title": { en: "Wedding Venue", te: "వివాహ వేదిక" },
    "venue.name": { en: "Clubhouse", te: "క్లబ్‌హౌస్" },
    "venue.line1": { en: "APR Praveen's Higheria, Patancheru", te: "APR ప్రవీణ్'స్ హైగేరియా, పటాన్‌చెరు" },
    "venue.line2": { en: "Hyderabad, Telangana", te: "హైదరాబాద్, తెలంగాణ" },
    "venue.landmark": { en: "\n", te: "\n" },
    "venue.maps": { en: "Open in Google Maps", te: "Google Maps లో చూడండి" },
    "venue.scan": { en: "Scan for Directions", te: "దిశల కోసం స్కాన్ చేయండి" },
    "venue.camera": { en: "Point your camera at the QR code", te: "QR కోడ్ వైపు మీ కెమెరా చూపండి" },

    // Gopuram
    "loading.text": { en: "Loading...", te: "లోడ్ అవుతోంది..." },
    "scratch.hint": { en: "Scratch to reveal", te: "గీసి చూడండి" },
    "scratch.wedding_of": { en: "Wedding of", te: "వివాహం" },
    "scratch.savedate": { en: "Save the Date", te: "తేదీని గుర్తుంచుకోండి" },
    "scratch.continue": { en: "Continue", te: "కొనసాగించు" },
    "scratch.reveal": { en: "Tap to reveal", te: "చూడటానికి నొక్కండి" },


    "gopuram.text": { en: "A Sacred Union Blessed by the Divine", te: "దైవ ఆశీర్వాదంతో పవిత్ర బంధం" },

    // Gifts
    "gift.subtitle": { en: "A Gesture of Love", te: "ప్రేమ కుశలం" },
    "gift.title": { en: "Gift & Blessings", te: "బహుమానాలు & ఆశీర్వాదాలు" },
    "gift.amazon_title": { en: "Amazon Gift Card", te: "అమెజాన్ గిఫ్ట్ కార్డ్" },
    "gift.amazon_desc": { en: "Bless the couple with an Amazon e-gift card sent to their email.", te: "జంట దండికి అమెజాన్ ఇ-గిఫ్ట్ కార్డ్ పంపి ఆశీర్వదించండి." },
    "gift.amazon_button": { en: "Send Gift Card", te: "గిఫ్ట్ కార్డ్ పంపండి" },
    "gift.amazon_send_to": { en: "Send to", te: "పంపండి" },
    "gift.cauvery_title": { en: "Cauvery Calling", te: "కావేరి కాలింగ్" },
    "gift.cauvery_desc": { en: "Plant trees as a living gift through Sri Chandra Sekhar's Cauvery Calling campaign.", te: "శ్రీ చంద్ర శేఖర్ కావేరి కాలింగ్ క్యాంపెయిన్ ద్వారా చెట్లు నాటండి." },
    "gift.cauvery_button": { en: "Plant a Tree", te: "చెట్లు నాటండి" },

    // Footer
    "footer.invite": { en: "We joyfully invite you to share in our happiness", te: "మా ఆనందంలో పాలుపంచుకోమని మిమ్మల్ని ఆహ్వానిస్తున్నాము" },
    "footer.request": { en: "Your gracious presence and blessings are requested at the wedding ceremony.", te: "వివాహ వేడుకకు మీ శుభ ఉనికి మరియు ఆశీర్వాదాలు కోరుతున్నాము." },
    "footer.quote": { en: '"Two souls with but a single thought, two hearts that beat as one."', te: '"ఒకే ఆలోచనతో రెండు ఆత్మలు, ఒకటిగా కొట్టుకునే రెండు హృదయాలు."' },
    "footer.with": { en: "With Love & Blessings", te: "ప్రేమ & ఆశీర్వాదాలతో" },
    "footer.families": { en: "Both Families", te: "ఇరు కుటుంబాలు" },
  };

  return translations[key]?.[lang] ?? key;
};
