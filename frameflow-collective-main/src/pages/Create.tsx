import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Film, Upload, Link2, Youtube, Save, Play, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import WatchDemoModal from "@/components/WatchDemoModal";
import { createFilm } from "@/lib/api";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();

  const validateUrl = (url: string): boolean => {
    if (!url.trim()) return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSubmit = async (status: "published" | "draft") => {
    // Reset errors
    setTitleError("");
    setUrlError("");

    if (!session?.access_token) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload films.",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }

    // Validate title
    if (!title.trim()) {
      setTitleError("Title is required");
      toast({
        title: "Missing information",
        description: "Please provide a title for your film.",
        variant: "destructive",
      });
      return;
    }

    // Validate video URL
    if (!videoUrl.trim()) {
      setUrlError("Video URL is required");
      toast({
        title: "Missing information",
        description: "Please provide a video URL.",
        variant: "destructive",
      });
      return;
    }

    if (!validateUrl(videoUrl)) {
      setUrlError("Please enter a valid http(s) URL");
      toast({
        title: "Invalid URL",
        description: "Please provide a valid video URL starting with http:// or https://",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const film = await createFilm(
        {
          title: title.trim(),
          description: description.trim(),
          videoUrl: videoUrl.trim(),
          status,
        },
        session.access_token
      );

      toast({
        title: status === "published" ? "Film published!" : "Draft saved!",
        description: status === "published" 
          ? "Your film is now live and visible to the community."
          : "Your draft has been saved. You can publish it later.",
      });

      // Clear form
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setTitleError("");
      setUrlError("");

      // Optionally navigate to portfolio
      setTimeout(() => {
        navigate("/creator/portfolio");
      }, 1500);
    } catch (error: any) {
      toast({
        title: "Failed to save film",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Welcome to Your
                  <span className="bg-gradient-gold bg-clip-text text-transparent"> Creator Dashboard</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Share your films with the community and start building your portfolio
                </p>
              </div>
              <Button 
                onClick={() => setShowDemoModal(true)}
                className="bg-gradient-gold hover:opacity-90 text-primary-foreground font-semibold shadow-glow"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            <Card className="bg-card/50 backdrop-blur border-border shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload Your Film
                </CardTitle>
                <CardDescription>
                  Share your work by uploading a video file or providing a YouTube/Vimeo link
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Film Title <span className="text-destructive">*</span></Label>
                  <Input
                    id="title"
                    placeholder="Enter your film title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setTitleError("");
                    }}
                    className={`bg-background ${titleError ? "border-destructive" : ""}`}
                    aria-invalid={!!titleError}
                    aria-describedby={titleError ? "title-error" : undefined}
                  />
                  {titleError && (
                    <p id="title-error" className="text-sm text-destructive">{titleError}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your film..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-background min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url" className="flex items-center gap-2">
                    <Youtube className="h-4 w-4 text-primary" />
                    Video URL <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={(e) => {
                      setVideoUrl(e.target.value);
                      setUrlError("");
                    }}
                    className={`bg-background ${urlError ? "border-destructive" : ""}`}
                    aria-invalid={!!urlError}
                    aria-describedby={urlError ? "url-error" : undefined}
                  />
                  {urlError && (
                    <p id="url-error" className="text-sm text-destructive">{urlError}</p>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <TooltipProvider>
                    <div className="flex-1 flex gap-2">
                      <Button 
                        onClick={() => handleSubmit("published")}
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-gold hover:opacity-90 text-primary-foreground font-semibold shadow-glow"
                        aria-label="Publish your film to the community"
                      >
                        <Link2 className="mr-2 h-4 w-4" />
                        {isSubmitting ? "Publishing..." : "Publish Film"}
                      </Button>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="shrink-0">
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <p>Publish makes your film visible to the community. Save Draft keeps it private to you.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                  <Button 
                    onClick={() => handleSubmit("draft")}
                    disabled={isSubmitting}
                    variant="outline" 
                    className="border-border"
                    aria-label="Save your film as a private draft"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Saving..." : "Save Draft"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <Card 
                className="bg-card/30 backdrop-blur border-border hover-scale cursor-pointer"
                onClick={() => navigate("/creator/portfolio")}
              >
                <CardHeader>
                  <CardTitle className="text-lg">My Portfolio</CardTitle>
                  <CardDescription>View all your uploaded films</CardDescription>
                </CardHeader>
              </Card>
              <Card 
                className="bg-card/30 backdrop-blur border-border hover-scale cursor-pointer"
                onClick={() => navigate("/creator/analytics")}
              >
                <CardHeader>
                  <CardTitle className="text-lg">Analytics</CardTitle>
                  <CardDescription>Track views and engagement</CardDescription>
                </CardHeader>
              </Card>
              <Card 
                className="bg-card/30 backdrop-blur border-border hover-scale cursor-pointer"
                onClick={() => navigate("/creator/profile")}
              >
                <CardHeader>
                  <CardTitle className="text-lg">Profile</CardTitle>
                  <CardDescription>Update your creator profile</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>

      <WatchDemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />
    </div>
  );
};

export default Create;
