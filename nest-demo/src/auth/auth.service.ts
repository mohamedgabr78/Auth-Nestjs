import { Injectable } from '@nestjs/common';
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

    signin(){
    return { msg: 'I am signin' }
    }
} 