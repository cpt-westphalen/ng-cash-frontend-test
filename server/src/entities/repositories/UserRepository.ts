import { User } from "@prisma/client";
import { _User } from "../models/_User";

export abstract class UserRepository {
	abstract getAll(): Promise<User[]>;
	abstract findByUsername(username: string): Promise<_User | null>;
	abstract findById(id: string): Promise<_User | null>;
	abstract findByAccountId(accountId: string): Promise<_User | null>;
	abstract create(user: _User): Promise<_User | null>;
}
