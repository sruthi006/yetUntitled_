import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Video {
  id: string;
  title: string;
  youtubeId: string;
  description: string;
}

const demoVideos: Video[] = [
  {
    id: '1',
    title: 'What is a Gaffer in Film?',
    youtubeId: 'h-93j2aY8pA',
    description: 'Role of the Gaffer & Chief Lighting Technician Explained',
  },
  {
    id: '2',
    title: 'What is a Key Grip in Film?',
    youtubeId: 'Y-hXf2w3A8I',
    description: 'Role of the Key Grip Explained',
  },
];

interface WatchDemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WatchDemoModal = ({ open, onOpenChange }: WatchDemoModalProps) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const currentVideo = demoVideos[currentVideoIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{currentVideo.title}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Video Player */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentVideo.youtubeId}`}
              title={currentVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Video Description */}
          <p className="text-muted-foreground">{currentVideo.description}</p>

          {/* Video Selector */}
          <div className="flex gap-2 flex-wrap">
            {demoVideos.map((video, index) => (
              <Button
                key={video.id}
                variant={currentVideoIndex === index ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentVideoIndex(index)}
                className={currentVideoIndex === index ? "bg-gradient-gold" : ""}
              >
                Demo {index + 1}
              </Button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open(`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`, '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Open on YouTube
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open('https://www.youtube.com/@StudioBinder', '_blank')}
            >
              More Learning Resources
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WatchDemoModal;
