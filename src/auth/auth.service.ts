import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { signInForm, userDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import  * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,private jwt: JwtService) {}
    async create(data:userDto) {
        try {
            console.log(data);
            const hash = await bcrypt.hash(data.password,10);
            const user = await this.prisma.user.create({data:{...data,password:hash}});
            delete user.password
            return user;
        }
        catch(e) {
            if (e.code === 'P2002')
                throw new ForbiddenException(e.meta.target + ' already in use');
        }
    }
    async signIn(data: signInForm) {
            const user = await this.prisma.user.findUnique({
                where: {
                    userName: data.userName,
                }
            });
            if (!user)
                throw new NotFoundException('username not found')
            const comp = await bcrypt.compare(data.password,user.password);
            if (!comp)
                throw new ForbiddenException('password incorrect');
            const payload = { sub: user.id, username : user.userName};
            return {access_token: await this.jwt.signAsync(payload)};
    }
    async getProfile(req: Request) {
        const data = req['user'];
        const user = await this.prisma.user.findUnique({
            where: {
                userName: data.username,
            },
        });
        delete user.password;
        return user;                          
    }
}
