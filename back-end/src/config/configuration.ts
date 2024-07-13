export interface EnvironmentVaribales {
  port: number;
  databaseUrl: string;
  domain: string;
  jwtSecret: string;
  originUrl: string;
}

export default (): EnvironmentVaribales => ({
  port: parseInt(process.env.PORT, 10),
  databaseUrl: process.env.DATABASE_URL,
  domain: process.env.DOMAIN, // Domain name for the refreshToken cookie.
  jwtSecret: process.env.JWT_SECRET,
  originUrl: process.env.ORIGIN_URL, // Configures the Access-Control-Allow-Origin CORS header.
});
