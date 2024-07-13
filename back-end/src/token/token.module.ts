import { TokenService } from '@/token/token.service';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
