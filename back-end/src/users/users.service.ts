import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUser } from './interface/create-user.interface';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(payload: CreateUser) {
		return await this.prismaService.user.create({
			data: {
				name: payload.name,
				email: payload.email,
				password: await hash(payload.password),
			},
			select: {
				id: true,
				email: true,
				name: true,
				password: true,
				createdAt: true,
				updatedAt: true,
				pomodoro: true,
				tasks: true,
				timeBlocks: true,
				pomodoroSessions: true,
			},
		});
	}

	async findOneByEmail(email: string) {
		const findUser = await this.prismaService.user.findUnique({
			where: { email: email },
			select: {
				id: true,
				email: true,
				name: true,
				password: true,
				createdAt: true,
				updatedAt: true,
				pomodoro: true,
				tasks: true,
				timeBlocks: true,
				pomodoroSessions: true,
			},
		});

		if (!findUser) return null;

		return findUser;
	}

	async findOneById(id: string) {
		const findUser = await this.prismaService.user.findUnique({
			where: { id: id },
			select: {
				id: true,
				email: true,
				name: true,
				password: true,
				createdAt: true,
				updatedAt: true,
				pomodoro: true,
				tasks: true,
				timeBlocks: true,
				pomodoroSessions: true,
			},
		});

		if (!findUser) return null;

		return findUser;
	}
}
