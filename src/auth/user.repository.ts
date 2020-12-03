import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt'
import { AuthCredentialsDto } from "./auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(userDto: AuthCredentialsDto): Promise<any> {
        const { username, password } = userDto;
        const salt = await bcrypt.genSalt();
        const user = new User();
        user.username = username;
        user.salt = salt;
        user.password = await this.hashPassword(password, salt);
        try {
            await user.save();

        }
        catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Users name already exist')
            }
            else {
                throw new InternalServerErrorException();
            }
        }
        return { username: user.username, id: user.id }
    }

    async validateUserPassword(userDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = userDto;
        const user = await this.findOne({ username });
        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }



    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}