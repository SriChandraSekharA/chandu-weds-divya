import HeroSection from "@/components/wedding/HeroSection";
import CoupleSection from "@/components/wedding/CoupleSection";
import CountdownSection from "@/components/wedding/CountdownSection";
import EventsSection from "@/components/wedding/EventsSection";
import VenueSection from "@/components/wedding/VenueSection";
import FooterSection from "@/components/wedding/FooterSection";
import GopuramParallax from "@/components/wedding/GopuramParallax";
import FixedGopurams from "@/components/wedding/FixedGopurams";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <FixedGopurams />
      <HeroSection />
      <CoupleSection />
      <GopuramParallax />
      <CountdownSection />
      <EventsSection />
      <VenueSection />
      <FooterSection />
    </div>
  );
};

export default Index;
