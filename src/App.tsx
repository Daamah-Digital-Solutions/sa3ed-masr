import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MentorRegister from "./pages/MentorRegister";
import SeekerRegister from "./pages/SeekerRegister";
import BrowseMentors from "./pages/BrowseMentors";
import BrowseProjects from "./pages/BrowseProjects";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mentor-register" element={<MentorRegister />} />
          <Route path="/seeker-register" element={<SeekerRegister />} />
          <Route path="/mentors" element={<BrowseMentors />} />
          <Route path="/projects" element={<BrowseProjects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
