import { Film, User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const {
    user,
    signOut
  } = useAuth();
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      // Error is handled in useAuth
    }
  };
  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      const names = user.user_metadata.full_name.split(" ");
      return names.map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }
    return user?.email?.[0].toUpperCase() || "U";
  };
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Film className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">yet untitled</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {isHomePage ? <>
                <a href="#features" className="text-foreground hover:text-primary transition-colors">
                  Features
                </a>
                <a href="#community" className="text-foreground hover:text-primary transition-colors">
                  Community
                </a>
                <a href="#learning" className="text-foreground hover:text-primary transition-colors">
                  Learn
                </a>
              </> : <>
                <Link to="/community" className="text-foreground hover:text-primary transition-colors">
                  Community
                </Link>
                <Link to="/learn" className="text-foreground hover:text-primary transition-colors">
                  Learn
                </Link>
                <Link to="/create" className="text-foreground hover:text-primary transition-colors">
                  Create
                </Link>
              </>}
          </div>

          <div className="flex items-center gap-4">
            {user ? <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary">
                      <AvatarFallback className="bg-gradient-gold text-primary-foreground font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-background" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.user_metadata?.full_name || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/creator/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>View Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/creator/portfolio")}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>My Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> : <>
                <Link to="/signin">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    Sign In
                  </Button>
                </Link>
                <Link to="/join">
                  <Button className="bg-gradient-gold hover:opacity-90 text-primary-foreground font-semibold shadow-glow">
                    Join Now
                  </Button>
                </Link>
              </>}
          </div>
        </div>
      </div>
    </nav>;
};
export default Navigation;