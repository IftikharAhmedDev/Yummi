"use client";

import { NeonButton } from "@/components/ui/NeonButton";

interface FriendsScreenProps {
  onBack: () => void;
  onInvite: () => void;
}

const MOCK_FRIENDS = [
  { id: "1", name: "CyberFox", status: "online", statusText: "In Menu", ping: 25 },
  { id: "2", name: "GlitchWave", status: "playing", statusText: "Playing 1v1 Target", ping: 42 },
  { id: "3", name: "VoidRunner", status: "offline", statusText: "Last seen 2h ago", ping: 0 },
  { id: "4", name: "ZeroCool", status: "online", statusText: "In Queue", ping: 18 },
];

export function FriendsScreen({ onBack, onInvite }: FriendsScreenProps) {
  return (
    <div className="min-h-screen pb-32 px-6 sm:px-8 pt-10 md:pt-14 max-w-5xl mx-auto w-full">
      <header className="flex items-center justify-between mb-8 animate-slide-down">
        <div className="flex items-center gap-4">
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
            Friends
          </h1>
        </div>
        <NeonButton variant="cyan" size="sm">
          Add Friend
        </NeonButton>
      </header>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {["All", "Online", "Requests (2)"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full font-['var(--font-heading)'] text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
              i === 0
                ? "bg-[rgba(168,85,247,0.15)] text-[var(--neon-purple)] border border-[rgba(168,85,247,0.4)] shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                : "bg-[var(--glass-bg)] text-[var(--text-secondary)] border border-[var(--glass-border)] hover:text-[var(--text-primary)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-3 animate-slide-up stagger-children">
        {MOCK_FRIENDS.map((friend) => (
          <div
            key={friend.id}
            className="glass-card p-4 flex items-center justify-between transition-colors hover:bg-[rgba(255,255,255,0.03)]"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center relative"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span className="font-['var(--font-display)'] font-bold">
                  {friend.name.charAt(0)}
                </span>
                {/* Status indicator dot */}
                <span
                  className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[var(--bg-card)]"
                  style={{
                    background:
                      friend.status === "online"
                        ? "var(--neon-green)"
                        : friend.status === "playing"
                        ? "var(--neon-blue)"
                        : "var(--text-muted)",
                    boxShadow:
                      friend.status === "online"
                        ? "0 0 8px rgba(0,255,133,0.6)"
                        : friend.status === "playing"
                        ? "0 0 8px rgba(59,130,246,0.6)"
                        : "none",
                  }}
                />
              </div>
              
              <div>
                <h3 className="font-['var(--font-heading)'] font-bold text-[var(--text-primary)]">
                  {friend.name}
                </h3>
                <p className="text-xs font-['var(--font-heading)'] text-[var(--text-secondary)] mt-0.5">
                  {friend.statusText}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {friend.status !== "offline" && (
                <div className="hidden sm:flex items-center gap-1.5 mr-2">
                  <span
                    className={`ping-dot ${
                      friend.ping < 50
                        ? "ping-good"
                        : friend.ping < 100
                        ? "ping-medium"
                        : "ping-bad"
                    }`}
                  />
                  <span className="text-xs text-[var(--text-muted)] font-bold">{friend.ping}ms</span>
                </div>
              )}
              <NeonButton
                variant="ghost"
                size="sm"
                onClick={onInvite}
                disabled={friend.status === "offline"}
              >
                Invite
              </NeonButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
