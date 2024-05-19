import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { TokenService } from './token.service';

@Module({
	imports: [UserModule],
	providers: [TokenService],
	exports: [TokenService],
})
export class TokenModule {}
