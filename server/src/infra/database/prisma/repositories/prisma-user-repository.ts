import { PrismaClient, User } from "@prisma/client";

import { _User } from "../../../../application/models/_User";

import { UserRepository } from "../../../../application/repositories/UserRepository";

import { PrismaMappers } from "./mappers/prisma-mappers";

import { prismaService } from "../prismaService";

class PrismaUserRepository implements UserRepository {
	constructor(private prismaService: PrismaClient) {}
	async getAll(): Promise<User[]> {
		const users = await this.prismaService.user.findMany({
			include: { account: true },
		});
		return users;
	}
	async findByUsername(username: string): Promise<_User | null> {
		const user = await this.prismaService.user.findFirst({
			where: { username },
			include: { account: true },
		});
		return user ? PrismaMappers.toServerUser(user) : null;
	}
	async findById(id: string): Promise<_User | null> {
		const user = await this.prismaService.user.findFirst({
			where: { userId: id },
			include: { account: true },
		});
		return user ? PrismaMappers.toServerUser(user) : null;
	}
	async findByAccountId(accountId: string): Promise<_User | null> {
		const user = await this.prismaService.user.findFirst({
			where: { accountId },
			include: { account: true },
		});
		return user ? PrismaMappers.toServerUser(user) : null;
	}
	async create(user: _User): Promise<_User | null> {
		const prismaUser = await this.prismaService.user.create({
			data: {
				username: user.username,
				password: user.password,
				userId: user.id,
				account: { connect: { accountId: user.account.id } },
			},
			include: { account: true },
		});
		return prismaUser ? PrismaMappers.toServerUser(prismaUser) : null;
	}
}

export const prismaUserRepository = new PrismaUserRepository(prismaService);
