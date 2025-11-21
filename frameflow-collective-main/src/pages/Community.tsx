import { useEffect, useState } from "react";
import { Film, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { getTrendingCommunity, CommunityItem } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const Community = () => {
  const [items, setItems] = useState<CommunityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const data = await getTrendingCommunity();
        setItems(data);
      } catch (error) {
        toast({
          title: "Error loading community",
          description: "Could not fetch community items",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'group': return Users;
      case 'event': return Calendar;
      case 'film': return Film;
      default: return Film;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <Navigation />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Film className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Join the <span className="bg-gradient-gold bg-clip-text text-transparent">Community</span>
            </h1>
          </div>

          <p className="text-xl text-muted-foreground mb-12">
            Connect with fellow filmmakers, share your work, and learn together
          </p>

          {loading ? (
            <p className="text-muted-foreground">Loading community...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => {
                const Icon = getIcon(item.type);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="bg-card/50 backdrop-blur border-border hover:shadow-glow transition-shadow cursor-pointer">
                      {item.thumbnail && (
                        <div className="aspect-video bg-black">
                          <img 
                            src={item.thumbnail} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start gap-2">
                          <Icon className="h-5 w-5 text-primary mt-1" />
                          <div className="flex-1">
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                          </div>
                          <Badge>{item.type}</Badge>
                        </div>
                      </CardHeader>
                      {item.date && (
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {new Date(item.date).toLocaleDateString()}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Community;
