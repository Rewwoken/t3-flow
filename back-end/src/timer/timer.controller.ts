import { UpdateTimerRoundDto } from '@/timer/dto/update-timer-round.dto';
import { UpdateSessionDto } from '@/timer/dto/update-timer-session-dto';
import { UpdateTimerSettingsDto } from '@/timer/dto/update-timer-settings.dto';
import { TimerService } from '@/timer/timer.service';
import { CurrentUser } from '@/token/decorators/current-user.decorator';
import { Protected } from '@/token/decorators/protected.decorator';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';

@Protected()
@Controller('timer')
export class TimerController {
	constructor(private readonly timerService: TimerService) {}

	@Get()
	async getSettings(@CurrentUser('id') userId: string) {
		return await this.timerService.getSettings(userId);
	}

	@Patch()
	async updateSettings(
		@CurrentUser('id') userId: string,
		@Body() updateTimerSettingsDto: UpdateTimerSettingsDto,
	) {
		return await this.timerService.updateSettings(
			userId,
			updateTimerSettingsDto,
		);
	}

	@Get('/session/today')
	async getTodaySession(@CurrentUser('id') userId: string) {
		return await this.timerService.getTodaySession(userId);
	}

	@Post('/session')
	async createSession(@CurrentUser('id') userId: string) {
		return await this.timerService.createSession(userId);
	}

	@Patch('/session/:sessionId')
	async updateSession(
		@CurrentUser('id') userId: string,
		@Param('sessionId') sessionId: string,
		@Body() updateSessionDto: UpdateSessionDto,
	) {
		return await this.timerService.updateSession(
			userId,
			sessionId,
			updateSessionDto,
		);
	}

	@Patch('/round/:roundId')
	async updateRound(
		@Param('roundId') roundId: string,
		@Body() updateTimerRoundDto: UpdateTimerRoundDto,
	) {
		return await this.timerService.updateRound(roundId, updateTimerRoundDto);
	}

	@Delete('/session/:sessionId')
	async deleteSession(
		@CurrentUser('id') userId: string,
		@Param('sessionId') sessionId: string,
	) {
		return await this.timerService.deleteSession(userId, sessionId);
	}
}
