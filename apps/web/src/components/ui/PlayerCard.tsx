"use client";

interface PlayerCardProps {
  id: string;
  name: string;
  team: number;
  status: "ready" | "playing" | "finished" | "disconnected";
  ping: number;
  score: number;
}

export function PlayerCard({
  name,
  team,
  status,
  ping,
  score,
}: PlayerCardProps) {
  const statusConfig = {
    ready: { label: "READY", cls: "status-ready" },
    playing: { label: "PLAYING", cls: "status-playing" },
    finished: { label: "FINISHED", cls: "status-finished" },
    disconnected: { label: "DC", cls: "status-disconnected" },
  };

  const s = statusConfig[status];

  return (
    <div
      className={`player-card ${
        team === 1 ? "player-card-team-1" : "player-card-team-2"
      }`}
    >
      {/* Avatar */}
      <div
        className="flex items-center justify-center rounded-full flex-shrink-0"
        style={{
          width: 36,
          height: 36,
          background:
            team === 1
              ? "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(59,130,246,0.15))"
              : "linear-gradient(135deg, rgba(255,45,170,0.15), rgba(168,85,247,0.15))",
          border: `1px solid ${
            team === 1
              ? "rgba(0,245,255,0.2)"
              : "rgba(255,45,170,0.2)"
          }`,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.7rem",
            fontWeight: 700,
            color:
              team === 1 ? "var(--neon-cyan)" : "var(--neon-pink)",
          }}
        >
          {name.charAt(0).toUpperCase()}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p
            className="text-sm truncate"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {name}
          </p>
          <span
            className={`ping-dot ${
              ping < 50
                ? "ping-good"
                : ping < 100
                ? "ping-medium"
                : "ping-bad"
            }`}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className={`status-badge ${s.cls}`} style={{ fontSize: "0.65rem", padding: "2px 8px" }}>
            {s.label}
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "var(--neon-cyan)",
            }}
          >
            {score}
          </span>
        </div>
      </div>
    </div>
  );
}
