import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-cinematic" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Connect with
            <span className="bg-gradient-gold bg-clip-text text-transparent"> Your Film Community</span>?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-10">
            Join thousands of creators who are already networking, learning, and creating together on FrameConnect.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/join">
              <Button 
                size="lg" 
                className="bg-gradient-gold hover:opacity-90 text-primary-foreground font-semibold shadow-glow text-lg px-8 py-6 group"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/learn">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-foreground hover:bg-primary/10 text-lg px-8 py-6"
              >
                Explore Platform
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • Free forever plan available
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
