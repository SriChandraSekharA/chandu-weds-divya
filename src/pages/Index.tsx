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
import CurtainIntro from "@/components/wedding/CurtainIntro";
import ScratchReveal from "@/components/wedding/ScratchReveal";
import LoadingOverlay from "@/components/wedding/LoadingOverlay";
import { LanguageProvider } from "@/components/wedding/LanguageContext";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";


const Index = () => {
  const [phase, setPhase] = useState<"loading" | "curtain" | "scratch" | "done">("loading");
  return (
    <LanguageProvider>
      <div className="bg-background overflow-x-hidden">
        <AnimatePresence>
          {phase === "loading" && (
            <LoadingOverlay onLoaded={() => setPhase("curtain")} />
          )}
        </AnimatePresence>
        {phase === "curtain" && <CurtainIntro onComplete={() => setPhase("scratch")} />}
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
          <FixedGopurams />
          <AmbientParticles />
          <main className="overflow-x-hidden">
          <SnapSection variant="fade"><HeroSection /></SnapSection>
          <SnapSection variant="slide"><CoupleSection /></SnapSection>
          <SnapSection variant="fade"><GopuramParallax /></SnapSection>
          <SnapSection variant="fade"><CountdownSection /></SnapSection>
          <SnapSection variant="slide"><EventsSection /></SnapSection>
          <SnapSection variant="fade"><VenueSection /></SnapSection>
            <SnapSection variant="fade"><FooterSection /></SnapSection>
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Index;
