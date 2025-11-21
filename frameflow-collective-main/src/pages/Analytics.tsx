import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Eye, Clock, TrendingUp, Film } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { getAnalytics, AnalyticsData } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const Analytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!session?.access_token) return;
      
      try {
        const data = await getAnalytics(session.access_token);
        setAnalytics(data);
      } catch (error) {
        toast({
          title: "Error loading analytics",
          description: "Could not fetch your analytics data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <Navigation />
        <div className="container mx-auto px-6">
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <Navigation />
        <div className="container mx-auto px-6">
          <p className="text-muted-foreground">No analytics data available</p>
        </div>
      </div>
    );
  }

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
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-gold bg-clip-text text-transparent">Analytics</span>
            </h1>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card/50 backdrop-blur border-border shadow-elegant">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Eye className="h-8 w-8 text-primary" />
                  <span className="text-sm text-muted-foreground">Total</span>
                </div>
                <p className="text-3xl font-bold">{analytics.totalViews.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-1">Views</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border shadow-elegant">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="h-8 w-8 text-primary" />
                  <span className="text-sm text-muted-foreground">Avg</span>
                </div>
                <p className="text-3xl font-bold">{analytics.avgWatchTime.toFixed(1)} min</p>
                <p className="text-sm text-muted-foreground mt-1">Watch Time</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border shadow-elegant">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <span className="text-sm text-muted-foreground">Rate</span>
                </div>
                <p className="text-3xl font-bold">{analytics.engagementRate.toFixed(1)}%</p>
                <p className="text-sm text-muted-foreground mt-1">Engagement</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border shadow-elegant">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Film className="h-8 w-8 text-primary" />
                  <span className="text-sm text-muted-foreground">Total</span>
                </div>
                <p className="text-3xl font-bold">{analytics.topFilms.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Top Films</p>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Films */}
          <Card className="bg-card/50 backdrop-blur border-border shadow-elegant">
            <CardHeader>
              <CardTitle>Top Performing Films</CardTitle>
              <CardDescription>Your most viewed content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topFilms.map((film, index) => (
                  <div key={film.id} className="flex gap-4 items-center p-4 rounded-lg bg-background/50">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-gold text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    {film.thumbnail && (
                      <img 
                        src={film.thumbnail} 
                        alt={film.title}
                        className="w-32 h-20 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{film.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{film.views?.toLocaleString() || 0} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
