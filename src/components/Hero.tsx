import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import heroImage from "@/assets/hero-filmmaking.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Cinematic filmmaking"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-slate-50">
            Built for Filmmakers
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10">
            Driven by Collaboration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://www.youtube.com/@StudioBinder" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gradient-gold hover:opacity-90 text-primary-foreground font-semibold shadow-glow text-lg px-8 py-6 group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </a>
            <Link to="/join">
              <Button size="lg" variant="outline" className="text-foreground hover:bg-primary/10 text-lg px-8 py-6">
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
