import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Web3FormsTest from "@/pages/Web3FormsTest";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SolarSolutions from "./pages/SolarSolutions";
import ElectricalSolutions from "./pages/ElectricalSolutions";
import DieselDelivery from "./pages/DieselDelivery";

import SolarPackages from "./pages/SolarPackages";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/solar-solutions"} component={SolarSolutions} />
      <Route path={"/electrical-solutions"} component={ElectricalSolutions} />
      <Route path={"/diesel-delivery"} component={DieselDelivery} />
      <Route path={"/solar-packages"} component={SolarPackages} />
      <Route path={"/web3forms-test"} component={Web3FormsTest} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
