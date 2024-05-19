import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { TokenService } from './token.service';

@Module({
	imports: [UsersModule],
	providers: [TokenService],
	exports: [TokenService],
})
export class TokenModule {}
