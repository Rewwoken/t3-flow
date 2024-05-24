import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { startOfDay, subDays } from 'date-fns';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(payload: RegisterDto) {
		return await this.prismaService.user.create({
			data: {
				name: payload.name,
				email: payload.email,
				password: await hash(payload.password),
			},
		});
	}

	// TODO: optimize
	async getProfile(id: string) {
		const { password, tasks, timeBlocks, timerSessions, timerSettings, ...profile } =
			await this.findOneById(id);

		const totalTasks = tasks.length;
		const completedTasks = tasks.reduce((count, task) => {
			if (task.isCompleted) return count + 1;
			else return count;
		}, 0);

		const now = new Date();
		const todayStart = startOfDay(now);
		const weekStart = startOfDay(subDays(now, 7));

		const todayTasks = await this.prismaService.task.count({
			where: {
				userId: id,
				createdAt: {
					gte: todayStart.toISOString(),
				},
			},
		});

		const thisWeekTasks = await this.prismaService.task.count({
			where: {
				userId: id,
				createdAt: {
					gte: weekStart.toISOString(),
				},
			},
		});

		const totalTimerSessions = timerSessions.length;

		const totalTimeBlocks = timeBlocks.length;
		const totalTimeBlocksDuration = timeBlocks.reduce((duration, timeBlock) => {
			return duration + timeBlock.duration;
		}, 0);

		// TODO: add more information for the profile
		return {
			profile,
			statistics: {
				totalTasks,
				completedTasks,
				todayTasks,
				thisWeekTasks,
				totalTimerSessions,
				totalTimeBlocks,
				totalTimeBlocksDuration,
			},
		};
	}

	async findOneByEmail(email: string) {
		const findUser = await this.prismaService.user.findUnique({
			where: { email: email },
		});

		if (!findUser) return null;

		return findUser;
	}

	async findOneById(id: string) {
		const findUser = await this.prismaService.user.findUnique({
			where: { id: id },
			include: {
				tasks: true,
				timerSettings: true,
				timeBlocks: true,
				timerSessions: true,
			},
		});

		if (!findUser) return null;

		return findUser;
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		// if password is provided to update, then hash it
		if (updateUserDto.password) {
			const passwordHash = await hash(updateUserDto.password);

			updateUserDto.password = passwordHash;
		}

		return await this.prismaService.user.update({
			where: { id: id },
			data: updateUserDto,
			select: {
				email: true,
				name: true,
				updatedAt: true,
			},
		});
	}
}
