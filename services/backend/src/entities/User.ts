import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  foreignId!: string;

  @Column()
  username!: string;

  @Column()
  usernameId!: string;

  @Column({ nullable: true, type: 'varchar' })
  nickname!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  avatarId!: string | null;
}
