import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Camera, Music, Film, Clapperboard, Users } from "lucide-react";

interface JoinProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Project {
  id: string;
  name: string;
  neededCrew: string[];
}

const crafts = [
  { value: "sound-design", label: "Sound Design", icon: Music },
  { value: "editing", label: "Editing", icon: Film },
  { value: "cinematography", label: "Cinematography", icon: Camera },
  { value: "assistant-director", label: "Assistant Director", icon: Clapperboard },
  { value: "production", label: "Production", icon: Users },
];

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Urban Dreams",
    neededCrew: ["sound-design", "editing"],
  },
  {
    id: "2",
    name: "Midnight Runner",
    neededCrew: ["cinematography", "assistant-director"],
  },
  {
    id: "3",
    name: "The Last Frame",
    neededCrew: ["sound-design", "production"],
  },
  {
    id: "4",
    name: "Silent Stories",
    neededCrew: ["editing", "cinematography"],
  },
];

const JoinProjectModal = ({ open, onOpenChange }: JoinProjectModalProps) => {
  const [step, setStep] = useState<"register" | "browse">("register");
  const [selectedCraft, setSelectedCraft] = useState<string>("");

  const handleCraftSubmit = () => {
    if (selectedCraft) {
      setStep("browse");
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset to registration step after a delay
    setTimeout(() => {
      setStep("register");
      setSelectedCraft("");
    }, 300);
  };

  const filteredProjects = selectedCraft
    ? mockProjects.filter((project) =>
        project.neededCrew.includes(selectedCraft)
      )
    : mockProjects;

  const getCraftLabel = (craftValue: string) => {
    return crafts.find((c) => c.value === craftValue)?.label || craftValue;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        {step === "register" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Join Our Creative Community</DialogTitle>
              <DialogDescription>
                Register your craft to discover projects that need your skills
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-3">
                <Label htmlFor="craft" className="text-base">
                  Select Your Craft
                </Label>
                <Select value={selectedCraft} onValueChange={setSelectedCraft}>
                  <SelectTrigger id="craft" className="w-full">
                    <SelectValue placeholder="Choose your specialty..." />
                  </SelectTrigger>
                  <SelectContent>
                    {crafts.map((craft) => {
                      const Icon = craft.icon;
                      return (
                        <SelectItem key={craft.value} value={craft.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span>{craft.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleCraftSubmit}
                disabled={!selectedCraft}
                className="w-full bg-gradient-gold hover:opacity-90 text-primary-foreground"
                size="lg"
              >
                Find Projects
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Available Projects</DialogTitle>
              <DialogDescription>
                Projects looking for {getCraftLabel(selectedCraft)} talent
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <Card key={project.id} className="p-4 hover:shadow-glow transition-shadow">
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Needed Crew:
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.neededCrew.map((crew) => (
                          <Badge
                            key={crew}
                            variant={crew === selectedCraft ? "default" : "secondary"}
                            className={
                              crew === selectedCraft
                                ? "bg-gradient-gold text-primary-foreground"
                                : ""
                            }
                          >
                            {getCraftLabel(crew)}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          // TODO: Implement join project logic
                          console.log("Join project:", project.id);
                        }}
                      >
                        Express Interest
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No projects currently need {getCraftLabel(selectedCraft)}.</p>
                  <p className="text-sm mt-2">Check back soon!</p>
                </div>
              )}
              <Button
                variant="ghost"
                onClick={() => setStep("register")}
                className="w-full"
              >
                Change Craft
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JoinProjectModal;
