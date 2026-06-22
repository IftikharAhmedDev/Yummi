// ═══════════════════════════════════════════════════════════
// @timer-game/shared — Game Constants
// ═══════════════════════════════════════════════════════════

export const GAME_CONSTANTS = {
  // Timer
  MIN_TARGET_SECONDS: 1.0,
  MAX_TARGET_SECONDS: 5.0,
  PRECISION_WINDOW_SIZE: 0.4, // ±200ms
  REACTION_DELAY_MIN: 1000,   // 1 second
  REACTION_DELAY_MAX: 5000,   // 5 seconds

  // Match
  MAX_PLAYERS_PER_ROOM: 8,
  MAX_SPECTATORS_PER_ROOM: 10,
  DEFAULT_ROUNDS: 5,
  ROUND_COUNTDOWN_SECONDS: 3,
  ACTION_TIMEOUT_SECONDS: 30,
  MATCH_READY_TIMEOUT_SECONDS: 15,

  // Matchmaking
  INITIAL_ELO_RANGE: 50,
  ELO_RANGE_EXPANSION: 25,
  ELO_EXPANSION_INTERVAL_MS: 10000,
  QUEUE_TIMEOUT_SECONDS: 120,

  // ELO
  DEFAULT_ELO: 1200,
  K_FACTOR_DEFAULT: 32,
  K_FACTOR_HIGH_ELO: 16,
  K_FACTOR_NEW_PLAYER: 48,
  HIGH_ELO_THRESHOLD: 2000,
  NEW_PLAYER_GAMES: 30,

  // Anti-cheat
  MIN_ACTION_COOLDOWN_MS: 50,
  MAX_ACTIONS_PER_SECOND: 10,
  SUSPICION_THRESHOLD: 100,
  SUSPICION_DECAY_RATE: 5,   // points per hour
  MIN_REACTION_TIME_MS: 100, // anything below = likely cheat
  MAX_CONSISTENCY_FLAG: 5,   // std dev in ms over 10 rounds

  // Room
  ROOM_CODE_LENGTH: 6,
  ROOM_INACTIVITY_TTL_SECONDS: 300,

  // Auth
  OTP_LENGTH: 6,
  OTP_EXPIRY_MINUTES: 5,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION_MINUTES: 15,
  ACCESS_TOKEN_EXPIRY: '15m',
  REFRESH_TOKEN_EXPIRY: '7d',

  // Rate limiting
  AUTH_RATE_LIMIT: 100,       // per minute per IP
  API_RATE_LIMIT: 300,        // per minute per user
  SOCKET_RATE_LIMIT: 60,     // per second per socket
} as const;

export const TEAM_SIZES: Record<string, number> = {
  '1v1': 1,
  '2v2': 2,
  '3v3': 3,
  '4v4': 4,
};
