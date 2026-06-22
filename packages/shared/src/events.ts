// ═══════════════════════════════════════════════════════════
// @timer-game/shared — Socket Events
// ═══════════════════════════════════════════════════════════

export const SocketEvents = {
  // Connection
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  ERROR: 'error',

  // Authentication
  AUTH: 'auth',
  AUTH_SUCCESS: 'auth:success',
  AUTH_FAILURE: 'auth:failure',

  // Queue / Matchmaking
  QUEUE_JOIN: 'queue:join',
  QUEUE_LEAVE: 'queue:leave',
  QUEUE_STATUS: 'queue:status',
  MATCH_FOUND: 'match:found',
  MATCH_READY: 'match:ready',

  // Match lifecycle
  MATCH_START: 'match:start',
  MATCH_END: 'match:end',
  MATCH_CANCEL: 'match:cancel',

  // Round lifecycle
  ROUND_COUNTDOWN: 'round:countdown',
  ROUND_START: 'round:start',
  ROUND_END: 'round:end',
  ROUND_RESULT: 'round:result',

  // Game actions
  SHOW_SIGNAL: 'game:signal',
  PLAYER_ACTION: 'player:action',
  PLAYER_ACTION_ACK: 'player:action:ack',

  // Room
  ROOM_CREATE: 'room:create',
  ROOM_CREATED: 'room:created',
  ROOM_JOIN: 'room:join',
  ROOM_LEAVE: 'room:leave',
  ROOM_UPDATE: 'room:update',
  ROOM_KICK: 'room:kick',
  ROOM_START: 'room:start',
  ROOM_CHAT: 'room:chat',

  // Spectator
  SPECTATE_JOIN: 'spectate:join',
  SPECTATE_LEAVE: 'spectate:leave',
  SPECTATE_UPDATE: 'spectate:update',

  // State sync
  SYNC_STATE: 'sync:state',
  RECONNECT: 'reconnect',
  RECONNECT_SUCCESS: 'reconnect:success',

  // Social
  FRIEND_REQUEST: 'friend:request',
  FRIEND_ONLINE: 'friend:online',
  FRIEND_OFFLINE: 'friend:offline',
  INVITE_SEND: 'invite:send',
  INVITE_RECEIVE: 'invite:receive',

  // Notifications
  NOTIFICATION: 'notification',

  // Ping
  PING_CHECK: 'ping:check',
  PONG_CHECK: 'pong:check',
} as const;

export type SocketEvent = (typeof SocketEvents)[keyof typeof SocketEvents];
