import { EnvironmentVaribales } from '@/config/configuration';
import { IJwtToken } from '@/token/interface/jwt-token.interface';
import { UserService } from '@/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { addDays } from 'date-fns';
import { CookieOptions, Response } from 'express';

@Injectable()
export class TokenService {
  readonly ACCESS_TOKEN_NAME = 'accessToken';
  readonly REFRESH_TOKEN_NAME = 'refreshToken';
  private readonly REFRESH_TOKEN_EXPIRES = 7;
  private readonly REFRESH_TOKEN_COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    domain: this.configService.get('domain'),
    secure: true,
    sameSite: 'none', // 'lax' in production,
    // path: '/dashboard',
  };

  constructor(
    private readonly configService: ConfigService<EnvironmentVaribales>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  issueTokens(userId: string) {
    const data: IJwtToken = { id: userId };

    const accessToken = this.jwtService.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(data, {
      expiresIn: this.REFRESH_TOKEN_EXPIRES + 'd', // 7 days
    });

    return { accessToken, refreshToken };
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = addDays(new Date(), this.REFRESH_TOKEN_EXPIRES);

    // set the refreshToken httpOnly cookie
    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      ...this.REFRESH_TOKEN_COOKIE_OPTIONS,
      expires: expiresIn,
    });
  }

  clearTokensCookies(res: Response) {
    res.clearCookie(this.ACCESS_TOKEN_NAME);
    res.clearCookie(this.REFRESH_TOKEN_NAME, this.REFRESH_TOKEN_COOKIE_OPTIONS);
  }

  async getNewTokens(refreshToken: string) {
    try {
      const result = await this.jwtService.verifyAsync(refreshToken);

      const { password, ...user } = await this.userService.findOneById(
        result.id,
      );

      const newTokens = await this.issueTokens(user.id);

      return {
        ...user,
        ...newTokens,
      };
    } catch (err) {
      // catch an error in verifyAsync
      throw new UnauthorizedException('Invalid refresh token!');
    }
  }
}
