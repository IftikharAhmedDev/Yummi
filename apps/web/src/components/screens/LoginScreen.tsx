"use client";

import { useState, useCallback } from "react";
import { NeonButton } from "@/components/ui/NeonButton";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [method, setMethod] = useState<"select" | "email" | "otp">("select");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleGuestLogin = useCallback(() => {
    onLogin();
  }, [onLogin]);

  const handleEmailSubmit = useCallback(() => {
    setMethod("otp");
  }, []);

  const handleOtpSubmit = useCallback(() => {
    onLogin();
  }, [onLogin]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background effects */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,245,255,0.06) 0%, rgba(168,85,247,0.04) 40%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px]"
        style={{
          background:
            "linear-gradient(to top, rgba(168,85,247,0.03), transparent)",
          pointerEvents: "none",
        }}
      />

      <div className="animate-scale-in mb-8 text-center">
        <h1
          className="yummi-title"
          data-text="YUMMI"
          style={{
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            letterSpacing: "0.15em",
          }}
        >
          YUMMI
        </h1>
      </div>

      {/* Login Card */}
      <div
        className="glass-card-elevated w-full max-w-md p-8 animate-slide-up"
        style={{ animationDelay: "150ms", animationFillMode: "backwards" }}
      >
        {method === "select" && (
          <div className="flex flex-col gap-4">
            <h2
              className="text-center mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              Welcome, Commander
            </h2>
            <p
              className="text-center mb-6"
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
              }}
            >
              Choose how you want to enter the arena
            </p>

            {/* Google Login */}
            <NeonButton
              id="login-google"
              variant="cyan"
              className="w-full"
              onClick={onLogin}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </NeonButton>

            {/* Email Login */}
            <NeonButton
              id="login-email"
              variant="purple"
              className="w-full"
              onClick={() => setMethod("email")}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              Sign in with Email
            </NeonButton>

            {/* Divider */}
            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-white/5" />
              <span
                className="text-xs uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                or
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Guest Login */}
            <NeonButton
              id="login-guest"
              variant="ghost"
              className="w-full"
              onClick={handleGuestLogin}
            >
              Play as Guest
            </NeonButton>

            <p
              className="text-center mt-4 text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              Guest accounts are temporary. Link an account to save your
              progress.
            </p>
          </div>
        )}

        {method === "email" && (
          <div className="flex flex-col gap-4 animate-slide-up">
            <button
              onClick={() => setMethod("select")}
              className="self-start text-sm flex items-center gap-1 mb-2"
              style={{ color: "var(--text-secondary)" }}
            >
              ← Back
            </button>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.3rem",
                fontWeight: 700,
              }}
            >
              Enter your email
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
              We&apos;ll send you a one-time verification code
            </p>
            <input
              id="email-input"
              type="email"
              placeholder="commander@example.com"
              className="neon-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <NeonButton
              id="email-submit"
              variant="cyan"
              className="w-full"
              onClick={handleEmailSubmit}
              disabled={!email.includes("@")}
            >
              Send Code
            </NeonButton>
          </div>
        )}

        {method === "otp" && (
          <div className="flex flex-col gap-4 animate-slide-up">
            <button
              onClick={() => setMethod("email")}
              className="self-start text-sm flex items-center gap-1 mb-2"
              style={{ color: "var(--text-secondary)" }}
            >
              ← Back
            </button>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.3rem",
                fontWeight: 700,
              }}
            >
              Enter verification code
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
              Sent to {email}
            </p>
            <div className="flex gap-3 justify-center my-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  className="neon-input text-center"
                  style={{
                    width: 48,
                    height: 56,
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    padding: 0,
                  }}
                  value={otp[i] || ""}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    const newOtp =
                      otp.substring(0, i) + val + otp.substring(i + 1);
                    setOtp(newOtp);
                    if (val && i < 5) {
                      const next = document.getElementById(
                        `otp-${i + 1}`
                      ) as HTMLInputElement;
                      next?.focus();
                    }
                  }}
                />
              ))}
            </div>
            <NeonButton
              id="otp-submit"
              variant="green"
              className="w-full"
              onClick={handleOtpSubmit}
              disabled={otp.length < 6}
            >
              Verify & Enter
            </NeonButton>
            <button
              className="text-sm text-center mt-2"
              style={{ color: "var(--neon-cyan)" }}
            >
              Resend code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
