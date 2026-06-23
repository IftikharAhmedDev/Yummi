// ═══════════════════════════════════════════════════════════
// Yummi Timer — Socket.io Client for Mobile
// ═══════════════════════════════════════════════════════════

import { io, Socket } from 'socket.io-client';
import { AppState, AppStateStatus } from 'react-native';

const BACKEND_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3001';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(BACKEND_URL, {
      transports: ['websocket'],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });
  }
  return socket;
}

export function connectSocket(token: string): Socket {
  const s = getSocket();
  s.auth = { token };
  s.connect();
  return s;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

// Handle foreground / background transitions
let appStateSubscription: ReturnType<typeof AppState.addEventListener> | null = null;

export function setupAppStateHandler(): void {
  if (appStateSubscription) return;

  appStateSubscription = AppState.addEventListener('change', (nextState: AppStateStatus) => {
    if (!socket) return;

    if (nextState === 'active') {
      if (!socket.connected) {
        socket.connect();
      }
    } else if (nextState === 'background') {
      // Keep connection alive for a bit, then disconnect
      setTimeout(() => {
        if (AppState.currentState !== 'active' && socket?.connected) {
          socket.disconnect();
        }
      }, 30000);
    }
  });
}

export function cleanupAppStateHandler(): void {
  appStateSubscription?.remove();
  appStateSubscription = null;
}
