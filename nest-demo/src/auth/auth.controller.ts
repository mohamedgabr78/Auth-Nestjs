import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController{
  constructor(private authService: AuthService) {}

  private readonly logger = new Logger(AuthController.name);

  @Post('signup')
  signup(@Body() dto: any) {
    this.logger.error({ dto });
    return this.authService.signup();
    }

  @Post('signin')
  signin() {

    return this.authService.signin();
    }
}