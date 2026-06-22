"use client";

import { NeonButton } from "@/components/ui/NeonButton";
import { PlayerCard } from "@/components/ui/PlayerCard";

interface RoomScreenProps {
  onStart: () => void;
  onBack: () => void;
}

const MOCK_ROOM_PLAYERS = [
  { id: "1", name: "Timi", team: 1, status: "ready" as const, ping: 24, score: 0 },
  { id: "2", name: "CyberFox", team: 2, status: "ready" as const, ping: 48, score: 0 },
  { id: "3", name: "VoidRunner", team: 1, status: "ready" as const, ping: 15, score: 0 },
];

export function RoomScreen({ onStart, onBack }: RoomScreenProps) {
  return (
    <div className="min-h-screen pb-32 px-6 sm:px-8 pt-10 md:pt-14 max-w-5xl mx-auto w-full flex flex-col">
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
            ← LEAVE
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
            Lobby
          </h1>
        </div>
        <div className="glass-card px-4 py-2 flex items-center gap-3 border-[rgba(0,245,255,0.3)]">
          <span className="text-xs font-['var(--font-heading)'] text-[var(--text-muted)] uppercase tracking-widest">
            Room Code
          </span>
          <span className="font-['var(--font-display)'] text-xl font-bold tracking-widest text-[var(--neon-cyan)]">
            X7K9V2
          </span>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up">
        {/* Left Col: Settings */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="glass-card p-5">
            <h3 className="font-['var(--font-heading)'] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-4 border-b border-[rgba(255,255,255,0.05)] pb-2">
              Match Settings
            </h3>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1 block">Mode</label>
                <div className="glass-card px-3 py-2 text-sm text-[var(--neon-cyan)] font-bold border-[rgba(0,245,255,0.2)]">
                  🎯 TARGET
                </div>
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1 block">Format</label>
                <div className="glass-card px-3 py-2 text-sm">2v2</div>
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1 block">Rounds</label>
                <div className="glass-card px-3 py-2 text-sm">Best of 5</div>
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1 block">Target Range</label>
                <div className="glass-card px-3 py-2 text-sm text-[var(--neon-yellow)]">1.0s - 3.0s</div>
              </div>
            </div>
            
            <NeonButton variant="ghost" className="w-full mt-6" size="sm">
              Change Settings
            </NeonButton>
          </div>
        </div>

        {/* Right Col: Players & Teams */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team 1 */}
            <div className="glass-card p-4 border-[rgba(0,245,255,0.2)]">
              <h4 className="font-['var(--font-display)'] font-bold text-[var(--neon-cyan)] mb-3 text-center border-b border-[rgba(0,245,255,0.1)] pb-2">
                TEAM 1
              </h4>
              <div className="flex flex-col gap-2">
                {MOCK_ROOM_PLAYERS.filter(p => p.team === 1).map(player => (
                  <PlayerCard key={player.id} {...player} />
                ))}
                <button className="glass-card p-3 border-dashed border-[rgba(255,255,255,0.1)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[rgba(255,255,255,0.3)] transition-colors flex justify-center text-sm uppercase tracking-wider font-['var(--font-heading)']">
                  + Invite Player
                </button>
              </div>
            </div>

            {/* Team 2 */}
            <div className="glass-card p-4 border-[rgba(255,45,170,0.2)]">
              <h4 className="font-['var(--font-display)'] font-bold text-[var(--neon-pink)] mb-3 text-center border-b border-[rgba(255,45,170,0.1)] pb-2">
                TEAM 2
              </h4>
              <div className="flex flex-col gap-2">
                {MOCK_ROOM_PLAYERS.filter(p => p.team === 2).map(player => (
                  <PlayerCard key={player.id} {...player} />
                ))}
                <button className="glass-card p-3 border-dashed border-[rgba(255,255,255,0.1)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[rgba(255,255,255,0.3)] transition-colors flex justify-center text-sm uppercase tracking-wider font-['var(--font-heading)']">
                  + Invite Player
                </button>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 flex justify-end">
            <NeonButton variant="green" size="lg" className="w-full md:w-auto min-w-[240px]" onClick={onStart}>
              START MATCH (3/4 READY)
            </NeonButton>
          </div>
        </div>
      </div>
    </div>
  );
}
