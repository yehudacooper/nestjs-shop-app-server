import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'mysecret',
        });
    }
    async validate(payload) {
        const { username } = payload;
        console.log(payload);
        const user = await this.userRepository.findOne({ username });
        console.log(user);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }


}