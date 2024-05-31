import { RegisterDto } from '@/auth/dto/register.dto';
import { PrismaService } from '@/prisma.service';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { startOfDay, subDays } from 'date-fns';

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(payload: RegisterDto) {
		const user = await this.prismaService.user.create({
			data: {
				name: payload.name,
				email: payload.email,
				password: await hash(payload.password),
			},
		});

		// Creating empty timerSettings directly from prismaService to
		// avoid circular dependecy TimerModule <==> UserModule
		await this.prismaService.timerSettings.create({
			data: {
				user: {
					connect: {
						id: user.id,
					},
				},
			},
		});

		return user;
	}

	// TODO: optimize
	async getProfile(id: string) {
		const {
			password,
			tasks,
			timeBlocks,
			timerSessions,
			timerSettings,
			...profile
		} = await this.findOneById(id);

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
			timerSettings,
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

	async update(id: string, userEmail: string, updateUserDto: UpdateUserDto) {
		if (userEmail !== updateUserDto.email) {
			const existingUser = await this.findOneByEmail(updateUserDto.email);

			if (existingUser) {
				throw new BadRequestException('Email is already in use!');
			}
		}

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
