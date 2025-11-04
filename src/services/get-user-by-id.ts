import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { IUserRepository } from "./../repository/user-repository";

interface GetUserByIdResponse {
	id: string;
}

export class GetUserByIdService {
	constructor(private userRepository: IUserRepository) {}

	async execute({ id }: GetUserByIdResponse) {
		const user = await this.userRepository.getById(id);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		return { user };
	}
}
