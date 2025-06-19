import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: AuthDto): Promise<{ access_token: string }> {
    const { username, password } = signInDto;

    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (password !== user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
