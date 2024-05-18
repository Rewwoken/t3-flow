import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		const { email, name, password } = createUserDto;

		const existingUser = await this.prismaService.user.findFirst({
			where: { email: email },
		});

		if (existingUser) {
			throw new BadRequestException('User already exists!');
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
}
