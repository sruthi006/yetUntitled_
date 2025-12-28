import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Film, Users, Calendar } from "lucide-react";

const projects = [
  {
    id: "1",
    title: "Urban Dreams",
    genre: "Drama",
    director: "Sarah Chen",
    neededRoles: ["Sound Designer", "Editor"],
    status: "Pre-Production",
    startDate: "March 2025",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
  },
  {
    id: "2",
    title: "Midnight Runner",
    genre: "Thriller",
    director: "James Mitchell",
    neededRoles: ["Cinematographer", "Assistant Director"],
    status: "Casting",
    startDate: "April 2025",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
  },
  {
    id: "3",
    title: "Silent Stories",
    genre: "Documentary",
    director: "Maya Patel",
    neededRoles: ["Editor", "Sound Designer"],
    status: "Production",
    startDate: "February 2025",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
  },
  {
    id: "4",
    title: "The Last Frame",
    genre: "Sci-Fi",
    director: "Alex Rodriguez",
    neededRoles: ["Production Designer", "VFX Artist"],
    status: "Pre-Production",
    startDate: "May 2025",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80",
  },
];

const OngoingProjects = () => {
  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join <span className="text-transparent bg-clip-text bg-gradient-gold">Active Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with filmmakers and find your next creative collaboration
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-glow transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-gradient-gold text-primary-foreground">
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.genre}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Film className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Dir: {project.director}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{project.startDate}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground font-medium">Needed:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.neededRoles.map((role) => (
                        <Badge key={role} variant="secondary" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-gradient-gold hover:text-primary-foreground transition-all"
                  >
                    Learn More
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            size="lg"
            className="bg-gradient-gold hover:opacity-90 text-primary-foreground font-semibold"
          >
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default OngoingProjects;
