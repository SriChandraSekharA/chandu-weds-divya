import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
// import ThankYou from "./pages/ThankYou.tsx";

const queryClient = new QueryClient();

// The app is hosted at the domain root on Lovable and under this path on
// GitHub Pages. Keep routing aligned with the URL without baking either host
// into the production asset paths.
const githubPagesPath = "/chandu-weds-divya";
const isGitHubPagesPath =
  window.location.pathname === githubPagesPath ||
  window.location.pathname.startsWith(`${githubPagesPath}/`);
const routerBasename = isGitHubPagesPath ? githubPagesPath : "/";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={routerBasename}>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* <Route path="/thank-you" element={<ThankYou />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
