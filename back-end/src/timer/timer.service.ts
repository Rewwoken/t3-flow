import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { UpdateSessionDto } from './dto/update-timer-session-dto';
import { UpdateTimerSettingsDto } from './dto/update-timer-settings.dto';

@Injectable()
export class TimerService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
	) {}

	async getSettings(userId: string) {
		return await this.prismaService.timerSettings.findUnique({
			where: {
				userId: userId,
			},
		});
	}

	async updateSettings(userId: string, updateTimerSettingsDto: UpdateTimerSettingsDto) {
		return await this.prismaService.timerSettings.update({
			where: {
				userId: userId,
			},
			data: updateTimerSettingsDto,
		});
	}

	async getTodaySession(userId: string) {
		// "2011-10-05T14:48:00.000Z" => ["2011-10-05", "14:48:00.000Z"] => "2011-10-05"
		const todayDate = new Date().toISOString().split('T')[0];

		// no session case will be handled on the client side

		return await this.prismaService.timerSession.findFirst({
			where: {
				createdAt: {
					gte: new Date(todayDate),
				},
				userId: userId,
			},
			include: {
				timerRounds: {
					orderBy: {
						id: 'desc',
					},
				},
			},
		});
	}

	async createSession(userId: string) {
		const todaySession = await this.getTodaySession(userId);

		if (todaySession) {
			return todaySession;
		}

		const {
			timerSettings: { intervalsCount },
		} = await this.userService.findOneById(userId);

		// create an empty rounds array with length of user's
		// intervaslCount and fill it with { totalSeconds: 0 }
		const emptyRounds = new Array(intervalsCount).fill({ totalSeconds: 0 });

		return await this.prismaService.timerSession.create({
			data: {
				timerRounds: {
					createMany: {
						data: emptyRounds,
					},
				},
				user: {
					connect: {
						id: userId,
					},
				},
			},
			include: {
				timerRounds: true,
			},
		});
	}

	async updateSession(userId: string, sessionId: string, updateSessionDto: UpdateSessionDto) {
		return await this.prismaService.timerSession.update({
			where: {
				userId: userId,
				id: sessionId,
			},
			data: updateSessionDto,
		});
	}

	async updateRound(roundId: string, updateRoundDto) {
		return await this.prismaService.timerRound.update({
			where: {
				id: roundId,
			},
			data: updateRoundDto,
		});
	}

	async deleteSession(userId: string, sessionId: string) {
		return await this.prismaService.timerSession.delete({
			where: {
				userId: userId,
				id: sessionId,
			},
		});
	}
}
