import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { IUserRepository, User } from "./../repository/user-repository";

interface ResponseGetUserById {
	id: string;
}
interface RequestGetUserById {
	user: User;
}

export class GetUserByIdService {
	constructor(private userRepository: IUserRepository) {}

	async execute({ id }: ResponseGetUserById): Promise<RequestGetUserById> {
		const user = await this.userRepository.getById(id);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		return { user };
	}
}
