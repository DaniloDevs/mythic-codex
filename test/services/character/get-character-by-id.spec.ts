import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { GetCharacterService } from "@/services/character/get-character-by-id";
import {
	createCharacterMock,
	type GenericInventory,
	type GenericSheet,
} from "../_mocks/character";

describe("Get Character by Id - Service", () => {
	let characterRepository: CharacterImMemoryRepository<GenericSheet, GenericInventory>;
	let userRepository: UserImMemoryRepository;
	let sut: GetCharacterService<GenericSheet, GenericInventory>;

	beforeEach(() => {
		characterRepository = new CharacterImMemoryRepository<
			GenericSheet,
			GenericInventory
		>();
		userRepository = new UserImMemoryRepository();
		sut = new GetCharacterService<GenericSheet, GenericInventory>(characterRepository);
	});

	it("should be possible to search for a character by its ID.", async () => {
		const user = await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: await hash("123456", 6),
		});

		const { characterDataMocks, sheetMocks, inventoryMocks } = createCharacterMock({
			userId: user.id,
		});

		const findCharacter = await characterRepository.create(
			characterDataMocks,
			sheetMocks,
			inventoryMocks,
		);

		const { character } = await sut.execute({ id: findCharacter.id });

		expect(character.id).toEqual(expect.any(String));
		expect(character.name).toBe(findCharacter.name);
	});

	it("should not be possible to search for a character using an ID that does not exist.", async () => {
		await expect(() => sut.execute({ id: "character-1" })).rejects.toBeInstanceOf(
			ResourceNotFoundError,
		);
	});
});
