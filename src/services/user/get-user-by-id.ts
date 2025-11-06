import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { IUserRepository, User } from "./../repository/user-repository";

interface ResponseData {
	id: string;
}
interface RequestData {
	user: User;
}

export class GetUserByIdService {
	constructor(private userRepository: IUserRepository) {}

	async execute({ id }: ResponseData): Promise<RequestData> {
		const user = await this.userRepository.getById(id);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		return { user };
	}
}
