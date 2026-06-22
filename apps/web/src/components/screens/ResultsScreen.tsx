"use client";

import { NeonButton } from "@/components/ui/NeonButton";

interface ResultsScreenProps {
  onPlayAgain: () => void;
  onHome: () => void;
}

const MOCK_RESULTS = [
  {
    rank: 1,
    name: "Timi",
    score: 480,
    avgDiff: 12.4,
    bestRound: 3.2,
    eloChange: +24,
    isYou: true,
  },
  {
    rank: 2,
    name: "CyberFox",
    score: 420,
    avgDiff: 18.7,
    bestRound: 8.1,
    eloChange: -12,
    isYou: false,
  },
  {
    rank: 3,
    name: "VoidRunner",
    score: 385,
    avgDiff: 24.1,
    bestRound: 15.3,
    eloChange: -8,
    isYou: false,
  },
  {
    rank: 4,
    name: "GlitchWave",
    score: 340,
    avgDiff: 32.6,
    bestRound: 19.8,
    eloChange: -16,
    isYou: false,
  },
];

export function ResultsScreen({ onPlayAgain, onHome }: ResultsScreenProps) {
  const winner = MOCK_RESULTS[0];
  const youWon = winner.isYou;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: youWon
            ? "radial-gradient(circle at center 30%, rgba(0,255,133,0.08) 0%, transparent 60%)"
            : "radial-gradient(circle at center 30%, rgba(255,59,59,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Result Header */}
      <div className="text-center mb-8 animate-scale-in">
        <p
          className="mb-2"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.9rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
          }}
        >
          Match Complete
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 8vw, 4rem)",
            fontWeight: 900,
            letterSpacing: "0.08em",
            color: youWon ? "var(--neon-green)" : "var(--neon-red)",
            textShadow: youWon
              ? "0 0 30px rgba(0,255,133,0.4), 0 0 60px rgba(0,255,133,0.15)"
              : "0 0 20px rgba(255,59,59,0.3)",
          }}
        >
          {youWon ? "VICTORY" : "DEFEAT"}
        </h1>
      </div>

      {/* ELO Change */}
      <div className="mb-8 animate-slide-up" style={{ animationDelay: "200ms", animationFillMode: "backwards" }}>
        <div className="glass-card-elevated px-8 py-4 text-center">
          <p
            className="text-xs mb-1"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            ELO Change
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              fontWeight: 800,
              color:
                (winner.isYou ? winner.eloChange : MOCK_RESULTS.find(r => r.isYou)?.eloChange ?? 0) > 0
                  ? "var(--neon-green)"
                  : "var(--neon-red)",
            }}
          >
            {(winner.isYou ? winner.eloChange : MOCK_RESULTS.find(r => r.isYou)?.eloChange ?? 0) > 0
              ? "+"
              : ""}
            {winner.isYou ? winner.eloChange : MOCK_RESULTS.find(r => r.isYou)?.eloChange ?? 0}
          </p>
        </div>
      </div>

      {/* Results Table */}
      <div
        className="w-full max-w-xl glass-card-elevated overflow-hidden mb-8 animate-slide-up"
        style={{ animationDelay: "350ms", animationFillMode: "backwards" }}
      >
        {/* Header row */}
        <div
          className="grid gap-4 px-6 py-3"
          style={{
            gridTemplateColumns: "50px 1fr 80px 80px 70px",
            fontFamily: "var(--font-heading)",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <span>Rank</span>
          <span>Player</span>
          <span className="text-right">Score</span>
          <span className="text-right">Avg Diff</span>
          <span className="text-right">ELO</span>
        </div>

        {/* Player rows */}
        {MOCK_RESULTS.map((player) => (
          <div
            key={player.rank}
            className="grid gap-4 px-6 py-4 transition-colors"
            style={{
              gridTemplateColumns: "50px 1fr 80px 80px 70px",
              alignItems: "center",
              background: player.isYou
                ? "rgba(0,245,255,0.03)"
                : "transparent",
              borderBottom: "1px solid rgba(255,255,255,0.02)",
              borderLeft: player.isYou
                ? "2px solid var(--neon-cyan)"
                : "2px solid transparent",
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
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                color: player.isYou
                  ? "var(--neon-cyan)"
                  : "var(--text-primary)",
              }}
            >
              {player.name}
              {player.isYou && (
                <span
                  className="ml-2 text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  (YOU)
                </span>
              )}
            </span>
            <span
              className="text-right"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {player.score}
            </span>
            <span
              className="text-right"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.85rem",
                fontWeight: 600,
                color:
                  player.avgDiff < 15
                    ? "var(--neon-green)"
                    : player.avgDiff < 25
                    ? "var(--neon-yellow)"
                    : "var(--text-secondary)",
              }}
            >
              {player.avgDiff}ms
            </span>
            <span
              className="text-right"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.85rem",
                fontWeight: 700,
                color:
                  player.eloChange > 0
                    ? "var(--neon-green)"
                    : "var(--neon-red)",
              }}
            >
              {player.eloChange > 0 ? "+" : ""}
              {player.eloChange}
            </span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div
        className="flex flex-col sm:flex-row gap-4 w-full max-w-md animate-slide-up"
        style={{ animationDelay: "500ms", animationFillMode: "backwards" }}
      >
        <NeonButton
          id="btn-rematch"
          variant="green"
          size="lg"
          className="flex-1"
          onClick={onPlayAgain}
        >
          ⚡ Play Again
        </NeonButton>
        <NeonButton
          id="btn-home"
          variant="ghost"
          size="lg"
          className="flex-1"
          onClick={onHome}
        >
          Return Home
        </NeonButton>
      </div>
    </div>
  );
}
