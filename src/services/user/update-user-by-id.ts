import type { User } from "@/@types/user";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { IUserRepository } from "@/repository/user-repository";

interface RequestData {
	id: string;
	updateData: Partial<User>;
}
interface ResponseData {
	user: User;
}

export class UpdateUserByIdService {
	constructor(private userRepository: IUserRepository) {}

	async execute({ id, updateData }: RequestData): Promise<ResponseData> {
		const alreadyExistUser = await this.userRepository.getById(id);

		if (!alreadyExistUser) {
			throw new ResourceNotFoundError("User not found.");
		}

		if (Object.keys(updateData).length === 0) {
			throw new ResourceNotFoundError("No data could be found for the update.");
		}

		const user = await this.userRepository.update(id, updateData);

		return { user };
	}
}
