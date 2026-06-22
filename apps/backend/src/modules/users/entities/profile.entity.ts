import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'display_name' })
  displayName: string;

  @Column({ nullable: true, name: 'avatar_url' })
  avatarUrl: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  region: string;

  @Column({ default: 1 })
  level: number;

  @Column({ default: 0 })
  xp: number;

  @Column({ type: 'jsonb', nullable: true })
  settings: Record<string, any>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
