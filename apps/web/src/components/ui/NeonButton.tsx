"use client";

import { useCallback, MouseEvent, ReactNode } from "react";

type Variant = "cyan" | "green" | "pink" | "purple" | "ghost";

interface NeonButtonProps {
  id?: string;
  variant?: Variant;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const VARIANT_CLASSES: Record<Variant, string> = {
  cyan: "neon-btn-cyan",
  green: "neon-btn-green",
  pink: "neon-btn-pink",
  purple: "neon-btn-purple",
  ghost: "",
};

const SIZE_STYLES: Record<string, React.CSSProperties> = {
  sm: { padding: "8px 18px", fontSize: "0.8rem" },
  md: { padding: "14px 32px", fontSize: "1rem" },
  lg: { padding: "18px 48px", fontSize: "1.1rem" },
};

export function NeonButton({
  id,
  variant = "cyan",
  children,
  onClick,
  disabled,
  className = "",
  size = "md",
}: NeonButtonProps) {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      // Ripple effect
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;
      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${e.clientX - rect.left - radius}px`;
      ripple.style.top = `${e.clientY - rect.top - radius}px`;
      ripple.className = "ripple";
      // Remove old ripples
      const existing = btn.querySelector(".ripple");
      if (existing) existing.remove();
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
      onClick?.();
    },
    [disabled, onClick]
  );

  const ghostStyles: React.CSSProperties =
    variant === "ghost"
      ? {
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "var(--text-secondary)",
        }
      : {};

  return (
    <button
      id={id}
      className={`neon-btn ripple-container ${VARIANT_CLASSES[variant]} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      style={{
        ...SIZE_STYLES[size],
        ...ghostStyles,
      }}
    >
      {children}
    </button>
  );
}
