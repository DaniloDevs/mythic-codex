import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { FetchCharacterByIdService } from "@/services/character/fetch-character-by-id";
import {
	createCharacterMock,
	type GenericInventory,
	type GenericSheet,
} from "../_mocks/character";

describe("Fetch Character by User - Service", () => {
	let characterRepository: CharacterImMemoryRepository<GenericSheet, GenericInventory>;
	let userRepository: UserImMemoryRepository;
	let sut: FetchCharacterByIdService<GenericSheet, GenericInventory>;

	beforeEach(() => {
		characterRepository = new CharacterImMemoryRepository<
			GenericSheet,
			GenericInventory
		>();
		userRepository = new UserImMemoryRepository();
		sut = new FetchCharacterByIdService<GenericSheet, GenericInventory>(
			characterRepository,
			userRepository,
		);
	});

	it("should be possible to list all of the user's characters.", async () => {
		const user = await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: await hash("123456", 6),
		});

		for (let i = 0; i < 4; i++) {
			const { characterDataMocks, sheetMocks, inventoryMocks } = createCharacterMock({
				userId: user.id,
			});

			await characterRepository.create(characterDataMocks, sheetMocks, inventoryMocks);
		}

		const { characters } = await sut.execute({ userId: user.id });

		expect(characters).toHaveLength(4);

		expect(characters).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					name: expect.any(String),
					avatar: expect.any(String),
				}),
			]),
		);
	});

	it("It should not be possible to list all user characters that do not exist.", async () => {
		await expect(() => sut.execute({ userId: "non-exist-user" })).rejects.toBeInstanceOf(
			ResourceNotFoundError,
		);
	});
});
