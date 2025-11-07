import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { GetUserByIdService } from "@/services/user/get-user-by-id";

describe("Get User By Id Service", () => {
	let repository: UserImMemoryRepository;
	let service: GetUserByIdService;

	beforeEach(() => {
		repository = new UserImMemoryRepository();
		service = new GetUserByIdService(repository);
	});

	it("should be possible to create a user with valid data.", async () => {
		await repository.create({
			id: "user-id",
			name: "Jhon Doe",
			email: "ex@email.com",
			password: "123456879",
			avatar: null,
		});

		const { user } = await service.execute({ id: "user-id" });

		expect(user.id).toEqual(expect.any(String));
	});

	it("should be possible to create a user with valid data.", async () => {
		await expect(service.execute({ id: "user-id" })).rejects.toBeInstanceOf(
			ResourceNotFoundError,
		);
	});
});
