import { UpdateSessionDto } from '@/timer/dto/update-session.dto';
import { UpdateSettingsDto } from '@/timer/dto/update-settings.dto';
import { TimerService } from '@/timer/timer.service';
import { CurrentUser } from '@/token/decorators/current-user.decorator';
import { Protected } from '@/token/decorators/protected.decorator';
import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Protected()
@Controller('timer')
export class TimerController {
	constructor(private readonly timerService: TimerService) {}

	@Get('/session')
	async getSession(@CurrentUser('id') userId: string) {
		return await this.timerService.getSession(userId);
	}

	@Post('/session')
	async createSession(@CurrentUser('id') userId: string) {
		return await this.timerService.createSession(userId);
	}

	@Patch('/session')
	async updateSession(
		@CurrentUser('id') userId: string,
		@Body() updateSessionDto: UpdateSessionDto,
	) {
		return await this.timerService.updateSession(userId, updateSessionDto);
	}

	@Delete('/session')
	async deleteSession(@CurrentUser('id') userId: string) {
		return await this.timerService.deleteSession(userId);
	}

	@Get('/settings')
	async getSettings(@CurrentUser('id') userId: string) {
		return await this.timerService.getSettings(userId);
	}

	@Patch('/settings')
	async updateSettings(
		@CurrentUser('id') userId: string,
		@Body() updateSettingsDto: UpdateSettingsDto,
	) {
		return await this.timerService.updateSettings(userId, updateSettingsDto);
	}
}
