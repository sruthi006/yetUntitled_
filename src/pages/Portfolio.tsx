import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Film, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { getUserFilms, Film as FilmType } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const Portfolio = () => {
  const [films, setFilms] = useState<FilmType[]>([]);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  useEffect(() => {
    const fetchFilms = async () => {
      if (!session?.access_token) return;
      
      try {
        const data = await getUserFilms(session.access_token);
        setFilms(data);
      } catch (error) {
        toast({
          title: "Error loading films",
          description: "Could not fetch your films",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, [session]);

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
            <h1 className="text-4xl font-bold">
              My <span className="bg-gradient-gold bg-clip-text text-transparent">Portfolio</span>
            </h1>
          </div>

          {loading ? (
            <p className="text-muted-foreground">Loading your films...</p>
          ) : films.length === 0 ? (
            <Card className="bg-card/50 backdrop-blur border-border">
              <CardContent className="pt-6 text-center py-12">
                <Film className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground">No films yet</p>
                <p className="text-muted-foreground mt-2">Upload your first film to get started</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {films.map((film) => (
                <motion.div
                  key={film.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-card/50 backdrop-blur border-border hover:shadow-glow transition-shadow overflow-hidden cursor-pointer">
                    {film.thumbnail && (
                      <div className="aspect-video bg-black">
                        <img 
                          src={film.thumbnail} 
                          alt={film.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg line-clamp-1">{film.title}</CardTitle>
                        <Badge variant={film.status === 'published' ? 'default' : 'secondary'}>
                          {film.status}
                        </Badge>
                      </div>
                      {film.description && (
                        <CardDescription className="line-clamp-2">
                          {film.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{film.views?.toLocaleString() || 0}</span>
                        </div>
                        <span>{new Date(film.createdAt).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
