"use client";

interface HistoryScreenProps {
  onBack: () => void;
}

const MOCK_HISTORY = [
  { id: "1", date: "2 hrs ago", mode: "TARGET", format: "1v1", result: "VICTORY", eloChange: "+24", accuracy: "12.4ms" },
  { id: "2", date: "5 hrs ago", mode: "REACTION", format: "4v4", result: "DEFEAT", eloChange: "-12", accuracy: "245ms" },
  { id: "3", date: "1 day ago", mode: "PRECISION", format: "2v2", result: "VICTORY", eloChange: "+18", accuracy: "18.1ms" },
  { id: "4", date: "2 days ago", mode: "TARGET", format: "1v1", result: "VICTORY", eloChange: "+22", accuracy: "9.8ms" },
  { id: "5", date: "2 days ago", mode: "TARGET", format: "1v1", result: "DEFEAT", eloChange: "-16", accuracy: "34.2ms" },
];

export function HistoryScreen({ onBack }: HistoryScreenProps) {
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
          Match History
        </h1>
      </header>

      <div className="flex flex-col gap-3 animate-slide-up stagger-children">
        {MOCK_HISTORY.map((match) => (
          <div
            key={match.id}
            className="glass-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 transition-transform hover:translate-x-1"
            style={{
              borderLeftColor: match.result === "VICTORY" ? "var(--neon-green)" : "var(--neon-red)"
            }}
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className={`font-['var(--font-display)'] text-xl font-bold ${match.result === "VICTORY" ? "text-[var(--neon-green)]" : "text-[var(--neon-red)]"}`}>
                  {match.result}
                </span>
                <span className="text-xs text-[var(--text-muted)]">{match.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-['var(--font-heading)'] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                <span className={match.mode === "TARGET" ? "text-[var(--neon-cyan)]" : match.mode === "REACTION" ? "text-[var(--neon-pink)]" : "text-[var(--neon-purple)]"}>
                  {match.mode}
                </span>
                <span>•</span>
                <span>{match.format}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 md:justify-end border-t border-[rgba(255,255,255,0.05)] pt-3 md:border-0 md:pt-0">
              <div className="flex flex-col items-start md:items-end">
                <span className="text-xs text-[var(--text-muted)] font-['var(--font-heading)'] uppercase tracking-widest">Accuracy</span>
                <span className="font-['var(--font-display)'] font-bold text-[var(--text-primary)]">{match.accuracy}</span>
              </div>
              
              <div className="flex flex-col items-start md:items-end">
                <span className="text-xs text-[var(--text-muted)] font-['var(--font-heading)'] uppercase tracking-widest">ELO</span>
                <span className={`font-['var(--font-display)'] font-bold text-lg ${match.eloChange.startsWith("+") ? "text-[var(--neon-green)]" : "text-[var(--neon-red)]"}`}>
                  {match.eloChange}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button className="text-sm font-['var(--font-heading)'] text-[var(--neon-cyan)] uppercase tracking-widest hover:text-white transition-colors">
          Load More Matches ↓
        </button>
      </div>
    </div>
  );
}
