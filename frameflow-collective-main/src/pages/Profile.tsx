import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Film, BookOpen, Users, Eye, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { getUserProfile, UserProfile } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.access_token) return;
      
      try {
        const data = await getUserProfile(session.access_token);
        setProfile(data);
      } catch (error) {
        toast({
          title: "Error loading profile",
          description: "Could not fetch your profile data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <Navigation />
        <div className="container mx-auto px-6 flex items-center justify-center">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <Navigation />
        <div className="container mx-auto px-6">
          <p className="text-muted-foreground">Profile not found</p>
        </div>
      </div>
    );
  }

  const getUserInitials = () => {
    return profile.user.name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <Navigation />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Profile Header */}
          <Card className="bg-card/50 backdrop-blur border-border shadow-elegant mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <Avatar className="h-24 w-24 border-4 border-primary">
                  {profile.user.avatarUrl ? (
                    <AvatarImage src={profile.user.avatarUrl} alt={profile.user.name} />
                  ) : null}
                  <AvatarFallback className="bg-gradient-gold text-primary-foreground text-2xl font-bold">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{profile.user.name}</h1>
                  <p className="text-muted-foreground mb-3">{profile.user.email}</p>
                  {profile.user.bio && (
                    <p className="text-foreground">{profile.user.bio}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card className="bg-card/30 backdrop-blur border-border">
              <CardContent className="pt-6 text-center">
                <Film className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{profile.stats.filmsUploaded}</p>
                <p className="text-sm text-muted-foreground">Films</p>
              </CardContent>
            </Card>

            <Card className="bg-card/30 backdrop-blur border-border">
              <CardContent className="pt-6 text-center">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{profile.stats.classesTaken}</p>
                <p className="text-sm text-muted-foreground">Classes</p>
              </CardContent>
            </Card>

            <Card className="bg-card/30 backdrop-blur border-border">
              <CardContent className="pt-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{profile.stats.following}</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </CardContent>
            </Card>

            <Card className="bg-card/30 backdrop-blur border-border">
              <CardContent className="pt-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{profile.stats.followers}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </CardContent>
            </Card>

            <Card className="bg-card/30 backdrop-blur border-border">
              <CardContent className="pt-6 text-center">
                <Eye className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{profile.stats.totalViews.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </CardContent>
            </Card>

            <Card className="bg-card/30 backdrop-blur border-border">
              <CardContent className="pt-6 text-center">
                <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{profile.stats.avgRating.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-card/50 backdrop-blur border-border shadow-elegant">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.recentUploads.map((upload) => (
                  <div key={upload.id} className="flex gap-4 items-start p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                    {upload.thumbnail && (
                      <img 
                        src={upload.thumbnail} 
                        alt={upload.title}
                        className="w-32 h-20 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{upload.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{new Date(upload.createdAt).toLocaleDateString()}</span>
                        <Badge variant={upload.status === 'published' ? 'default' : 'secondary'}>
                          {upload.status}
                        </Badge>
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

export default Profile;
