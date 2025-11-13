import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { UpdateCharacterByIdService } from "@/services/character/update-character-by-id";
import {
	createCharacterMock,
	type GenericInventory,
	type GenericSheet,
} from "../_mocks/character";

describe("Update Character by Id - Service", () => {
	let characterRepository: CharacterImMemoryRepository<GenericSheet, GenericInventory>;
	let userRepository: UserImMemoryRepository;
	let sut: UpdateCharacterByIdService<GenericSheet, GenericInventory>;

	beforeEach(() => {
		characterRepository = new CharacterImMemoryRepository<
			GenericSheet,
			GenericInventory
		>();
		userRepository = new UserImMemoryRepository();
		sut = new UpdateCharacterByIdService<GenericSheet, GenericInventory>(
			characterRepository,
		);
	});

	it("should be possible to update a character's sheet.", async () => {
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

		const createdCharacter = await characterRepository.create(
			characterDataMocks,
			sheetMocks,
			inventoryMocks,
		);

		const newSheet: GenericSheet = { força: 20, vida: 150 };

		await sut.execute({
			characterId: createdCharacter.id,
			updateData: { sheet: newSheet },
		});

		const updatedCharacter = await characterRepository.getById(createdCharacter.id);

		expect(updatedCharacter).not.toBeNull();
		expect(updatedCharacter?.sheet.força).toBe(20);
	});

	it("It should not be possible to modify a character without providing data.", async () => {
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

		const createdCharacter = await characterRepository.create(
			characterDataMocks,
			sheetMocks,
			inventoryMocks,
		);

		await expect(() =>
			sut.execute({ characterId: createdCharacter.id, updateData: {} }),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not be possible to update a character using an ID that does not exist.", async () => {
		await expect(() =>
			sut.execute({ characterId: "character-1", updateData: { age: 1 } }),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
