import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ default: false })
  published: boolean;

  @ManyToOne(() => Category, (category) => category.posts, { eager: true })
  category: Category;

  // the user who authored this post
  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  author: User;

  @CreateDateColumn()
  createdAt: Date;
}
