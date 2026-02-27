import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  // don't select the password by default when querying users
  @Column({ select: false })
  password: string;

  @Column({ default: 'user' })
  role: string;

  // one user can author many posts
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
