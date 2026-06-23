"use client";

import { NeonButton } from "@/components/ui/NeonButton";

interface ProfileUser {
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

interface ProfileScreenProps {
  user: ProfileUser;
  onBack: () => void;
}

export function ProfileScreen({ user, onBack }: ProfileScreenProps) {
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
          Commander Profile
        </h1>
      </header>

      <div className="glass-card-elevated p-6 mb-6 animate-slide-up flex flex-col md:flex-row items-center gap-6">
        <div
          className="relative flex items-center justify-center rounded-full flex-shrink-0"
          style={{
            width: 120,
            height: 120,
            background:
              "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(168,85,247,0.15))",
            border: "2px solid rgba(0,245,255,0.4)",
            boxShadow: "0 0 30px rgba(0,245,255,0.2)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "3rem",
              fontWeight: 700,
              color: "var(--neon-cyan)",
            }}
          >
            {user.displayName.charAt(0)}
          </span>
          <div
            className="absolute -bottom-2 bg-[var(--bg-card)] px-3 py-1 rounded-full border border-[rgba(0,245,255,0.4)]"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "var(--neon-cyan)",
            }}
          >
            LVL {user.level}
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "4px",
            }}
          >
            {user.displayName}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.9rem",
              letterSpacing: "0.1em",
              color: "var(--text-secondary)",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Global Rank: <span style={{ color: "var(--neon-yellow)" }}>#4,281</span>
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="glass-card px-4 py-2 text-center">
              <p className="text-xs text-[var(--text-muted)] font-['var(--font-heading)'] uppercase mb-1">
                ELO Rating
              </p>
              <p className="font-['var(--font-display)'] text-xl text-[var(--neon-cyan)] font-bold">
                {user.eloRating}
              </p>
            </div>
            <div className="glass-card px-4 py-2 text-center">
              <p className="text-xs text-[var(--text-muted)] font-['var(--font-heading)'] uppercase mb-1">
                Win Rate
              </p>
              <p className="font-['var(--font-display)'] text-xl text-[var(--neon-green)] font-bold">
                {user.winRate}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="mb-4 font-['var(--font-heading)'] text-[var(--text-secondary)] uppercase tracking-widest font-bold">
        Performance Stats
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 stagger-children">
        <div className="glass-card p-4 animate-slide-up text-center">
          <p className="text-xs text-[var(--text-muted)] font-['var(--font-heading)'] uppercase mb-1">Matches</p>
          <p className="font-['var(--font-display)'] text-xl font-bold">{user.wins + user.losses}</p>
        </div>
        <div className="glass-card p-4 animate-slide-up text-center">
          <p className="text-xs text-[var(--text-muted)] font-['var(--font-heading)'] uppercase mb-1">Wins</p>
          <p className="font-['var(--font-display)'] text-xl font-bold text-[var(--neon-green)]">{user.wins}</p>
        </div>
        <div className="glass-card p-4 animate-slide-up text-center">
          <p className="text-xs text-[var(--text-muted)] font-['var(--font-heading)'] uppercase mb-1">Losses</p>
          <p className="font-['var(--font-display)'] text-xl font-bold text-[var(--neon-red)]">{user.losses}</p>
        </div>
        <div className="glass-card p-4 animate-slide-up text-center">
          <p className="text-xs text-[var(--text-muted)] font-['var(--font-heading)'] uppercase mb-1">Best Reaction</p>
          <p className="font-['var(--font-display)'] text-xl font-bold text-[var(--neon-pink)]">{user.bestReaction}ms</p>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <NeonButton variant="ghost" className="w-full sm:w-auto" onClick={() => {}}>
          Edit Profile
        </NeonButton>
      </div>
    </div>
  );
}
