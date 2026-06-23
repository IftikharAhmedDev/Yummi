// ═══════════════════════════════════════════════════════════
// Yummi Timer — Mobile Theme Colors
// Matches the web app's premium dark neon aesthetic
// ═══════════════════════════════════════════════════════════

export const Colors = {
  // Backgrounds
  bgDeep: '#0A0B14',
  bgCard: 'rgba(255,255,255,0.03)',
  bgCardElevated: 'rgba(255,255,255,0.06)',
  bgSurface: '#12131f',
  bgOverlay: 'rgba(0,0,0,0.6)',

  // Neon accents
  neonCyan: '#00F5FF',
  neonPurple: '#A855F7',
  neonPink: '#FF2DAA',
  neonBlue: '#3B82F6',
  neonGreen: '#00FF85',
  neonYellow: '#FFD700',
  neonOrange: '#FF8C00',
  neonRed: '#FF3B3B',

  // Text
  textPrimary: 'rgba(255,255,255,0.95)',
  textSecondary: 'rgba(255,255,255,0.65)',
  textMuted: 'rgba(255,255,255,0.35)',

  // Borders
  borderSubtle: 'rgba(255,255,255,0.06)',
  borderGlow: 'rgba(0,245,255,0.15)',

  // Glass
  glassBackground: 'rgba(255,255,255,0.04)',
  glassBorder: 'rgba(255,255,255,0.08)',
} as const;

export const Gradients = {
  primary: ['#00F5FF', '#A855F7'] as const,
  success: ['#00FF85', '#00F5FF'] as const,
  danger: ['#FF3B3B', '#FF2DAA'] as const,
  gold: ['#FFD700', '#FF8C00'] as const,
  cardGlow: ['rgba(0,245,255,0.08)', 'rgba(168,85,247,0.04)', 'transparent'] as const,
} as const;
