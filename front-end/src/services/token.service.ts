import Cookies from 'js-cookie';

class TokenService {
  readonly ACCESS_TOKEN_NAME = 'accessToken';
  readonly REFRESH_TOKEN_NAME = 'refreshToken';

  getAccessToken() {
    const accessToken = Cookies.get(this.ACCESS_TOKEN_NAME);

    return accessToken || null;
  }

  saveAccessTokenInCookies(accessToken: string) {
    Cookies.set(this.ACCESS_TOKEN_NAME, accessToken, {
      domain: process.env.NEXT_PUBLIC_DOMAIN,
      sameSite: 'strict',
      expires: 1,
    });
  }
}

export const tokenService = new TokenService();
