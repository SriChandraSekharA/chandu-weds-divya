import HeroSection from "@/components/wedding/HeroSection";
import CoupleSection from "@/components/wedding/CoupleSection";
import CountdownSection from "@/components/wedding/CountdownSection";
import EventsSection from "@/components/wedding/EventsSection";
import VenueSection from "@/components/wedding/VenueSection";
import FooterSection from "@/components/wedding/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <CoupleSection />
      <CountdownSection />
      <EventsSection />
      <VenueSection />
      <FooterSection />
    </div>
  );
};

export default Index;
