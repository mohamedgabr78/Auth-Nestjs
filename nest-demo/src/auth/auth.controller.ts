import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dto';

@Controller('auth')
export class AuthController{
  constructor(private authService: AuthService) {}

  private readonly logger = new Logger(AuthController.name);

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
    }

  @Post('signin')
  signin() {

    return this.authService.signin();
    }
}