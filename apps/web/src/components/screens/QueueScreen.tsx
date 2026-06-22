"use client";

import { useState, useEffect } from "react";
import { NeonButton } from "@/components/ui/NeonButton";

interface QueueScreenProps {
  onMatchFound: () => void;
  onCancel: () => void;
}

export function QueueScreen({ onMatchFound, onCancel }: QueueScreenProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [matchFound, setMatchFound] = useState(false);
  const estimatedTime = 45; // seconds

  useEffect(() => {
    if (matchFound) return;
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [matchFound]);

  // Simulate finding a match after 5 seconds for demo
  useEffect(() => {
    const timer = setTimeout(() => {
      setMatchFound(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background effects */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
          matchFound ? "bg-[rgba(0,245,255,0.05)]" : "bg-transparent"
        }`}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
        style={{
          width: matchFound ? 800 : 400,
          height: matchFound ? 800 : 400,
          borderRadius: "50%",
          background: matchFound
            ? "radial-gradient(circle, rgba(0,245,255,0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center text-center animate-scale-in">
        {!matchFound ? (
          <>
            <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
              {/* Spinning rings */}
              <div className="absolute inset-0 rounded-full border-2 border-[rgba(168,85,247,0.2)] border-t-[var(--neon-purple)] animate-[spin_3s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border-2 border-[rgba(0,245,255,0.2)] border-b-[var(--neon-cyan)] animate-[spin_2s_linear_infinite_reverse]" />
              <div className="absolute inset-8 rounded-full bg-[rgba(255,255,255,0.02)] backdrop-blur-sm border border-[rgba(255,255,255,0.05)] flex items-center justify-center">
                <span className="text-4xl">⏱</span>
              </div>
            </div>

            <h2
              className="mb-2"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.5rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text-primary)",
              }}
            >
              Searching for Match
            </h2>
            <p className="text-[var(--neon-cyan)] font-['var(--font-heading)'] uppercase tracking-widest font-bold mb-8">
              Target • 1v1
            </p>

            <div className="flex gap-8 mb-12">
              <div>
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest font-['var(--font-heading)'] mb-1">
                  Elapsed
                </p>
                <p className="font-['var(--font-display)'] text-2xl font-bold">
                  {formatTime(elapsedTime)}
                </p>
              </div>
              <div>
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest font-['var(--font-heading)'] mb-1">
                  Estimated
                </p>
                <p className="font-['var(--font-display)'] text-2xl font-bold text-[var(--text-secondary)]">
                  {formatTime(estimatedTime)}
                </p>
              </div>
            </div>

            <NeonButton variant="pink" onClick={onCancel} className="min-w-[200px]">
              Cancel Matchmaking
            </NeonButton>
          </>
        ) : (
          <>
            <div className="relative w-48 h-48 mb-8 flex items-center justify-center animate-[scale-in_0.5s_cubic-bezier(0.34,1.56,0.64,1)]">
              <div className="absolute inset-0 rounded-full bg-[var(--neon-cyan)] blur-[40px] opacity-30 animate-pulse" />
              <div className="absolute inset-0 rounded-full border-4 border-[var(--neon-cyan)] shadow-[0_0_30px_rgba(0,245,255,0.5)]" />
              <div className="absolute inset-4 rounded-full bg-[rgba(0,245,255,0.1)] backdrop-blur-md flex items-center justify-center">
                <span className="text-5xl drop-shadow-[0_0_15px_rgba(0,245,255,0.8)]">⚔️</span>
              </div>
            </div>

            <h2
              className="mb-2"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.5rem",
                fontWeight: 900,
                letterSpacing: "0.1em",
                color: "var(--neon-cyan)",
                textShadow: "0 0 20px rgba(0,245,255,0.5)",
              }}
            >
              MATCH FOUND
            </h2>
            <p className="text-[var(--text-primary)] font-['var(--font-heading)'] uppercase tracking-widest mb-12 animate-pulse">
              Get Ready Commander
            </p>

            <NeonButton variant="cyan" size="lg" onClick={onMatchFound} className="min-w-[240px] animate-bounce">
              ACCEPT
            </NeonButton>
          </>
        )}
      </div>
    </div>
  );
}
