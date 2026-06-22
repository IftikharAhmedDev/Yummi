"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { NeonButton } from "@/components/ui/NeonButton";
import { PlayerCard } from "@/components/ui/PlayerCard";

type GamePhase =
  | "waiting"
  | "countdown"
  | "active"
  | "signal_wait"
  | "signal_react"
  | "stopped"
  | "results";

type GameMode = "target" | "reaction" | "precision" | "blind_target";

interface GameScreenProps {
  onEnd: () => void;
  onBack: () => void;
}

const MOCK_PLAYERS = [
  {
    id: "1",
    name: "NeonBlade",
    team: 1,
    status: "playing" as const,
    ping: 24,
    score: 320,
  },
  {
    id: "2",
    name: "CyberFox",
    team: 2,
    status: "playing" as const,
    ping: 48,
    score: 290,
  },
  {
    id: "3",
    name: "VoidRunner",
    team: 1,
    status: "ready" as const,
    ping: 15,
    score: 310,
  },
  {
    id: "4",
    name: "GlitchWave",
    team: 2,
    status: "finished" as const,
    ping: 92,
    score: 275,
  },
];

export function GameScreen({ onEnd, onBack }: GameScreenProps) {
  const [phase, setPhase] = useState<GamePhase>("waiting");
  const [mode] = useState<GameMode>("blind_target"); // Defaulting to blind_target for demo
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);
  const [timerValue, setTimerValue] = useState(0);
  const [targetValue] = useState(2.0);
  const [countdown, setCountdown] = useState(3);
  const [difference, setDifference] = useState<number | null>(null);
  const [reactionSignal, setReactionSignal] = useState(false);
  const [precisionWindow] = useState({ start: 1.8, end: 2.2 });
  const [ping] = useState(24);
  const [events, setEvents] = useState<string[]>([]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const addEvent = useCallback((msg: string) => {
    setEvents((prev) => [msg, ...prev].slice(0, 8));
  }, []);

  const startCountdown = useCallback(() => {
    setPhase("countdown");
    setCountdown(3);
    setDifference(null);
    setTimerValue(0);

    let count = 3;
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(interval);
        // Start game based on mode
        if (mode === "reaction") {
          setPhase("signal_wait");
          addEvent("⏳ Waiting for signal...");
          // Random delay 1-5 seconds
          const delay = 1000 + Math.random() * 4000;
          setTimeout(() => {
            setReactionSignal(true);
            setPhase("signal_react");
            startTimeRef.current = performance.now();
            addEvent("⚡ REACT NOW!");
            // Start timer for visual
            setTimerValue(0);
            timerRef.current = setInterval(() => {
              setTimerValue(
                (performance.now() - startTimeRef.current) / 1000
              );
            }, 10);
          }, delay);
        } else {
          // Target & Precision modes
          setPhase("active");
          startTimeRef.current = performance.now();
          addEvent("🟢 Timer started!");
          timerRef.current = setInterval(() => {
            setTimerValue(
              (performance.now() - startTimeRef.current) / 1000
            );
          }, 10);
        }
      }
    }, 1000);
  }, [mode, addEvent]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const finalTime =
      (performance.now() - startTimeRef.current) / 1000;
    setTimerValue(finalTime);

    if (mode === "target" || mode === "blind_target") {
      const diff = Math.abs(finalTime - targetValue) * 1000;
      setDifference(diff);
      addEvent(
        `👁️ Stopped at ${finalTime.toFixed(3)}s (${diff.toFixed(1)}ms off)`
      );
    } else if (mode === "reaction") {
      const reactionMs = finalTime * 1000;
      setDifference(reactionMs);
      setReactionSignal(false);
      addEvent(`⚡ Reaction: ${reactionMs.toFixed(1)}ms`);
    } else {
      const inWindow =
        finalTime >= precisionWindow.start &&
        finalTime <= precisionWindow.end;
      const center =
        (precisionWindow.start + precisionWindow.end) / 2;
      const diff = Math.abs(finalTime - center) * 1000;
      setDifference(diff);
      addEvent(
        inWindow
          ? `💎 In window! ${diff.toFixed(1)}ms from center`
          : `❌ Outside window by ${diff.toFixed(1)}ms`
      );
    }

    setPhase("stopped");

    // Auto advance to next round
    setTimeout(() => {
      if (round < totalRounds) {
        setRound((r) => r + 1);
        setPhase("waiting");
        addEvent(`📋 Round ${round + 1} of ${totalRounds}`);
      } else {
        addEvent("🏁 Match complete!");
        setTimeout(onEnd, 1500);
      }
    }, 2500);
  }, [
    mode,
    targetValue,
    precisionWindow,
    round,
    totalRounds,
    onEnd,
    addEvent,
  ]);

  // Determine timer CSS class
  const getTimerClass = () => {
    if (phase === "stopped" && difference !== null && difference < 30)
      return "timer-win";
    if (phase === "stopped") return "timer-loss";
    if (phase === "signal_react") return "timer-critical";
    if (phase === "active" || phase === "signal_react")
      return "timer-active";
    return "timer-idle";
  };

  const getBackdropClass = () => {
    if (phase === "stopped" && difference !== null && difference < 30)
      return "timer-backdrop-win";
    if (phase === "signal_react") return "timer-backdrop-critical";
    if (phase === "active") return "timer-backdrop-active";
    return "timer-backdrop-idle";
  };

  const formatTimer = (val: number) => {
    const seconds = Math.floor(val);
    const ms = Math.floor((val - seconds) * 1000);
    return `${seconds}.${ms.toString().padStart(3, "0")}`;
  };

  return (
    <div className="hud-container relative">
      {/* ── Header Bar ── */}
      <div className="hud-header flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            id="game-back"
            onClick={onBack}
            className="glass-card px-3 py-2 text-sm cursor-pointer"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-secondary)",
            }}
          >
            ✕
          </button>
          <div>
            <span
              className="status-badge"
              style={{
                color:
                  mode === "target"
                    ? "var(--neon-cyan)"
                    : mode === "reaction"
                    ? "var(--neon-pink)"
                    : "var(--neon-purple)",
                borderColor:
                  mode === "target"
                    ? "rgba(0,245,255,0.3)"
                    : mode === "reaction"
                    ? "rgba(255,45,170,0.3)"
                    : "rgba(168,85,247,0.3)",
                background:
                  mode === "target"
                    ? "rgba(0,245,255,0.08)"
                    : mode === "reaction"
                    ? "rgba(255,45,170,0.08)"
                    : "rgba(168,85,247,0.08)",
              }}
            >
              {mode === "target"
                ? "🎯 TARGET"
                : mode === "blind_target"
                ? "👁️‍🗨️ BLIND TARGET"
                : mode === "reaction"
                ? "⚡ REACTION"
                : "💎 PRECISION"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Round indicator */}
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: "var(--text-secondary)",
            }}
          >
            ROUND{" "}
            <span style={{ color: "var(--neon-cyan)" }}>
              {round}
            </span>
            /{totalRounds}
          </div>

          {/* Connection / Ping */}
          <div className="connection-bar">
            <span
              className={`ping-dot ${
                ping < 50
                  ? "ping-good"
                  : ping < 100
                  ? "ping-medium"
                  : "ping-bad"
              }`}
            />
            <span style={{ color: "var(--text-secondary)" }}>
              {ping}ms
            </span>
          </div>
        </div>
      </div>

      {/* ── Left Panel: Players ── */}
      <div className="hud-left flex flex-col gap-2 py-4 overflow-y-auto">
        <h3
          className="mb-2"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Players
        </h3>
        {MOCK_PLAYERS.map((player) => (
          <PlayerCard key={player.id} {...player} />
        ))}
      </div>

      {/* ── Center: Timer & Game Area ── */}
      <div className="hud-center flex flex-col items-center justify-center relative">
        {/* Countdown overlay */}
        {phase === "countdown" && (
          <div className="countdown-overlay">
            <div className="countdown-number">{countdown}</div>
          </div>
        )}

        {/* Reaction signal overlay */}
        {phase === "signal_wait" && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <p
              className="animate-float"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.5rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "var(--text-secondary)",
              }}
            >
              WAIT FOR SIGNAL...
            </p>
          </div>
        )}

        {reactionSignal && phase === "signal_react" && (
          <div
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,59,59,0.1), transparent 60%)",
            }}
          >
            <p
              className="animate-shake"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 6vw, 3rem)",
                fontWeight: 900,
                color: "var(--neon-red)",
                textShadow:
                  "0 0 20px rgba(255,59,59,0.6), 0 0 40px rgba(255,59,59,0.3)",
                letterSpacing: "0.15em",
              }}
            >
              REACT!
            </p>
          </div>
        )}

        {/* Target display */}
        {(mode === "target" || mode === "blind_target") && (
          <div className="mb-6">
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Target Time
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                fontWeight: 700,
                color: "var(--neon-yellow)",
                textShadow: "0 0 15px rgba(255,215,0,0.3)",
                textAlign: "center",
              }}
            >
              {targetValue.toFixed(3)}s
            </p>
          </div>
        )}

        {/* Precision window display */}
        {mode === "precision" && (
          <div className="mb-6">
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Precision Window
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                fontWeight: 700,
                color: "var(--neon-purple)",
                textShadow: "0 0 15px rgba(168,85,247,0.3)",
                textAlign: "center",
              }}
            >
              {precisionWindow.start.toFixed(3)}s –{" "}
              {precisionWindow.end.toFixed(3)}s
            </p>
          </div>
        )}

        {/* Timer backdrop glow */}
        <div
          className={`timer-backdrop ${getBackdropClass()}`}
          style={{ left: "50%", transform: "translateX(-50%)" }}
        />

        {/* Main Timer */}
        <div
          className={`timer-display ${getTimerClass()}`}
          style={{
            fontSize: "clamp(3.5rem, 12vw, 7rem)",
          }}
        >
          {mode === "blind_target" && phase === "active" ? (
            <span className="opacity-30 animate-pulse" style={{ color: "var(--text-muted)", textShadow: "none" }}>?.???</span>
          ) : (
            formatTimer(timerValue)
          )}
        </div>

        {/* Difference display */}
        {phase === "stopped" && difference !== null && (
          <div className="mt-6 animate-scale-in">
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              {mode === "reaction" ? "Reaction Time" : "Difference"}
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: 800,
                color:
                  difference < 30
                    ? "var(--neon-green)"
                    : difference < 100
                    ? "var(--neon-yellow)"
                    : "var(--neon-red)",
                textShadow:
                  difference < 30
                    ? "0 0 20px rgba(0,255,133,0.4)"
                    : difference < 100
                    ? "0 0 20px rgba(255,215,0,0.3)"
                    : "0 0 20px rgba(255,59,59,0.3)",
                textAlign: "center",
              }}
            >
              {difference.toFixed(1)}ms
            </p>
            {difference < 10 && (
              <p
                className="mt-2 text-center animate-neon-flicker"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "var(--neon-green)",
                  textShadow: "0 0 15px rgba(0,255,133,0.5)",
                }}
              >
                ★ PERFECT ★
              </p>
            )}
          </div>
        )}

        {/* Precision progress bar */}
        {mode === "precision" && (phase === "active" || phase === "stopped") && (
          <div className="w-full max-w-md mt-8 px-4">
            <div
              className="relative h-2 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              {/* Window zone */}
              <div
                className="absolute h-full"
                style={{
                  left: `${(precisionWindow.start / 5) * 100}%`,
                  width: `${
                    ((precisionWindow.end - precisionWindow.start) / 5) *
                    100
                  }%`,
                  background: "rgba(168,85,247,0.3)",
                  borderRadius: "inherit",
                }}
              />
              {/* Current position */}
              <div
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  left: `${Math.min((timerValue / 5) * 100, 100)}%`,
                  width: 4,
                  height: 16,
                  borderRadius: 2,
                  background: "var(--neon-cyan)",
                  boxShadow: "0 0 10px rgba(0,245,255,0.5)",
                  transition: "left 0.05s linear",
                }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md px-4">
          {phase === "waiting" && (
            <NeonButton
              id="btn-start"
              variant="green"
              size="lg"
              className="flex-1"
              onClick={startCountdown}
            >
              ▶ START ROUND
            </NeonButton>
          )}

          {(phase === "active" || phase === "signal_react") && (
            <NeonButton
              id="btn-stop"
              variant="pink"
              size="lg"
              className="flex-1"
              onClick={stopTimer}
            >
              ■ STOP
            </NeonButton>
          )}

          {phase === "signal_wait" && (
            <div className="flex-1 text-center">
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.05em",
                }}
              >
                Do not press yet...
              </p>
            </div>
          )}

          {phase === "stopped" && (
            <div className="flex-1 text-center">
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  letterSpacing: "0.05em",
                }}
              >
                {round < totalRounds
                  ? "Next round starting..."
                  : "Finalizing results..."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Right Panel: Event Feed ── */}
      <div className="hud-right flex flex-col gap-2 py-4 overflow-y-auto">
        <h3
          className="mb-2"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Live Events
        </h3>
        <div className="flex flex-col gap-1.5 stagger-children">
          {events.length === 0 ? (
            <p
              className="text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              Waiting for game to start...
            </p>
          ) : (
            events.map((event, i) => (
              <div
                key={`${event}-${i}`}
                className="glass-card px-3 py-2 animate-slide-up"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {event}
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Footer: Mobile action area ── */}
      <div className="hud-footer flex items-center justify-between">
        {/* Mobile players toggle */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2">
          {MOCK_PLAYERS.map((p) => (
            <div
              key={p.id}
              className="glass-card px-3 py-1.5 flex items-center gap-2 flex-shrink-0"
              style={{ fontSize: "0.75rem" }}
            >
              <span
                className={`ping-dot ${
                  p.ping < 50
                    ? "ping-good"
                    : p.ping < 100
                    ? "ping-medium"
                    : "ping-bad"
                }`}
              />
              <span style={{ color: "var(--text-secondary)" }}>
                {p.name}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  color: "var(--neon-cyan)",
                }}
              >
                {p.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
