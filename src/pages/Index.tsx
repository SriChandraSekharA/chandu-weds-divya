import HeroSection from "@/components/wedding/HeroSection";
import CoupleSection from "@/components/wedding/CoupleSection";
import CountdownSection from "@/components/wedding/CountdownSection";
import EventsSection from "@/components/wedding/EventsSection";
import VenueSection from "@/components/wedding/VenueSection";
import FooterSection from "@/components/wedding/FooterSection";
import GopuramParallax from "@/components/wedding/GopuramParallax";
import FixedGopurams from "@/components/wedding/FixedGopurams";
import LanguageToggle from "@/components/wedding/LanguageToggle";
import MusicToggle from "@/components/wedding/MusicToggle";
import { LanguageProvider } from "@/components/wedding/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background overflow-x-hidden">
        <LanguageToggle />
        <FixedGopurams />
        <HeroSection />
        <CoupleSection />
        <GopuramParallax />
        <CountdownSection />
        <EventsSection />
        <VenueSection />
        <FooterSection />
      </div>
    </LanguageProvider>
  );
};

export default Index;
