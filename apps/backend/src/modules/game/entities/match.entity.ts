import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum GameMode {
  TARGET = 'target',
  REACTION = 'reaction',
  PRECISION = 'precision',
  BLIND_TARGET = 'blind_target',
}

export enum MatchType {
  PRACTICE = 'Practice',
  ONE_V_ONE = '1v1',
  TWO_V_TWO = '2v2',
  THREE_V_THREE = '3v3',
  FOUR_V_FOUR = '4v4',
}

export enum MatchStatus {
  CREATED = 'created',
  STARTING = 'starting',
  IN_PROGRESS = 'in_progress',
  COMPLETE = 'complete',
  ARCHIVED = 'archived',
}

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true, name: 'season_id' })
  seasonId: string;

  @Column({ type: 'enum', enum: GameMode })
  mode: GameMode;

  @Column({ type: 'enum', enum: MatchType })
  matchType: MatchType;

  @Column({ type: 'enum', enum: MatchStatus, default: MatchStatus.CREATED })
  status: MatchStatus;

  @Column({ name: 'max_players' })
  maxPlayers: number;

  @Column({ name: 'total_rounds' })
  totalRounds: number;

  @Column({ name: 'current_round', default: 1 })
  currentRound: number;

  @Column({ type: 'uuid', nullable: true, name: 'room_id' })
  roomId: string;

  @Column({ type: 'jsonb', nullable: true })
  settings: Record<string, any>;

  @Column({ type: 'timestamp', nullable: true, name: 'started_at' })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'ended_at' })
  endedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
