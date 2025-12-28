import { motion } from "framer-motion";
import { Users, Zap, Trophy, Heart } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Build Your Network",
    description: "Connect with talented filmmakers, crew members, and industry professionals from around the world.",
  },
  {
    icon: Zap,
    title: "Fast Collaboration",
    description: "Find the right talent quickly and start creating amazing content together in no time.",
  },
  {
    icon: Trophy,
    title: "Showcase Your Work",
    description: "Build your portfolio, gain recognition, and get discovered by producers and directors.",
  },
  {
    icon: Heart,
    title: "Passion-Driven Community",
    description: "Join a supportive community of creators who share your love for filmmaking and storytelling.",
  },
];

const WhyJoin = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Join <span className="text-transparent bg-clip-text bg-gradient-gold">FrameConnect</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to turn your creative vision into reality
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                className="flex gap-6 p-6 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-colors"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;
