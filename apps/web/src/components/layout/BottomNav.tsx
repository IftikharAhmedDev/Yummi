"use client";

import { type Screen } from "@/app/page";

const NAV_ITEMS: { id: Screen; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "⚡" },
  { id: "leaderboard", label: "Ranks", icon: "🏆" },
  { id: "friends", label: "Friends", icon: "👥" },
  { id: "history", label: "History", icon: "📊" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

interface BottomNavProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-card-elevated w-[90%] max-w-lg"
      style={{
        borderRadius: "24px",
        border: "1px solid rgba(0,245,255,0.2)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {NAV_ITEMS.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`nav-item ${isActive ? "nav-item-active" : ""}`}
              style={{ minWidth: 56 }}
            >
              <span
                className="text-xl transition-transform"
                style={{
                  transform: isActive ? "scale(1.2)" : "scale(1)",
                  filter: isActive
                    ? "drop-shadow(0 0 8px rgba(0,245,255,0.5))"
                    : "none",
                }}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
