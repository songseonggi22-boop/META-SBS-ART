import { Toaster } from "@/components/ui/sonner";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import SiteShell from "./components/SiteShell";
import ConsultModal from "./components/ConsultModal";
import { ConsultModalProvider } from "./components/ConsultModalContext";
import Seo from "./components/Seo";
import FloatingCta from "./components/FloatingCta";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import ResourceDetail from "./pages/ResourceDetail";
import Landing from "./pages/Landing";
import CourseDetail from "./pages/CourseDetail";
import PortfolioDetail from "./pages/PortfolioDetail";
import { AboutPage, AuthPage, CheckoutPage, InfoPage, NotFoundPage, PricingPage, PrivacyPage } from "./pages/InfoPages";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Resources} />
      <Route path="/blog/:id" component={ResourceDetail} />
      <Route path="/resources" component={Resources} />
      <Route path="/about" component={AboutPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/auth/login"><AuthPage mode="login" /></Route>
      <Route path="/auth/sign-up"><AuthPage mode="sign-up" /></Route>
      <Route path="/checkout"><CheckoutPage /></Route>
      <Route path="/docs"><InfoPage kind="docs" /></Route>
      <Route path="/terms"><InfoPage kind="terms" /></Route>
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/daejeon/:slug" component={Landing} />
      <Route path="/course/:slug" component={CourseDetail} />
      <Route path="/portfolio/:id" component={PortfolioDetail} />
      <Route path="/404" component={NotFoundPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Toaster position="bottom-right" />
      <ConsultModalProvider>
        <Seo />
        <SiteShell><Router /></SiteShell>
        <FloatingCta />
        <ConsultModal />
      </ConsultModalProvider>
    </ErrorBoundary>
  );
}
