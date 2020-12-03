import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { User } from './user.entity';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository, private jwtService: JwtService) {

    }

    async signUp(userDto: AuthCredentialsDto): Promise<User> {
        return this.UserRepository.signUp(userDto);
    }

    async signIn(userDto: AuthCredentialsDto): Promise<any> {

        const username = await this.UserRepository.validateUserPassword(userDto);
        console.log(username);
        if (!username) {
            throw new UnauthorizedException('invalid cradentials33')
        }
        let user1: any;
        const payload = { username };
        const accessToken = await this.jwtService.sign(payload);
        user1 = await this.UserRepository.findOne({ username })
        user1.accessToken = accessToken;

        return { username: user1.username, accessToken: user1.accessToken, id: user1.id, role: user1.role };
    }

}
