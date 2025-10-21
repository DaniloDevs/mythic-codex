import bcrypt from "bcryptjs";
import { UserAlreadyExistsError } from "@/_errors/user-already-exists";
import type {
	IUserRepository,
	UserCreateInput,
} from "@/repository/user-repository";

export class RegisterUserService {
	constructor(private userRepository: IUserRepository) {}

	async execute(data: UserCreateInput) {
		const userAlreadyExists = await this.userRepository.getByEmail(data.email);

		if (userAlreadyExists) {
			throw new UserAlreadyExistsError();
		}

		const passwordHash = await bcrypt.hash(data.password, 6);

		const user = await this.userRepository.create({
			...data,
			password: passwordHash,
		});

		return user;
	}
}
