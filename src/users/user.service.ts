import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    // password is not selected by default (see User entity), but we need it
    // when verifying credentials.  use a query builder to add it explicitly.
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
