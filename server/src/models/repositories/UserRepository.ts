import { _User } from "../_User";

export abstract class UserRepository {
	abstract getAll(): Promise<_User[]>;
	abstract findByUsername(): Promise<_User | null>;
	abstract findById(): Promise<_User | null>;
	abstract findByAccountId(): Promise<_User | null>;
	abstract create(): Promise<_User>;
}
