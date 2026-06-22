"use client";

import { useState, useEffect } from "react";
import { SplashScreen } from "@/components/screens/SplashScreen";
import { LoginScreen } from "@/components/screens/LoginScreen";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { GameScreen } from "@/components/screens/GameScreen";
import { ResultsScreen } from "@/components/screens/ResultsScreen";
import { ProfileScreen } from "@/components/screens/ProfileScreen";
import { LeaderboardScreen } from "@/components/screens/LeaderboardScreen";
import { FriendsScreen } from "@/components/screens/FriendsScreen";
import { RoomScreen } from "@/components/screens/RoomScreen";
import { QueueScreen } from "@/components/screens/QueueScreen";
import { SettingsScreen } from "@/components/screens/SettingsScreen";
import { HistoryScreen } from "@/components/screens/HistoryScreen";
import { BottomNav } from "@/components/layout/BottomNav";

export type Screen =
  | "splash"
  | "login"
  | "home"
  | "game"
  | "results"
  | "profile"
  | "leaderboard"
  | "friends"
  | "room"
  | "queue"
  | "settings"
  | "history";

// Mock user for demo
const MOCK_USER = {
  id: "usr_001",
  username: "NeonBlade",
  displayName: "NeonBlade",
  avatarUrl: "",
  level: 42,
  xp: 7850,
  eloRating: 1847,
  wins: 234,
  losses: 98,
  winRate: 70.5,
  bestReaction: 142,
  avgAccuracy: 18.3,
};

export default function Page() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Splash → Login transition
  useEffect(() => {
    if (screen === "splash") {
      const timer = setTimeout(() => {
        setScreen(isLoggedIn ? "home" : "login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [screen, isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setScreen("home");
  };

  const showNav =
    isLoggedIn &&
    !["splash", "login", "game", "results", "queue"].includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return <SplashScreen />;
      case "login":
        return <LoginScreen onLogin={handleLogin} />;
      case "home":
        return (
          <HomeScreen
            user={MOCK_USER}
            onNavigate={setScreen}
          />
        );
      case "game":
        return (
          <GameScreen
            onEnd={() => setScreen("results")}
            onBack={() => setScreen("home")}
          />
        );
      case "results":
        return (
          <ResultsScreen
            onPlayAgain={() => setScreen("game")}
            onHome={() => setScreen("home")}
          />
        );
      case "profile":
        return (
          <ProfileScreen
            user={MOCK_USER}
            onBack={() => setScreen("home")}
          />
        );
      case "leaderboard":
        return <LeaderboardScreen onBack={() => setScreen("home")} />;
      case "friends":
        return (
          <FriendsScreen
            onBack={() => setScreen("home")}
            onInvite={() => setScreen("room")}
          />
        );
      case "room":
        return (
          <RoomScreen
            onStart={() => setScreen("game")}
            onBack={() => setScreen("home")}
          />
        );
      case "queue":
        return (
          <QueueScreen
            onMatchFound={() => setScreen("game")}
            onCancel={() => setScreen("home")}
          />
        );
      case "settings":
        return (
          <SettingsScreen onBack={() => setScreen("home")} />
        );
      case "history":
        return (
          <HistoryScreen onBack={() => setScreen("home")} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex-1">{renderScreen()}</div>
      {showNav && (
        <BottomNav
          activeScreen={screen}
          onNavigate={setScreen}
        />
      )}
    </div>
  );
}
