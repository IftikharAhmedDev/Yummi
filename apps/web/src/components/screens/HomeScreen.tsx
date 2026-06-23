"use client";

import { type Screen } from "@/app/page";
import { NeonButton } from "@/components/ui/NeonButton";
import { useState } from "react";

interface HomeUser {
  displayName: string;
  level: number;
  xp: number;
  eloRating: number;
  wins: number;
  losses: number;
  winRate: number;
  bestReaction: number;
  avgAccuracy: number;
}

interface HomeScreenProps {
  user: HomeUser;
  onNavigate: (screen: Screen) => void;
}

const MODES = [
  {
    id: "target",
    name: "TARGET",
    desc: "Stop the timer as close to the target as possible",
    icon: "🎯",
    color: "var(--neon-cyan)",
    cssClass: "mode-card-target",
  },
  {
    id: "reaction",
    name: "REACTION",
    desc: "React to the signal as fast as you can",
    icon: "⚡",
    color: "var(--neon-pink)",
    cssClass: "mode-card-reaction",
  },
  {
    id: "precision",
    name: "PRECISION",
    desc: "Stop inside the precision window for maximum points",
    icon: "💎",
    color: "var(--neon-purple)",
    cssClass: "mode-card-precision",
  },
  {
    id: "blind_target",
    name: "BLIND TARGET",
    desc: "Target mode, but the timer is hidden. Trust your rhythm",
    icon: "👁️‍🗨️",
    color: "var(--neon-orange)",
    cssClass: "mode-card-blind",
  },
];

const MATCH_TYPES = ["Practice", "1v1", "2v2", "3v3", "4v4"];

export function HomeScreen({ user, onNavigate }: HomeScreenProps) {
  const [selectedMode, setSelectedMode] = useState("target");
  const [selectedMatch, setSelectedMatch] = useState("1v1");

  return (
    <div className="min-h-screen pb-32 px-4 sm:px-6 md:px-8 pt-10 md:pt-14 max-w-5xl mx-auto w-full">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 animate-slide-down">
        <div>
          <p
            className="text-sm mb-1"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-secondary)",
              letterSpacing: "0.08em",
            }}
          >
            WELCOME BACK
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 4vw, 1.8rem)",
              fontWeight: 800,
              background:
                "linear-gradient(135deg, var(--neon-cyan), var(--neon-blue))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {user.displayName}
          </h1>
        </div>

        {/* Quick stats */}
        <button
          onClick={() => onNavigate("profile")}
          className="glass-card flex items-center gap-3 px-4 py-3 cursor-pointer"
        >
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 44,
              height: 44,
              background:
                "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(168,85,247,0.15))",
              border: "1px solid rgba(0,245,255,0.2)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "0.9rem",
                color: "var(--neon-cyan)",
              }}
            >
              {user.level}
            </span>
          </div>
          <div className="hidden sm:block">
            <p
              className="text-xs"
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-heading)",
                letterSpacing: "0.05em",
              }}
            >
              ELO RATING
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "var(--neon-yellow)",
                textShadow: "0 0 10px rgba(255,215,0,0.3)",
              }}
            >
              {user.eloRating}
            </p>
          </div>
        </button>
      </header>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 stagger-children">
        {[
          {
            label: "Win Rate",
            value: `${user.winRate}%`,
            color: "var(--neon-green)",
          },
          {
            label: "Best Reaction",
            value: `${user.bestReaction}ms`,
            color: "var(--neon-cyan)",
          },
          {
            label: "Avg Accuracy",
            value: `${user.avgAccuracy}ms`,
            color: "var(--neon-purple)",
          },
          {
            label: "W/L",
            value: `${user.wins}/${user.losses}`,
            color: "var(--neon-blue)",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass-card p-4 animate-slide-up"
          >
            <p
              className="text-xs mb-1"
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-heading)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.2rem",
                color: stat.color,
                textShadow: `0 0 10px color-mix(in srgb, ${stat.color} 40%, transparent)`,
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Game Mode Selection */}
      <section className="mb-8">
        <h2
          className="mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.1rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
          }}
        >
          Select Mode
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
          {MODES.map((mode) => (
            <button
              key={mode.id}
              id={`mode-${mode.id}`}
              onClick={() => setSelectedMode(mode.id)}
              className={`mode-card ${mode.cssClass} ${
                selectedMode === mode.id ? "mode-card-selected" : ""
              } animate-slide-up text-left`}
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-3xl"
                  style={{
                    filter:
                      selectedMode === mode.id
                        ? `drop-shadow(0 0 10px ${mode.color})`
                        : "none",
                    transition: "filter 0.3s ease",
                  }}
                >
                  {mode.icon}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "1rem",
                      letterSpacing: "0.06em",
                      color:
                        selectedMode === mode.id
                          ? mode.color
                          : "var(--text-primary)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {mode.name}
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--text-muted)", lineHeight: 1.4 }}
                  >
                    {mode.desc}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Match Type */}
      <section className="mb-8">
        <h2
          className="mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.1rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
          }}
        >
          Match Type
        </h2>
        <div className="flex flex-wrap gap-3">
          {MATCH_TYPES.map((type) => (
            <button
              key={type}
              id={`match-${type}`}
              onClick={() => setSelectedMatch(type)}
              className={`match-pill ${
                selectedMatch === type ? "match-pill-active" : ""
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* Action Buttons */}
      <section className="flex flex-col sm:flex-row gap-4">
        <NeonButton
          id="btn-find-match"
          variant="green"
          size="lg"
          className="flex-1"
          onClick={() => onNavigate("queue")}
        >
          ⚡ Find Match
        </NeonButton>
        <NeonButton
          id="btn-create-room"
          variant="cyan"
          size="lg"
          className="flex-1"
          onClick={() => onNavigate("room")}
        >
          🏠 Create Room
        </NeonButton>
        <NeonButton
          id="btn-practice"
          variant="purple"
          size="lg"
          className="flex-1"
          onClick={() => onNavigate("game")}
        >
          🎯 Practice
        </NeonButton>
      </section>
    </div>
  );
}
