"use client";

import { NeonButton } from "@/components/ui/NeonButton";

interface SettingsScreenProps {
  onBack: () => void;
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  return (
    <div className="min-h-screen pb-32 px-6 sm:px-8 pt-10 md:pt-14 max-w-5xl mx-auto w-full">
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
          Settings
        </h1>
      </header>

      <div className="space-y-6 animate-slide-up stagger-children">
        {/* Audio Settings */}
        <section className="glass-card p-6">
          <h2 className="font-['var(--font-heading)'] text-lg font-bold text-[var(--neon-cyan)] uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-[rgba(0,245,255,0.2)] pb-2">
            <span>🔊</span> Audio
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-['var(--font-heading)'] uppercase tracking-wider text-[var(--text-primary)]">Master Volume</label>
                <span className="text-[var(--neon-cyan)] font-bold">80%</span>
              </div>
              <input type="range" className="w-full accent-[var(--neon-cyan)] h-1 bg-[rgba(255,255,255,0.1)] rounded-full appearance-none outline-none" defaultValue="80" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-['var(--font-heading)'] uppercase tracking-wider text-[var(--text-primary)]">Effects Volume</label>
                <span className="text-[var(--neon-cyan)] font-bold">100%</span>
              </div>
              <input type="range" className="w-full accent-[var(--neon-cyan)] h-1 bg-[rgba(255,255,255,0.1)] rounded-full appearance-none outline-none" defaultValue="100" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-['var(--font-heading)'] uppercase tracking-wider text-[var(--text-primary)]">Music Volume</label>
                <span className="text-[var(--neon-cyan)] font-bold">40%</span>
              </div>
              <input type="range" className="w-full accent-[var(--neon-cyan)] h-1 bg-[rgba(255,255,255,0.1)] rounded-full appearance-none outline-none" defaultValue="40" />
            </div>
          </div>
        </section>

        {/* Gameplay Settings */}
        <section className="glass-card p-6">
          <h2 className="font-['var(--font-heading)'] text-lg font-bold text-[var(--neon-purple)] uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-[rgba(168,85,247,0.2)] pb-2">
            <span>🎮</span> Gameplay
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.02)] rounded-lg border border-[rgba(255,255,255,0.05)]">
              <div>
                <p className="font-['var(--font-heading)'] font-bold text-sm uppercase tracking-wider text-[var(--text-primary)] mb-1">Show Ping</p>
                <p className="text-xs text-[var(--text-muted)]">Display network latency in-game</p>
              </div>
              <div className="relative w-12 h-6 rounded-full bg-[var(--neon-green)] shadow-[0_0_10px_rgba(0,255,133,0.3)] cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white transition-transform" />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.02)] rounded-lg border border-[rgba(255,255,255,0.05)]">
              <div>
                <p className="font-['var(--font-heading)'] font-bold text-sm uppercase tracking-wider text-[var(--text-primary)] mb-1">Colorblind Mode</p>
                <p className="text-xs text-[var(--text-muted)]">Adjust UI colors for better visibility</p>
              </div>
              <div className="relative w-12 h-6 rounded-full bg-[rgba(255,255,255,0.1)] cursor-pointer border border-[rgba(255,255,255,0.2)]">
                <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-[var(--text-muted)] transition-transform" />
              </div>
            </div>
          </div>
        </section>

        {/* Account */}
        <section className="glass-card p-6">
          <h2 className="font-['var(--font-heading)'] text-lg font-bold text-[var(--neon-pink)] uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-[rgba(255,45,170,0.2)] pb-2">
            <span>👤</span> Account
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-['var(--font-heading)'] uppercase tracking-wider text-[var(--text-secondary)]">Linked Accounts</span>
              <span className="text-sm text-[var(--text-primary)] bg-[rgba(255,255,255,0.1)] px-3 py-1 rounded">Google</span>
            </div>
            
            <NeonButton variant="ghost" className="w-full mt-4 text-[var(--neon-red)] border-[rgba(255,59,59,0.3)] hover:border-[rgba(255,59,59,0.8)]">
              Sign Out
            </NeonButton>
          </div>
        </section>
      </div>
    </div>
  );
}
