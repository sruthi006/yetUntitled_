import { useEffect, useState } from "react";
import { BookOpen, Play, Plus, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { getLearningResources, addToLearning, LearningResource } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const Learn = () => {
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { session } = useAuth();

  const categories = ["Editing", "Cinematography", "Sound", "Distribution"];

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getLearningResources();
        setResources(data);
      } catch (error) {
        toast({
          title: "Error loading resources",
          description: "Could not fetch learning resources",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleAddToLearning = async (resourceId: string) => {
    if (!session?.access_token) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your learning list",
        variant: "destructive",
      });
      return;
    }

    try {
      await addToLearning(resourceId, session.access_token);
      toast({
        title: "Added to learning",
        description: "This resource has been added to your list",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not add to learning list",
        variant: "destructive",
      });
    }
  };

  const filteredResources = selectedCategory
    ? resources.filter(r => r.category.includes(selectedCategory))
    : resources;

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
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-gold bg-clip-text text-transparent">Learn</span> & Grow
            </h1>
          </div>

          <p className="text-xl text-muted-foreground mb-8">
            Master the art of filmmaking with curated tutorials and resources
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "bg-gradient-gold" : ""}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-gradient-gold" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {loading ? (
            <p className="text-muted-foreground">Loading resources...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-card/50 backdrop-blur border-border hover:shadow-glow transition-shadow">
                    <div className="aspect-video bg-black relative group">
                      <img 
                        src={resource.thumbnail} 
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="lg"
                          className="bg-gradient-gold hover:opacity-90"
                          onClick={() => window.open(resource.url, '_blank')}
                        >
                          <Play className="mr-2 h-5 w-5" />
                          Watch
                        </Button>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {resource.category.map((cat) => (
                          <Badge key={cat} variant="secondary" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {resource.duration && (
                        <p className="text-sm text-muted-foreground">{resource.duration}</p>
                      )}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleAddToLearning(resource.id)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add to My Learning
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open(resource.url, '_blank')}
                          aria-label="Open on YouTube"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open('https://www.studiobinder.com/blog/filmmaking-youtube-channels/', '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Explore More on StudioBinder
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Learn;
