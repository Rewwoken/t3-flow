import { NextRequest, NextResponse } from 'next/server';
import { tokenService } from '@/services/token.service';
import { AUTH, DASHBOARD } from '@/constants/routes.constants';

export async function middleware(req: NextRequest, res: NextResponse) {
	const { url, cookies } = req;

	const refreshToken = cookies.get(tokenService.REFRESH_TOKEN_NAME)?.value;

	if (refreshToken && url.includes(AUTH.BASE_URL)) {
		return NextResponse.redirect(new URL(DASHBOARD.ROOT, url));
	}

	if (!refreshToken && url.includes(DASHBOARD.BASE_URL)) {
		return NextResponse.redirect(new URL(AUTH.LOGIN, url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard/:path*', '/auth/:path*'],
};
