import { Users, BookOpen, MessageSquare, Sparkles, TrendingUp, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import collaborationImage from "@/assets/collaboration.jpg";
import learningImage from "@/assets/learning.jpg";

const features = [
  {
    icon: Users,
    title: "Collaboration Board",
    description: "Connect with crew members, post opportunities, and build your dream team for your next project.",
  },
  {
    icon: BookOpen,
    title: "Learning Hub",
    description: "Access curated tutorials, resources, and masterclasses from industry professionals.",
  },
  {
    icon: MessageSquare,
    title: "Community Forum",
    description: "Engage in discussions about equipment, techniques, storytelling, and industry trends.",
  },
  {
    icon: Sparkles,
    title: "AI Script Generator",
    description: "Get inspired with AI-powered script ideas and creative prompts tailored to your style.",
  },
  {
    icon: TrendingUp,
    title: "Analytics Dashboard",
    description: "Track your engagement, views, and community impact with detailed insights.",
  },
  {
    icon: Award,
    title: "Achievement Badges",
    description: "Earn recognition for your contributions, skills, and milestones in the community.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to 
            <span className="bg-gradient-gold bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive platform designed specifically for the filmmaking community
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elevation group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <feature.icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Showcase Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">
              Collaborate with 
              <span className="bg-gradient-gold bg-clip-text text-transparent"> Creators Worldwide</span>
            </h3>
            <p className="text-lg text-muted-foreground">
              Join a thriving community of filmmakers, from students to professionals. Share your work, 
              get feedback, find collaborators, and grow your network in the industry.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Personalized profiles with portfolio showcases
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Real-time collaboration and project management
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Direct messaging and team communication
              </li>
            </ul>
          </div>
          
          <div className="relative rounded-xl overflow-hidden shadow-elevation">
            <img 
              src={collaborationImage} 
              alt="Film collaboration" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
          <div className="relative rounded-xl overflow-hidden shadow-elevation order-2 md:order-1">
            <img 
              src={learningImage} 
              alt="Film learning" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <h3 className="text-3xl font-bold">
              Learn from the 
              <span className="bg-gradient-gold bg-clip-text text-transparent"> Best in Industry</span>
            </h3>
            <p className="text-lg text-muted-foreground">
              Access a vast library of tutorials, courses, and resources covering every aspect of 
              filmmaking—from pre-production to post-production.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Categorized learning paths for all skill levels
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Expert-led masterclasses and workshops
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Community-driven knowledge sharing
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
