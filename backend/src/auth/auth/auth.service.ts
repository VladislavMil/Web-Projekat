import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { UserInterface } from 'src/interfaces/user';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UserService,
        private configService: ConfigService
    ) { }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }

    async register(userDto: CreateUserDto): Promise<UserInterface> {
        const { username, password } = userDto;
        const hashedPassword = await this.hashPassword(password);
        const newUser = await this.usersService.create({ username, password: hashedPassword });
        return { id: newUser.id, username: newUser.username };
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (!user) {
            return null;
        }
        const isMatch = await bcrypt.compare(pass, user.password);
        if (isMatch) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {

        const payload = { username: user.username, sub: user.id, id: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async getAllUsers() {
        return this.usersService.findAll();
    }
}
