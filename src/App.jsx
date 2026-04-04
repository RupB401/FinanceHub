import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import SessionManager from "./components/SessionManager";
import Nav from "./components/Nav";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import TitleBar from "./components/TitleBar";
import FinancialDashboard from "./components/FinancialDashboard";
import { FinancialDashboardProvider } from "./contexts/FinancialDashboardContext";

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on authentication errors
        if (
          error?.message?.includes("Authentication") ||
          error?.message?.includes("token")
        ) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      staleTime: 10000, // 10 seconds
    },
  },
});

function AppContent() {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isLogin = location.pathname === "/login";

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <TitleBar />
        {!isLanding && !isLogin && <Nav />}
        <SessionManager />
        <div className="main-content flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/financial-dashboard"
              element={
                <ProtectedRoute>
                  <FinancialDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        {!isLanding && !isLogin && <Footer />}
      </div>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <FinancialDashboardProvider>
              <NotificationProvider>
                <Router>
                  <AppContent />
                </Router>
              </NotificationProvider>
            </FinancialDashboardProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
