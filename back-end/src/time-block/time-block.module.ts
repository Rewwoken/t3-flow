import { TimeBlockController } from '@/time-block/time-block.controller';
import { TimeBlockService } from '@/time-block/time-block.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TimeBlockController],
  providers: [TimeBlockService, PrismaService],
})
export class TimeBlockModule {}
