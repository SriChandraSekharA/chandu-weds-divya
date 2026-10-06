import HeroSection from "@/components/wedding/HeroSection";
import CoupleSection from "@/components/wedding/CoupleSection";
import CountdownSection from "@/components/wedding/CountdownSection";
import EventsSection from "@/components/wedding/EventsSection";
import VenueSection from "@/components/wedding/VenueSection";
import GiftSection from "@/components/wedding/GiftSection";
import FooterSection from "@/components/wedding/FooterSection";
import GopuramParallax from "@/components/wedding/GopuramParallax";
import FixedGopurams from "@/components/wedding/FixedGopurams";
import LanguageToggle from "@/components/wedding/LanguageToggle";
import MusicToggle from "@/components/wedding/MusicToggle";
import SnapSection from "@/components/wedding/SnapSection";
import AmbientParticles from "@/components/wedding/AmbientParticles";
import ScratchReveal from "@/components/wedding/ScratchReveal";
import LoadingOverlay from "@/components/wedding/LoadingOverlay";
import SectionNav from "@/components/wedding/SectionNav";
import { LanguageProvider } from "@/components/wedding/LanguageContext";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";


const Index = () => {
  const [phase, setPhase] = useState<"loading" | "scratch" | "done">("loading");
  return (
    <LanguageProvider>
      <div className="bg-background overflow-x-hidden">
        <AnimatePresence>
          {phase === "loading" && (
            <LoadingOverlay onLoaded={() => setPhase("scratch")} />
          )}
        </AnimatePresence>
        {phase === "scratch" && <ScratchReveal onDone={() => setPhase("done")} />}
        {phase !== "done" && (
          <div className="fixed inset-0 z-[95] bg-background" aria-hidden="true" />
        )}
        <div
          className={phase === "done" ? "" : "invisible"}
          aria-hidden={phase !== "done"}
        >
          <LanguageToggle />
          <MusicToggle />
          <SectionNav />
          <FixedGopurams />
          <AmbientParticles />
          <main className="overflow-x-hidden">
            <SnapSection variant="fade" id="hero"><HeroSection /></SnapSection>
            <SnapSection variant="slide" id="couple"><CoupleSection /></SnapSection>
            <SnapSection variant="fade" id="gopuram"><GopuramParallax /></SnapSection>
            <SnapSection variant="fade" id="countdown"><CountdownSection /></SnapSection>
            <SnapSection variant="slide" id="events"><EventsSection /></SnapSection>
            <SnapSection variant="fade" id="venue"><VenueSection /></SnapSection>
            <SnapSection variant="fade" id="gift"><GiftSection /></SnapSection>
            <SnapSection variant="fade" id="footer"><FooterSection /></SnapSection>
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Index;
