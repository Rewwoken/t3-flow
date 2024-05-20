import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { startOfDay, subDays } from 'date-fns';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUser } from './interface/create-user.interface';

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(payload: CreateUser) {
		return await this.prismaService.user.create({
			data: {
				name: payload.name,
				email: payload.email,
				password: await hash(payload.password),
			},
		});
	}

	async getProfile(id: string) {
		const { password, ...profile } = await this.findOneById(id);

		const totalTasks = profile.tasks.length;
		const completedTasks = profile.tasks.reduce((count, task) => {
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

		return {
			profile,
			statistics: [
				{ label: 'Total', value: totalTasks },
				{ label: 'Completed tasks', value: completedTasks },
				{ label: 'Today tasks', value: todayTasks },
				{ label: 'Week tasks', value: thisWeekTasks },
			],
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
			},
		});

		if (!findUser) return null;

		return findUser;
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		// if password is provided in dto, then hash hash it
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
