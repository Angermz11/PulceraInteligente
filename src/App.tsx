import React, { useState, useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import SplashScreen from "./components/SplashScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import HomeScreen from "./components/HomeScreen";
import AlertsScreen from "./components/AlertsScreen";
import LocationScreen from "./components/LocationScreen";
import SettingsScreen from "./components/SettingsScreen";
import ProfileScreen from "./components/ProfileScreen";
import BottomNav from "./components/BottomNav";

type Screen =
  | "splash"
  | "login"
  | "register"
  | "home"
  | "alerts"
  | "location"
  | "settings"
  | "profile";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("splash");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Show splash screen for 2.5 seconds
    const timer = setTimeout(() => {
      setCurrentScreen("login");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen("home");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen("login");
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setCurrentScreen("home");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "dark bg-gray-950" : "bg-gray-50"}`}
    >
      <div className="max-w-md mx-auto min-h-screen relative bg-white dark:bg-gray-900 shadow-xl overflow-hidden">
        {currentScreen === "splash" && <SplashScreen />}

        {currentScreen === "login" && (
          <LoginScreen
            onLogin={handleLogin}
            onNavigateToRegister={() =>
              setCurrentScreen("register")
            }
          />
        )}

        {currentScreen === "register" && (
          <RegisterScreen
            onRegister={handleRegister}
            onNavigateToLogin={() => setCurrentScreen("login")}
          />
        )}

        {isAuthenticated && (
          <>
            {currentScreen === "home" && (
              <HomeScreen 
                darkMode={darkMode}
                onNavigateToLocation={() => setCurrentScreen("location")}
              />
            )}
            {currentScreen === "alerts" && (
              <AlertsScreen 
                darkMode={darkMode}
                onNavigateToLocation={() => setCurrentScreen("location")}
              />
            )}
            {currentScreen === "location" && (
              <LocationScreen darkMode={darkMode} />
            )}
            {currentScreen === "settings" && (
              <SettingsScreen
                darkMode={darkMode}
                onToggleDarkMode={toggleDarkMode}
                onLogout={handleLogout}
              />
            )}
            {currentScreen === "profile" && (
              <ProfileScreen darkMode={darkMode} />
            )}

            <BottomNav
              currentScreen={
                currentScreen as
                  | "home"
                  | "alerts"
                  | "location"
                  | "settings"
                  | "profile"
              }
              onNavigate={(screen) => setCurrentScreen(screen)}
              darkMode={darkMode}
            />
          </>
        )}
      </div>

      {/* Toast notifications */}
      <Toaster 
        position="top-center"
        theme={darkMode ? "dark" : "light"}
        richColors
      />
    </div>
  );
}