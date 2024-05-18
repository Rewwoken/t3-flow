import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		const { email, name, password } = createUserDto;

		const existingUser = await this.prismaService.user.findUnique({
			where: { email: email },
		});

		if (existingUser) {
			throw new BadRequestException('Email is already in use!');
		}

		const passwordHash = await argon2.hash(password);

		await this.prismaService.user.create({
			data: {
				name,
				email,
				password: passwordHash,
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
}
