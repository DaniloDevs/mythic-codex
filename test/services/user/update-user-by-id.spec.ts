import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { UpdateUserByIdService } from "@/services/user/update-user-by-id";

describe("Update User By Id Service", () => {
	let userRepository: UserImMemoryRepository;
	let sut: UpdateUserByIdService;

	beforeEach(() => {
		userRepository = new UserImMemoryRepository();
		sut = new UpdateUserByIdService(userRepository);
	});

	it("should be possible to update a user with valid data.", async () => {
		const user = await userRepository.create({
			id: "user-id",
			name: "Jhon Doe",
			email: "ex@email.com",
			password: "123456879",
			avatar: null,
		});

		const { user: updateUser } = await sut.execute({
			id: user.id,
			updateData: {
				name: "Romulo",
			},
		});

		expect(updateUser.name).toBe("Romulo");
	});

	it("should throw an error when trying to update a user with empty data.", async () => {
		const user = await userRepository.create({
			id: "user-id",
			name: "Jhon Doe",
			email: "ex@email.com",
			password: "123456879",
			avatar: null,
		});

		await expect(sut.execute({ id: user.id, updateData: {} })).rejects.toBeInstanceOf(
			ResourceNotFoundError,
		);
	});

	it("should throw an error when trying to update a non-existent user.", async () => {
		await expect(() =>
			sut.execute({ id: "non-exist-user", updateData: { name: "romulo " } }),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
