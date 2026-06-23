// ═══════════════════════════════════════════════════════════
// Yummi Timer — Zustand Auth & Game Store
// ═══════════════════════════════════════════════════════════

import { create } from 'zustand';

export type Screen = 'splash' | 'login' | 'home' | 'profile' | 'friends' | 'leaderboard' | 'queue' | 'room' | 'game' | 'results' | 'settings' | 'history';

export interface UserState {
  isLoggedIn: boolean;
  displayName: string;
  level: number;
  xp: number;
  eloRating: number;
  wins: number;
  losses: number;
  winRate: number;
  bestReaction: number;
  avgAccuracy: number;
}

interface AppStore {
  user: UserState;
  currentScreen: Screen;
  login: (name?: string) => void;
  logout: () => void;
  setScreen: (s: Screen) => void;
}

const DEFAULT_USER: UserState = {
  isLoggedIn: false,
  displayName: 'Commander',
  level: 12,
  xp: 2450,
  eloRating: 1347,
  wins: 89,
  losses: 34,
  winRate: 72.4,
  bestReaction: 142,
  avgAccuracy: 38,
};

export const useAppStore = create<AppStore>((set) => ({
  user: DEFAULT_USER,
  currentScreen: 'splash',
  login: (name) =>
    set((state) => ({
      user: { ...state.user, isLoggedIn: true, displayName: name ?? state.user.displayName },
    })),
  logout: () =>
    set({ user: { ...DEFAULT_USER, isLoggedIn: false }, currentScreen: 'login' }),
  setScreen: (currentScreen) => set({ currentScreen }),
}));
