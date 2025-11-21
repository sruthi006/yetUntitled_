import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-filmmaking.jpg";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Cinematic filmmaking" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-cinematic" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-slate-50">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Built for FILMMAKERS       
Driven by COLLABORATION                         

       

       

       

       

       

                                                                                              







          <span className="bg-gradient-gold bg-clip-text text-transparent">Built for FILMMAKERS        </span>
            Connect
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            The ultimate platform for filmmakers to network, collaborate, learn, and showcase their craft to a global community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/create">
              <Button size="lg" className="bg-gradient-gold hover:opacity-90 text-primary-foreground font-semibold shadow-glow text-lg px-8 py-6 group">
                Start Creating
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-primary text-foreground hover:bg-primary/10 text-lg px-8 py-6 group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Creators</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5K+</div>
              <div className="text-sm text-muted-foreground">Films Shared</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Collaborations</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;