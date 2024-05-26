/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/auth/login',
				permanent: true,
			},
			{
				source: '/dashboard',
				destination: '/dashboard/home',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
