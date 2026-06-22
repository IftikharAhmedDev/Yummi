// ═══════════════════════════════════════════════════════════
// @timer-game/shared — Game Types
// ═══════════════════════════════════════════════════════════

export enum GameMode {
  TARGET = 'TARGET',
  REACTION = 'REACTION',
  PRECISION = 'PRECISION',
  BLIND_TARGET = 'BLIND_TARGET',
}

export enum MatchType {
  PRACTICE = 'PRACTICE',
  ONE_V_ONE = '1v1',
  TWO_V_TWO = '2v2',
  THREE_V_THREE = '3v3',
  FOUR_V_FOUR = '4v4',
}

export enum MatchStatus {
  CREATED = 'CREATED',
  STARTING = 'STARTING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
  CANCELLED = 'CANCELLED',
  ARCHIVED = 'ARCHIVED',
}

export enum RoundStatus {
  WAITING = 'WAITING',
  COUNTDOWN = 'COUNTDOWN',
  ACTIVE = 'ACTIVE',
  PROCESSING = 'PROCESSING',
  RESULTS = 'RESULTS',
  COMPLETE = 'COMPLETE',
}

export enum RoomStatus {
  LOBBY = 'LOBBY',
  STARTING = 'STARTING',
  IN_GAME = 'IN_GAME',
  COMPLETE = 'COMPLETE',
}

export enum PlayerStatus {
  CONNECTED = 'CONNECTED',
  READY = 'READY',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED',
  DISCONNECTED = 'DISCONNECTED',
  SPECTATING = 'SPECTATING',
}

export enum FriendshipStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  BLOCKED = 'BLOCKED',
}

export enum AuthProvider {
  GUEST = 'GUEST',
  GOOGLE = 'GOOGLE',
  EMAIL = 'EMAIL',
}

export enum UserRole {
  PLAYER = 'PLAYER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
}

export enum NotificationType {
  FRIEND_REQUEST = 'FRIEND_REQUEST',
  FRIEND_ACCEPTED = 'FRIEND_ACCEPTED',
  MATCH_INVITE = 'MATCH_INVITE',
  ROOM_INVITE = 'ROOM_INVITE',
  MATCH_RESULT = 'MATCH_RESULT',
  SYSTEM = 'SYSTEM',
  BAN = 'BAN',
}

export enum ReportReason {
  CHEATING = 'CHEATING',
  HARASSMENT = 'HARASSMENT',
  INAPPROPRIATE_NAME = 'INAPPROPRIATE_NAME',
  AFK = 'AFK',
  OTHER = 'OTHER',
}

export enum SecurityEventType {
  LOGIN_ATTEMPT = 'LOGIN_ATTEMPT',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  TOKEN_REFRESH = 'TOKEN_REFRESH',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  AUTO_BAN = 'AUTO_BAN',
  RATE_LIMIT_HIT = 'RATE_LIMIT_HIT',
}

export enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

// ─── Interfaces ────────────────────────────────────────────

export interface User {
  id: string;
  email?: string;
  username: string;
  googleId?: string;
  authProvider: AuthProvider;
  role: UserRole;
  isBanned: boolean;
  bannedUntil?: string;
  isVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  country?: string;
  region?: string;
  level: number;
  xp: number;
  settings: Record<string, unknown>;
}

export interface PlayerStats {
  id: string;
  userId: string;
  seasonId: string;
  totalMatches: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  avgReactionMs: number;
  bestReactionMs: number;
  avgAccuracyMs: number;
  bestAccuracyMs: number;
  eloRating: number;
  peakElo: number;
  currentStreak: number;
  bestStreak: number;
}

export interface MatchPlayer {
  userId: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  team: number;
  score: number;
  placement: number;
  bestTime: number;
  avgAccuracy: number;
  isWinner: boolean;
  status: PlayerStatus;
  ping: number;
}

export interface RoundResult {
  userId: string;
  actionTime: number;
  difference: number;
  score: number;
  isInWindow: boolean;
  rank: number;
}

export interface MatchSettings {
  mode: GameMode;
  matchType: MatchType;
  totalRounds: number;
  targetRange: [number, number];
  precisionWindowSize: number;
  reactionDelayRange: [number, number];
}

export interface RoomState {
  id: string;
  code: string;
  ownerId: string;
  status: RoomStatus;
  players: MatchPlayer[];
  spectators: MatchPlayer[];
  settings: MatchSettings;
  maxPlayers: number;
  isPrivate: boolean;
  createdAt: string;
}

export interface EloChange {
  userId: string;
  oldElo: number;
  newElo: number;
  change: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  eloRating: number;
  wins: number;
  losses: number;
  winRate: number;
}
