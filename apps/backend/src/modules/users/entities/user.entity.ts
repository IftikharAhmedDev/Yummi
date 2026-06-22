import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AuthProvider {
  GUEST = 'guest',
  EMAIL = 'email',
  GOOGLE = 'google',
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ unique: true, nullable: true, name: 'google_id' })
  googleId: string;

  @Column({
    type: 'enum',
    enum: AuthProvider,
    default: AuthProvider.GUEST,
  })
  authProvider: AuthProvider;

  @Column({ nullable: true, name: 'password_hash' })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ default: false, name: 'is_banned' })
  isBanned: boolean;

  @Column({ type: 'timestamp', nullable: true, name: 'banned_until' })
  bannedUntil: Date;

  @Column({ nullable: true, name: 'ban_reason' })
  banReason: string;

  @Column({ default: false, name: 'is_verified' })
  isVerified: boolean;

  @Column({ type: 'timestamp', nullable: true, name: 'last_login_at' })
  lastLoginAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
