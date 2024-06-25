import { RegisterDto } from '@/auth/dto/register.dto';
import { PrismaService } from '@/prisma.service';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'argon2';

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	async getProfile(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: { id: id },
			include: {
				tasks: true,
				timerSession: true,
				timerSettings: true,
				timeBlocks: true,
			},
		});

		if (!user) return null;

		return user;
	}

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

	async findOneById(id: string) {
		const findUser = await this.prismaService.user.findUnique({
			where: { id: id },
		});

		if (!findUser) return null;

		return findUser;
	}

	async findOneByEmail(email: string) {
		const findUser = await this.prismaService.user.findUnique({
			where: { email: email },
		});

		if (!findUser) return null;

		return findUser;
	}

	async update(id: string, email: string, updateUserDto: UpdateUserDto) {
		if (updateUserDto.email && email !== updateUserDto.email) {
			const existingUser = await this.findOneByEmail(updateUserDto.email);

			if (existingUser) {
				throw new BadRequestException('Email is already in use!');
			}
		}

		// If password is provided to update, hash it
		if (updateUserDto.password) {
			const passwordHash = await hash(updateUserDto.password);

			updateUserDto.password = passwordHash;
		}

		return await this.prismaService.user.update({
			where: { id: id },
			data: updateUserDto,
		});
	}
}
