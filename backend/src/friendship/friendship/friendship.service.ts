import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friendship } from 'src/entities/friendship.entity';

@Injectable()
export class FriendshipService {

    constructor(
        @InjectRepository(Friendship)
        private friendshipRepository: Repository<Friendship>
    ) { }

    async create(friendship: Friendship): Promise<Friendship> {
        return this.friendshipRepository.save(friendship);
    }

    async findAll(): Promise<Friendship[]> {
        return this.friendshipRepository.find();
    }

    async findAllById(id: number): Promise<Friendship[]> {
        return this.friendshipRepository.find({ where: { friendId: id }, join: { alias: 'friendship', leftJoinAndSelect: { user: 'friendship.user' } } });
    }

    async update(id: number): Promise<Friendship> {
        
        await this.friendshipRepository.update(id, { status: true });
        return (await this.friendshipRepository.find({ where: { id },relations:{user:true,friend:true} }))[0];
    }
}
