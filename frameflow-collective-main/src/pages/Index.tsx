import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WatchDemoModal from "@/components/WatchDemoModal";
import JoinProjectModal from "@/components/JoinProjectModal";
import IntroAnimation from "@/components/IntroAnimation";
import AlumniShowcase from "@/components/AlumniShowcase";
import WhyJoin from "@/components/WhyJoin";
import OngoingProjects from "@/components/OngoingProjects";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Trigger when user scrolls to bottom (with 100px threshold)
      if (scrollPosition >= documentHeight - 100 && !showJoinModal) {
        setShowJoinModal(true);
        // Remove listener after showing once
        window.removeEventListener("scroll", handleScroll);
      }
    };

    if (showContent) {
      window.addEventListener("scroll", handleScroll);
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showJoinModal, showContent]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setTimeout(() => setShowContent(true), 500);
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {showContent && (
        <div className="min-h-screen bg-background">
          <Navigation />
          
          <div className="fixed bottom-8 right-8 z-40">
            <Button
              size="lg"
              onClick={() => setShowDemoModal(true)}
              className="bg-gradient-gold hover:opacity-90 text-primary-foreground font-semibold shadow-glow rounded-full"
              aria-label="Watch demo video"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          <Hero />
          <AlumniShowcase />
          <WhyJoin />
          <OngoingProjects />
          <div id="features">
            <Features />
          </div>
          <div id="community">
            <CTA />
          </div>
          <Footer />

          <WatchDemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />
          <JoinProjectModal open={showJoinModal} onOpenChange={setShowJoinModal} />
        </div>
      )}
    </>
  );
};

export default Index;
