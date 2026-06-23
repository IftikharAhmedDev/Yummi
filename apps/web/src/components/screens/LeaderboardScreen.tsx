"use client";

import { NeonButton } from "@/components/ui/NeonButton";

interface LeaderboardScreenProps {
  onBack: () => void;
}

const MOCK_LEADERBOARD = [
  { rank: 1, name: "Timi", elo: 2150, winRate: 78.5, ping: 12 },
  { rank: 2, name: "CyberFox", elo: 2120, winRate: 75.2, ping: 25 },
  { rank: 3, name: "VoidRunner", elo: 2095, winRate: 73.8, ping: 15 },
  { rank: 4, name: "GlitchWave", elo: 2050, winRate: 71.4, ping: 32 },
  { rank: 5, name: "ZeroCool", elo: 2010, winRate: 69.9, ping: 45 },
  { rank: 6, name: "AcidBurn", elo: 1980, winRate: 68.1, ping: 22 },
  { rank: 7, name: "CrashOverride", elo: 1955, winRate: 66.5, ping: 18 },
  { rank: 8, name: "PhantomPhreak", elo: 1920, winRate: 65.0, ping: 28 },
];

export function LeaderboardScreen({ onBack }: LeaderboardScreenProps) {
  return (
    <div className="min-h-screen pb-32 px-4 sm:px-6 md:px-8 pt-10 md:pt-14 max-w-5xl mx-auto w-full">
      <header className="flex items-center gap-4 mb-8 animate-slide-down">
        <button
          onClick={onBack}
          className="glass-card px-3 py-2 text-sm cursor-pointer"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-secondary)",
          }}
        >
          ← BACK
        </button>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "var(--text-primary)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Global Ranks
        </h1>
      </header>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {["Global", "Regional", "Friends"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full font-['var(--font-heading)'] text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
              i === 0
                ? "bg-[rgba(0,245,255,0.15)] text-[var(--neon-cyan)] border border-[rgba(0,245,255,0.4)] shadow-[0_0_10px_rgba(0,245,255,0.2)]"
                : "bg-[var(--glass-bg)] text-[var(--text-secondary)] border border-[var(--glass-border)] hover:text-[var(--text-primary)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="glass-card-elevated overflow-hidden animate-slide-up">
        {/* Header row */}
        <div
          className="grid gap-4 px-6 py-3 bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.05)]"
          style={{
            gridTemplateColumns: "40px 1fr 70px 60px",
            fontFamily: "var(--font-heading)",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          <span>Rank</span>
          <span>Player</span>
          <span className="text-right">Win Rate</span>
          <span className="text-right">ELO</span>
        </div>

        {/* Player rows */}
        <div className="flex flex-col">
          {MOCK_LEADERBOARD.map((player, index) => (
            <div
              key={player.rank}
              className="grid gap-3 sm:gap-4 px-4 sm:px-6 py-4 transition-colors hover:bg-[rgba(0,245,255,0.03)] border-b border-[rgba(255,255,255,0.02)]"
              style={{
                gridTemplateColumns: "40px 1fr 70px 60px",
                alignItems: "center",
                animationDelay: `${index * 50}ms`,
              }}
            >
              <span
                className={`lb-rank ${
                  player.rank === 1
                    ? "lb-rank-1"
                    : player.rank === 2
                    ? "lb-rank-2"
                    : player.rank === 3
                    ? "lb-rank-3"
                    : ""
                }`}
              >
                #{player.rank}
              </span>
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                  }}
                >
                  {player.name.charAt(0)}
                </div>
                <span
                  className="truncate"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {player.name}
                </span>
              </div>
              <span
                className="text-right"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "var(--neon-green)",
                }}
              >
                {player.winRate}%
              </span>
              <span
                className="text-right"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--neon-cyan)",
                }}
              >
                {player.elo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
