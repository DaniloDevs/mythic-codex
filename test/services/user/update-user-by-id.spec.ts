import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { UpdateUserByIdService } from "@/services/user/update-user-by-id";

describe("Update User By Id Service", () => {
	let repository: UserImMemoryRepository;
	let service: UpdateUserByIdService;

	beforeEach(() => {
		repository = new UserImMemoryRepository();
		service = new UpdateUserByIdService(repository);
	});

	it("should be possible to update a user with valid data.", async () => {
		const userMock = await repository.create({
			id: "user-id",
			name: "Jhon Doe",
			email: "ex@email.com",
			password: "123456879",
			avatar: null,
		});

		const { user } = await service.execute({
			id: userMock.id,
			updateData: {
				name: "Romulo",
			},
		});

		expect(user.name).toBe("Romulo");
	});

	it("should throw an error when trying to update a user with empty data.", async () => {
		const userMock = await repository.create({
			id: "user-id",
			name: "Jhon Doe",
			email: "ex@email.com",
			password: "123456879",
			avatar: null,
		});
		await expect(
			service.execute({ id: userMock.id, updateData: {} }),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should throw an error when trying to update a non-existent user.", async () => {
		await expect(
			service.execute({ id: "non-exist-user", updateData: { name: "romulo " } }),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
