import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Quote, Award, TrendingUp } from "lucide-react";

const alumni = [
  {
    name: "Marcus Chen",
    role: "Director",
    achievement: "Sundance Film Festival Winner 2024",
    quote: "FrameConnect helped me find the perfect crew for my debut feature. The collaboration was seamless, and we created something magical together.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    project: "Echoes of Tomorrow",
  },
  {
    name: "Sarah Williams",
    role: "Cinematographer",
    achievement: "Emmy Award Nominee",
    quote: "This platform connected me with visionary directors who trusted my creative vision. I've worked on 12 projects in just 8 months!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    project: "Urban Lights Series",
  },
  {
    name: "David Rodriguez",
    role: "Sound Designer",
    achievement: "BAFTA Award Winner",
    quote: "The quality of projects and professionals on FrameConnect is exceptional. It's where serious filmmakers come to collaborate.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    project: "Silent Echo",
  },
];

const stats = [
  { number: "10K+", label: "Active Creators" },
  { number: "2,500+", label: "Projects Completed" },
  { number: "50+", label: "Award Winners" },
  { number: "95%", label: "Success Rate" },
];

const AlumniShowcase = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Success Stories from Our <span className="text-transparent bg-clip-text bg-gradient-gold">Alumni</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of filmmakers who have launched their careers and created award-winning content through FrameConnect
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-lg bg-secondary/20 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-gold mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Alumni Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {alumni.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="p-6 h-full hover:shadow-glow transition-all duration-300 flex flex-col">
                <Quote className="h-8 w-8 text-gradient-gold mb-4 opacity-50" />
                
                <p className="text-muted-foreground italic mb-6 flex-grow">
                  "{person.quote}"
                </p>

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-gradient-gold"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{person.name}</h4>
                    <p className="text-sm text-muted-foreground">{person.role}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-gradient-gold" />
                    <span className="text-muted-foreground">{person.achievement}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-gradient-gold" />
                    <span className="text-muted-foreground">Featured: {person.project}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-xl text-muted-foreground mb-6">
            Ready to write your own success story?
          </p>
          <div className="inline-block px-8 py-4 rounded-lg bg-secondary/30 backdrop-blur-sm">
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-gold">
              Your next big project starts here
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AlumniShowcase;
