import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable({})
export class AuthService{
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {

    //generate a password
    const hash = await argon.hash(dto.password);
    //save a new user
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      }
    })
    return user;
    }

  async signin(dto: AuthDto) {
    //find the user
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //if user does's exist throw an error
    if (!user) throw new ForbiddenException('Credintials incorect');

    //compare password
    const matchPass = await argon.verify(user.hash, dto.password);

    //if passord is incorrect
    if (!matchPass) throw new ForbiddenException('wrong password');

    delete user.hash;
    return user;
  }
} 