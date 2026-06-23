"use client";

import { useEffect, useState } from "react";

export function SplashScreen() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 800);
    const t3 = setTimeout(() => setPhase(3), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[var(--bg-deep)] z-[100]">
      {/* Background glow */}
      <div
        className="absolute"
        style={{
          width: "min(500px, 90vw)",
          height: "min(500px, 90vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,245,255,0.12) 0%, rgba(168,85,247,0.06) 50%, transparent 70%)",
          filter: "blur(60px)",
          opacity: phase >= 1 ? 1 : 0,
          transition: "opacity 1s ease-out",
        }}
      />

      {/* Logo mark */}
      <div
        className="relative mb-6"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "scale(1)" : "scale(0.5)",
          transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <img
          src="/logo.png"
          alt="Yummi Logo"
          className="w-48 h-48 sm:w-64 sm:h-64 object-contain animate-float"
          style={{ filter: "drop-shadow(0 0 20px rgba(0,245,255,0.4))" }}
        />
      </div>

      {/* Tagline */}
      <p
        className="text-center"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "1rem",
          letterSpacing: "0.15em",
          color: "var(--text-secondary)",
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.5s ease-out",
        }}
      >
        PRECISION IS EVERYTHING
      </p>

      {/* Loading bar */}
      <div
        className="mt-12"
        style={{
          width: 200,
          height: 2,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 999,
          overflow: "hidden",
          opacity: phase >= 3 ? 1 : 0,
          transition: "opacity 0.5s ease-out",
        }}
      >
        <div
          style={{
            width: phase >= 3 ? "100%" : "0%",
            height: "100%",
            background:
              "linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))",
            borderRadius: 999,
            boxShadow: "0 0 10px rgba(0,245,255,0.5)",
            transition: "width 1.5s ease-in-out",
          }}
        />
      </div>
    </div>
  );
}
