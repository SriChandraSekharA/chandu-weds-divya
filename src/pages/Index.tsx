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
import SnapSection from "@/components/wedding/SnapSection";
import { LanguageProvider } from "@/components/wedding/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="bg-background overflow-x-hidden">
        <LanguageToggle />
        <MusicToggle />
        <FixedGopurams />
        <main className="h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth no-scrollbar">
          <SnapSection variant="fade"><HeroSection /></SnapSection>
          <SnapSection variant="slide"><CoupleSection /></SnapSection>
          <SnapSection variant="fade"><GopuramParallax /></SnapSection>
          <SnapSection variant="flip"><CountdownSection /></SnapSection>
          <SnapSection variant="slide"><EventsSection /></SnapSection>
          <SnapSection variant="flip"><VenueSection /></SnapSection>
          <SnapSection variant="fade"><FooterSection /></SnapSection>
        </main>
      </div>
    </LanguageProvider>
  );
};

export default Index;
