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
    "couple.son_of": { en: "Youngest Son of", te: "చిన్న కుమారుడు" },
    "couple.daughter_of": { en: "Youngest Daughter of", te: "చిన్న కుమార్తె" },
    "couple.groom_father": { en: "Sri. Venkata Ramana Murthy &", te: "శ్రీ వెంకటరమణమూర్తి &" },
    "couple.groom_mother": { en: "Smt. Shashi Kala", te: "శ్రీమతి శశికళ" },
    "couple.bride_father": { en: "Sri. Karunakar &", te: "శ్రీకరుణాకర్ &" },
    "couple.bride_mother": { en: "Smt. Anantha Lakshmi", te: "శ్రీమతి అనంతలక్ష్మి" },
    "couple.groom_city": { en: "\n", te: "\n" },
    "couple.bride_city": { en: "\n", te: "\n" },

    // Countdown
    "countdown.subtitle": { en: "Counting Down To", te: "Counting Down To" },
    "countdown.title": { en: "The Big Day", te: "The Big Day" },
    "countdown.days": { en: "Days", te: "రోజులు" },
    "countdown.hours": { en: "Hours", te: "గంటలు" },
    "countdown.minutes": { en: "Minutes", te: "నిమిషాలు" },
    "countdown.seconds": { en: "Seconds", te: "సెకన్లు" },

    // Events
    "events.subtitle": { en: "Join us at the wedding and bless us", te: "వివాహానికి విచ్చేసి మమ్మల్ని ఆశీర్వదించగలరు" },
    "events.title": { en: "Wedding Events", te: "వివాహ కార్యక్రమాలు" },
    "events.muhurtham": { en: "Muhurtham", te: "sumuhurtham" },
    "events.muhurtham_desc": { en: "The sacred wedding ceremony performed with traditional Vedic rituals", te: "సంప్రదాయ వేద మంత్రాలతో పవిత్ర వివాహ వేడుక" },
    "events.dinner": { en: "Dinner", te: "విందు భోజనం" },
    "events.dinner_desc": { en: "Grand dinner — your blessings and presence will make the occasion truly special", te: "ఘన విందు — మీ ఆశీర్వాదాలు మరియు ఉనికి ఈ సందర్భాన్ని ప్రత్యేకంగా చేస్తాయి" },
    "events.date_wedding": { en: "📅\nThursday, 26th November 2026", te: "📅\nగురువారం, 26 నవంబర్ 2026" },
    "events.time_muhurtham": { en: "9:33 AM", te: "ఉదయం 9:33" },
    "events.time_dinner": { en: "7:00 PM Onwards", te: "సాయంత్రం 7:00 నుండి" },
    "events.venue_mandapam": { en: "\nAPR Praveen's Higheria Clubhouse, Patancheru, Hyderabad", te: "\nAPR ప్రవీణ్'స్ హైగేరియా క్లబ్‌హౌస్, పటాన్‌చెరు, హైదరాబాద్" },
    "events.add_calendar": { en: "Add to Calendar", te: "క్యాలెండర్‌కు జోడించండి" },

    // Venue
    "venue.subtitle": { en: "Find Your Way", te: "మీ బాట పట్టండి" },
    "venue.title": { en: "Wedding Venue", te: "శుభ మండపం" },
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
    "gift.subtitle": { en: "A Gesture of Love", te: "ప్రేమ చిహ్నం" },
    "gift.title": { en: "Gift & Blessings", te: "బహుమానాలు & ఆశీర్వాదాలు" },
    "gift.amazon_title": { en: "Amazon Gift Card", te: "అమెజాన్ గిఫ్ట్ కార్డ్" },
    "gift.amazon_desc": { en: "Bless the couple with an Amazon e-gift card sent to their email.", te: "జంటకు అమెజాన్ ఇ-గిఫ్ట్ కార్డ్‌ను వారి ఈమెయిల్‌కు పంపి ఆశీర్వదించండి." },
    "gift.amazon_button": { en: "Send Gift Card", te: "గిఫ్ట్ కార్డ్ పంపండి" },
    "gift.amazon_send_to": { en: "Send to", te: "పంపండి" },
    "gift.amazon_logo_alt": { en: "Amazon logo", te: "అమెజాన్ లోగో" },
    "gift.preferred": { en: "Our Preferred Gift", te: "మా ప్రాధాన్య బహుమతి" },
    "gift.cauvery_title": { en: "Cauvery Calling", te: "కావేరి కాలింగ్" },
    "gift.cauvery_price": { en: "Just ₹42 per tree", te: "ఒక్కో చెట్టుకు కేవలం ₹42" },
    "gift.cauvery_desc": { en: "We would be especially grateful if you choose this living wedding gift and plant trees through Sri Chandra Sekhar's Cauvery Calling campaign.", te: "శ్రీ చంద్ర శేఖర్ కావేరి కాలింగ్ కార్యక్రమం ద్వారా చెట్లు నాటి, ఈ సజీవ వివాహ బహుమతిని ఎంచుకుంటే మేము ఎంతో ఆనందిస్తాము." },
    "gift.cauvery_button": { en: "Plant a Tree", te: "చెట్లు నాటండి" },
    "gift.cauvery_logo_alt": { en: "Cauvery Calling logo", te: "కావేరి కాలింగ్ లోగో" },
    "gift.view_donations_by_other": { en: "View All Donations", te: "అన్ని విరాళాలు చూడండి" },
    "gift.pledge_cta": { en: "I've sent my gift", te: "నా బహుమతి పంపాను" },
    "gift.trees_planted": { en: "Trees Planted Together", te: "కలిసి నాటిన చెట్లు" },
    "gift.trees_count": { en: "trees", te: "చెట్లు" },

    // Thank you page
    "thanks.subtitle": { en: "With Heartfelt Gratitude", te: "హృదయపూర్వక కృతజ్ఞతలతో" },
    "thanks.title": { en: "Thank You", te: "ధన్యవాదాలు" },
    "thanks.intro": { en: "Tell us who you are and the gift you chose, so we can thank you properly.", te: "మీరు ఎవరో మరియు ఎంచుకున్న బహుమతిని తెలియజేయండి, మిమ్మల్ని హృదయపూర్వకంగా అభినందిస్తాము." },
    "thanks.name": { en: "Your Name", te: "మీ పేరు" },
    "thanks.name_placeholder": { en: "e.g. Ravi & Family", te: "ఉదా: రవి & కుటుంబం" },
    "thanks.gift": { en: "Gift You Chose", te: "మీరు ఎంచుకున్న బహుమతి" },
    "thanks.gift_cauvery": { en: "Trees — Cauvery Calling", te: "చెట్లు — కావేరి కాలింగ్" },
    "thanks.gift_amazon": { en: "Amazon Gift Card", te: "అమెజాన్ గిఫ్ట్ కార్డ్" },
    "thanks.trees": { en: "Number of Trees", te: "చెట్ల సంఖ్య" },
    "thanks.message": { en: "Your Blessings (optional)", te: "మీ ఆశీర్వాదాలు (ఐచ్ఛికం)" },
    "thanks.message_placeholder": { en: "A few words for the couple...", te: "జంటకు కొన్ని మాటలు..." },
    "thanks.submit": { en: "Share My Gift", te: "నా బహుమతిని పంపండి" },
    "thanks.submitting": { en: "Sending...", te: "పంపుతోంది..." },
    "thanks.error_name": { en: "Please enter your name.", te: "మీ పేరు నమోదు చేయండి." },
    "thanks.error_trees": { en: "Please enter a valid number of trees.", te: "సరైన చెట్ల సంఖ్య నమోదు చేయండి." },
    "thanks.error_save": { en: "Could not save right now. Please try again.", te: "ఇప్పుడు సేవ్ చేయలేకపోయాము. దయచేసి మళ్ళీ ప్రయత్నించండి." },
    "thanks.success": { en: "Thank you for your loving gift and blessings!", te: "మీ ప్రేమపూర్వక బహుమతి మరియు ఆశీర్వాదాలకు ధన్యవాదాలు!" },
    "thanks.add_another": { en: "Add another", te: "మరొకటి జోడించండి" },
    "thanks.wall_title": { en: "Our Well-Wishers", te: "మా శ్రేయోభిలాషులు" },
    "thanks.total_trees": { en: "Trees Planted", te: "నాటిన చెట్లు" },
    "thanks.total_guests": { en: "Well-Wishers", te: "శ్రేయోభిలాషులు" },
    "thanks.wall_empty": { en: "No entries yet — be the first to share.", te: "ఇంకా ఎవరూ లేరు — మొదటివారు మీరే అవ్వండి." },
    "thanks.trees_label": { en: "trees", te: "చెట్లు" },
    "thanks.back": { en: "Back to Invitation", te: "శుభలేఖకు తిరిగి" },
    "thanks.nav_button": { en: "Blessings", te: "ఆశీర్వాదాలు" },

    // Footer
    "footer.invite": { en: "We joyfully invite you to share in our happiness", te: "మా ఆనందంలో పాలుపంచుకోమని మిమ్మల్ని ఆహ్వానిస్తున్నాము" },
    "footer.request": { en: "Your gracious presence and blessings are requested at the wedding ceremony.", te: "వివాహ వేడుకకు మీ శుభ ఉనికి మరియు ఆశీర్వాదాలు కోరుతున్నాము." },
    "footer.quote": { en: '"Two souls with but a single thought, two hearts that beat as one."', te: '"ఒకే ఆలోచనతో రెండు ఆత్మలు, ఒకటిగా కొట్టుకునే రెండు హృదయాలు."' },
    "footer.with": { en: "With Love & Blessings", te: "ప్రేమ & ఆశీర్వాదాలతో" },
    "footer.families": { en: "Both Families", te: "ఇరు కుటుంబాలు" },
    "footer.share_whatsapp": { en: "Share on WhatsApp", te: "WhatsApp లో షేర్ చేయండి" },
    "footer.copy_link": { en: "Copy Link", te: "లింక్ కాపీ చేయండి" },
    "footer.link_copied": { en: "Link copied!", te: "లింక్ కాపీ అయింది!" },
  };

  return translations[key]?.[lang] ?? key;
};
