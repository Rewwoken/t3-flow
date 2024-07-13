import { LoginDto } from '@/auth/dto/login.dto';
import { RegisterDto } from '@/auth/dto/register.dto';
import { TokenService } from '@/token/token.service';
import { UserService } from '@/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userService.findOneByEmail(
      registerDto.email,
    );

    if (existingUser) {
      throw new BadRequestException('Email is already in use!');
    }

    const { password, ...user } = await this.userService.create(registerDto);

    const { accessToken, refreshToken } = this.tokenService.issueTokens(
      user.id,
    );

    return { ...user, accessToken, refreshToken };
  }

  async login(loginDto: LoginDto) {
    const findUser = await this.userService.findOneByEmail(loginDto.email);

    if (!findUser) {
      throw new BadRequestException('Invalid email or password!');
    }

    const isValid = await verify(findUser.password, loginDto.password);

    if (!isValid) {
      throw new BadRequestException('Invalid email or password!');
    }

    const { password, ...user } = findUser;

    const { accessToken, refreshToken } = this.tokenService.issueTokens(
      user.id,
    );

    return { ...user, accessToken, refreshToken };
  }
}
