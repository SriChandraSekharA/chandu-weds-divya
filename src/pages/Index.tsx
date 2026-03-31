import { useState, useCallback } from "react";
import HeroSection from "@/components/wedding/HeroSection";
import CoupleSection from "@/components/wedding/CoupleSection";
import CountdownSection from "@/components/wedding/CountdownSection";
import EventsSection from "@/components/wedding/EventsSection";
import VenueSection from "@/components/wedding/VenueSection";
import FooterSection from "@/components/wedding/FooterSection";
import GopuramParallax from "@/components/wedding/GopuramParallax";
import FixedGopurams from "@/components/wedding/FixedGopurams";
import LanguageToggle from "@/components/wedding/LanguageToggle";
import EnvelopeOpening from "@/components/wedding/EnvelopeOpening";
import FloatingPetals from "@/components/wedding/FloatingPetals";
import AnimatedDiyas from "@/components/wedding/AnimatedDiyas";
import OrnateSection from "@/components/wedding/OrnateSection";
import { LanguageProvider } from "@/components/wedding/LanguageContext";

const Index = () => {
  const [showInvitation, setShowInvitation] = useState(false);
  const handleEnvelopeComplete = useCallback(() => setShowInvitation(true), []);

  return (
    <LanguageProvider>
      {!showInvitation && <EnvelopeOpening onComplete={handleEnvelopeComplete} />}
      <div className={`min-h-screen bg-background overflow-x-hidden ${!showInvitation ? "opacity-0" : "opacity-100"} transition-opacity duration-700`}>
        <LanguageToggle />
        <FixedGopurams />
        <FloatingPetals />
        <AnimatedDiyas />
        <HeroSection />
        <OrnateSection>
          <CoupleSection />
        </OrnateSection>
        <GopuramParallax />
        <OrnateSection>
          <CountdownSection />
        </OrnateSection>
        <OrnateSection>
          <EventsSection />
        </OrnateSection>
        <OrnateSection>
          <VenueSection />
        </OrnateSection>
        <OrnateSection showBottomDivider>
          <FooterSection />
        </OrnateSection>
      </div>
    </LanguageProvider>
  );
};

export default Index;
