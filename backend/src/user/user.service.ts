import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const newUser = new User();
        newUser.username = createUserDto.username;
        newUser.password = createUserDto.password;
        return this.userRepository.save(newUser);
    }

    async findOneByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUser(id: number) {
        const user = await this.userRepository.findOneBy({id:id});
        const { password, ...result } = user;
        return result;
    }   
}
