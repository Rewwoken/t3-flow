import { PrismaService } from '@/prisma.service';
import { UpdateSessionDto } from '@/timer/dto/update-session.dto';
import { UpdateSettingsDto } from '@/timer/dto/update-settings.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TimerService {
	constructor(private readonly prismaService: PrismaService) {}

	async createSession(userId: string) {
		return await this.prismaService.timerSession.create({
			data: {
				user: {
					connect: {
						id: userId,
					},
				},
			},
		});
	}

	async getSession(userId: string) {
		return await this.prismaService.timerSession.findUnique({
			where: {
				userId: userId,
			},
		});
	}

	async updateSession(userId: string, updateSessionDto: UpdateSessionDto) {
		return await this.prismaService.timerSession.update({
			where: {
				userId: userId,
			},
			data: updateSessionDto,
		});
	}

	// No need to create settings, since they are created in user.service

	async getSettings(userId: string) {
		return await this.prismaService.timerSettings.findUnique({
			where: {
				userId: userId,
			},
		});
	}

	async deleteSession(userId: string) {
		return await this.prismaService.timerSession.delete({
			where: {
				userId: userId,
			},
		});
	}

	async updateSettings(userId: string, updateSettingsDto: UpdateSettingsDto) {
		return await this.prismaService.timerSettings.update({
			where: {
				userId: userId,
			},
			data: updateSettingsDto,
		});
	}
}
